#!/usr/bin/env node
/**
 * sync-drive.mjs — Scans a public Google Drive folder, matches PDFs to
 * ASCEND resource entries, and updates the PDF_MAP in js/data.js.
 *
 * Env vars:
 *   GOOGLE_API_KEY   — Google API key with Drive API enabled
 *   DRIVE_FOLDER_ID  — Root folder ID (default: ASCEND shared folder)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_JS = path.resolve(__dirname, "..", "js", "data.js");

const API_KEY = process.env.GOOGLE_API_KEY;
const ROOT_FOLDER = process.env.DRIVE_FOLDER_ID || "1HqpDdGCYyxMTlanaUXq7Pdy9KjJaNqRq";

if (!API_KEY) { console.error("❌ GOOGLE_API_KEY not set"); process.exit(1); }

// ── 1. Build subject lookup from data.js ──
// Parse s("id","Name",...) calls grouped by course context
function buildSubjectLookup(src) {
  // Map: "courseId:subjectNameLower" → subjectId
  const lookup = {};
  let currentCourse = null;

  // Detect course blocks by id
  const courseIdRe = /id:\s*"(core|ba|idm)"/g;
  const subjectRe = /s\("([^"]+)","([^"]+)"/g;

  // Split source into lines for position tracking
  const lines = src.split("\n");
  const coursePositions = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/id:\s*"(core|ba|idm)"/);
    if (m) coursePositions.push({ course: m[1], line: i });
  }

  for (let i = 0; i < lines.length; i++) {
    // Update current course
    for (const cp of coursePositions) {
      if (cp.line === i) currentCourse = cp.course;
    }
    // Match subject definitions
    const sm = lines[i].match(/s\("([^"]+)","([^"]+)"/);
    if (sm && currentCourse) {
      const [, subId, subName] = sm;
      const key = `${currentCourse}:${subName.toLowerCase()}`;
      lookup[key] = subId;
    }
  }
  return lookup;
}

// ── 2. List Drive files recursively ──
async function listFolder(folderId) {
  const files = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      key: API_KEY,
      fields: "nextPageToken,files(id,name,mimeType)",
      pageSize: "1000",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const url = `https://www.googleapis.com/drive/v3/files?${params}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Drive API ${res.status}: ${err}`);
    }
    const data = await res.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return files;
}

async function listAllPDFs(folderId) {
  const pdfs = [];
  const items = await listFolder(folderId);
  for (const item of items) {
    if (item.mimeType === "application/vnd.google-apps.folder") {
      const children = await listAllPDFs(item.id);
      pdfs.push(...children);
    } else if (item.name.toLowerCase().endsWith(".pdf")) {
      pdfs.push({ id: item.id, name: item.name });
    }
  }
  return pdfs;
}

// ── 3. Parse a PDF filename into metadata ──
// Pattern: "MBA Core - Sem I - Financial Accounting - End Sem - Backlog - 2024-26.pdf"
const SEM_MAP = { "Sem I": 1, "Sem II": 2, "Sem III": 3, "Sem IV": 4 };
const COURSE_MAP = { "MBA Core": "core", "MBA BA": "ba", "MBA IDM": "idm" };

function parseFilename(name) {
  const base = name.replace(/\.pdf$/i, "");
  // Try: {Program} - {Sem} - {Subject} - {ExamType} - {Attempt} - {Batch}
  const m = base.match(
    /^(MBA (?:Core|BA|IDM))\s*-\s*(Sem [IVX]+)\s*-\s*(.+?)\s*-\s*(Mid Sem|End Sem)\s*-\s*(Main|Backlog)\s*-\s*(\d{4}-\d{2})$/
  );
  if (!m) return null;
  const [, prog, sem, subject, examType, attempt, batch] = m;
  return {
    course: COURSE_MAP[prog],
    semester: SEM_MAP[sem],
    subjectName: subject.trim(),
    examType: examType === "Mid Sem" ? "midSem" : "endSem",
    attempt,
    batch,
  };
}

// ── 4. Main ──
async function main() {
  console.log("📂 Scanning Google Drive folder:", ROOT_FOLDER);
  const pdfs = await listAllPDFs(ROOT_FOLDER);
  console.log(`   Found ${pdfs.length} PDFs`);

  const src = fs.readFileSync(DATA_JS, "utf-8");
  const lookup = buildSubjectLookup(src);
  console.log(`   Built lookup with ${Object.keys(lookup).length} subjects`);

  const entries = [];
  let matched = 0, skipped = 0;

  for (const pdf of pdfs) {
    const meta = parseFilename(pdf.name);
    if (!meta) { skipped++; continue; }

    const key = `${meta.course}:${meta.subjectName.toLowerCase()}`;
    const subId = lookup[key];
    if (!subId) {
      console.warn(`   ⚠ No subject match: "${meta.subjectName}" in ${meta.course}`);
      skipped++;
      continue;
    }

    const tag = meta.examType === "midSem" ? "mid" : "end";
    const attemptTag = meta.attempt.toLowerCase();
    const resId = `${subId}-${tag}-${attemptTag}-${meta.batch}`;
    const driveUrl = `https://drive.google.com/file/d/${pdf.id}/preview`;

    entries.push(`  ["${subId}","${resId}","${driveUrl}"]`);
    matched++;
  }

  console.log(`   ✅ Matched: ${matched}  ⚠ Skipped: ${skipped}`);

  if (entries.length === 0) {
    console.log("   No PDFs matched — keeping existing PDF_MAP.");
    return;
  }

  // Build new PDF_MAP block
  const newMap = `const PDF_MAP = [\n${entries.join(",\n")}\n];`;

  // Replace in data.js
  const mapRe = /const PDF_MAP\s*=\s*\[[\s\S]*?\];/;
  if (!mapRe.test(src)) {
    console.error("❌ Could not find PDF_MAP in data.js");
    process.exit(1);
  }

  const updated = src.replace(mapRe, newMap);
  if (updated === src) {
    console.log("   No changes needed.");
    return;
  }

  fs.writeFileSync(DATA_JS, updated, "utf-8");
  console.log("   ✅ data.js updated with", entries.length, "PDF entries");
}

main().catch((e) => { console.error(e); process.exit(1); });
