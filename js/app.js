// ===== ASCEND Shared Components v4 — Full Platform =====
const GOOGLE_FORM_URL = "contribute";
const LOGO_TOP = `<img src="New_Logo_Top.png" alt="ASCEND" height="42" style="height:42px;width:auto;object-fit:contain">`;
const LOGO_BOTTOM = `<img src="New_Logo_Bottom.png" alt="ASCEND" height="38" style="height:38px;width:auto;object-fit:contain">`;

// ===== 6.1 Favicon injection =====
(function(){
  const link = document.createElement('link');
  link.rel = 'icon'; link.type = 'image/png'; link.href = 'New_Logo_Top.png';
  document.head.appendChild(link);
})();

// ===== 7.1 Dark Mode =====
function getTheme(){ return localStorage.getItem('ascend-theme') || 'light'; }
function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('ascend-theme', t);
  const btn = document.getElementById('theme-toggle');
  if(btn) btn.innerHTML = t==='dark'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}
// Apply theme immediately to prevent flash
(function(){ setTheme(getTheme()); })();

// ===== Navbar =====
function createNavbar(active) {
  const links = [
    {href:"index.html",label:"Home",id:"home"},
    {href:"courses.html",label:"Courses",id:"courses"},
    {href:"explore.html",label:"Explore",id:"explore"},
    {href:"index.html#legacy",label:"About",id:"about"},
    {href:GOOGLE_FORM_URL,label:"Contribute",id:"contribute"}
  ];
  const nav = links.map(l => {
    const cls = l.id===active?' class="active"':'';
    const ext = l.ext?' target="_blank" rel="noopener noreferrer"':'';
    return `<li><a href="${l.href}"${cls}${ext}>${l.label}</a></li>`;
  }).join('');
  document.getElementById('navbar-root').innerHTML = `
    <nav class="navbar" id="navbar"><div class="container">
      <a href="index.html" class="nav-logo"><div class="nav-logo-icon">${LOGO_TOP}</div></a>
      <div class="nav-search" id="nav-search">
        <svg class="nav-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="search-input" placeholder="Search subjects, resources..." autocomplete="off">
        <kbd class="nav-search-kbd">Ctrl+K</kbd>
        <div class="search-results" id="search-results"></div>
      </div>
      <ul class="nav-links" id="nav-links">${nav}
        <li><button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode"></button></li>
        <li><a href="explore.html" class="nav-cta">Explore Resources</a></li>
      </ul>
      <button class="mobile-search-btn" id="mobile-search-btn" aria-label="Search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div></nav>`;
  // Dark mode toggle
  setTheme(getTheme());
  document.getElementById('theme-toggle').addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
  // Search
  initSearch();
}

// ===== 4.1 Global Search =====
function initSearch(){
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if(!input||!results) return;
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if(q.length < 2){ results.innerHTML = ''; results.classList.remove('active'); return; }
      const hits = [];
      // Search courses
      COURSES.forEach(c => {
        if(c.name.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q))
          hits.push({type:'Course',label:c.name,desc:c.fullName,href:`semesters?course=${c.id}`});
        // Search subjects
        c.semesters.forEach(sem => {
          sem.subjects.forEach(sub => {
            if(sub.name.toLowerCase().includes(q))
              hits.push({type:'Subject',label:sub.name,desc:`${c.shortName} · ${sem.name}`,href:`subject?course=${c.id}&sem=${sem.id}&sub=${sub.id}`});
          });
        });
      });
      // Search resources
      if(typeof getAllResources === 'function'){
        getAllResources().forEach(r => {
          if(r.title.toLowerCase().includes(q))
            hits.push({type:'Resource',label:r.title,desc:r.fileType,href:`resource?course=${r.course}&sem=${r.semester}&sub=${r.subjectId}&id=${r.id}`});
        });
      }
      const limited = hits.slice(0, 8);
      if(limited.length === 0){
        results.innerHTML = '<div class="search-empty">No results found</div>';
      } else {
        results.innerHTML = limited.map(h => `<a href="${h.href}" class="search-result-item"><span class="search-result-type">${h.type}</span><div><div class="search-result-label">${h.label}</div><div class="search-result-desc">${h.desc}</div></div></a>`).join('');
      }
      if (hits.length > 8) {
        results.innerHTML += `<a href="explore?search=${encodeURIComponent(q)}" class="search-view-all" style="display:block;padding:10px 16px;text-align:center;font-size:13px;color:var(--gold);border-top:1px solid var(--border);">View all ${hits.length} results →</a>`;
      }
      results.classList.add('active');
    }, 200);
  });
  input.addEventListener('focus', () => { if(input.value.trim().length >= 2) results.classList.add('active'); });
  document.addEventListener('click', e => { if(!e.target.closest('.nav-search')) results.classList.remove('active'); });
}

// ===== Footer =====
function createFooter() {
  document.getElementById('footer-root').innerHTML = `
    <footer class="footer"><div class="container"><div class="footer-grid">
      <div><div class="footer-brand-name"><div class="footer-logo-icon">${LOGO_BOTTOM}</div></div>
        <p class="footer-about">A student initiative to build a lasting academic legacy for future batches.</p></div>
      <div><div class="footer-heading">Quick Links</div><ul class="footer-links">
        <li><a href="index.html">Home</a></li><li><a href="courses.html">Courses</a></li>
        <li><a href="explore.html">Explore</a></li>
        <li><a href="${GOOGLE_FORM_URL}">Contribute</a></li></ul></div>
      <div><div class="footer-heading">Programs</div><ul class="footer-links">
        <li><a href="semesters?course=core">MBA (Core)</a></li>
        <li><a href="semesters?course=ba">MBA (BA)</a></li>
        <li><a href="semesters?course=idm">MBA (IDM)</a></li></ul></div>
      <div><div class="footer-cta-box"><div class="footer-cta-title">Have something to share?</div>
        <p class="footer-cta-desc">Contribute resources and help future batches ascend.</p>
        <a href="${GOOGLE_FORM_URL}" class="footer-cta-btn">Contribute Now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div></div>
    </div><div class="footer-bottom"><span>&copy; 2025 ASCEND. All rights reserved.</span>
      <div class="footer-bottom-right">Made with purpose. Built for legacy.</div></div></div></footer>`;
  // 4.5 Back to Top button
  const btt = document.createElement('button');
  btt.className = 'back-to-top'; btt.id = 'back-to-top'; btt.setAttribute('aria-label','Back to top');
  btt.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(btt);
  btt.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), {passive:true});
}

// ===== Breadcrumb =====
function createBreadcrumb(items) {
  const crumbs = items.map((item, i) => {
    if (i === items.length - 1) return `<span class="bc-current">${item.label}</span>`;
    return `<a href="${item.href}" class="bc-link">${item.label}</a>`;
  }).join('<span class="bc-sep">/</span>');
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><div class="container">${crumbs}</div></nav>`;
}

// ===== 6.2 DRY Course Card Renderer =====
function renderCourseCard(c, i) {
  const stats = getCourseStats(c.id);
  const specs = c.specializations.length ? `<div class="course-specs">${c.specializations.map(s=>`<span class="spec-tag">${s.shortName}</span>`).join('')}</div>` : '';
  return `<a href="semesters?course=${c.id}" class="course-card fade-up fade-up-delay-${(i%4)+1}" style="--accent:${c.color}">
    <div class="course-card-accent" style="background:${c.color}"></div>
    <div class="course-card-icon" style="color:${c.color}">${COURSE_ICONS[c.id]}</div>
    <h3 class="course-card-name">${c.name}</h3>
    <p class="course-card-full">${c.fullName}</p>${specs}
    <p class="course-card-desc">${c.description}</p>
    <div class="course-card-stats"><span>${c.semesters.length} Semesters</span><span>·</span><span>${stats.subjects} Subjects</span></div>
    <div class="course-card-link">Explore Semesters <span>→</span></div></a>`;
}

// ===== 4.3 Empty State Helper =====
function renderEmptyState(message, showContribute) {
  return `<div class="empty-state">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" stroke-width="1.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
    <p class="empty-state-text">${message}</p>
    ${showContribute ? `<a href="${GOOGLE_FORM_URL}" class="btn-primary" style="margin-top:16px;font-size:13px;padding:10px 24px">Contribute Resources <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>` : ''}
  </div>`;
}

// ===== Init Page =====
function initPage() {
  const navbar = document.getElementById('navbar');
  if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20), {passive:true});
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      hamburger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open'); hamburger.classList.remove('active'); document.body.style.overflow = '';
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open'); hamburger.classList.remove('active'); document.body.style.overflow = '';
      }
    });
  }
  // Mobile search button
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
      const searchWrap = document.querySelector('.nav-search');
      if (searchWrap) { searchWrap.classList.toggle('mobile-search-open'); searchWrap.querySelector('input')?.focus(); }
    });
  }
  // 4.4 Keyboard navigation: Ctrl+K focuses search
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const si = document.getElementById('search-input');
      if(si) si.focus();
    }
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const si = document.getElementById('search-input');
      if(si) si.focus();
    }
  });
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); return; }
      const t = document.querySelector(href);
      if (t) { e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-(navbar?navbar.offsetHeight:72)-10,behavior:'smooth'}); }
    });
  });
  // Fade-up observer
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.08, rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  // 3.1 FOUC prevention
  document.body.classList.add('page-loaded');
}

// ===== Constants =====
const SEM_ICONS = {
  1:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="16" y2="7"/><line x1="9" y1="11" x2="14" y2="11"/></svg>`,
  2:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  3:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  4:`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"/></svg>`
};
function resTypeLabel(t){return{midSem:'Mid Sem',endSem:'End Sem',assignments:'Assignment',notes:'Notes',prepVideos:'Prep Video',summaries:'Summary'}[t]||t}
function resTypeShort(t){return{midSem:'MID',endSem:'PYQ',assignments:'ASG',notes:'NOTE',prepVideos:'VID',summaries:'SUM'}[t]||t}
function resTypeClass(t){return{midSem:'midsem',endSem:'pyq',assignments:'assignment',notes:'notes',prepVideos:'video',summaries:'summary'}[t]||''}

// Recently viewed
function addToRecentlyViewed(item) {
  let recent = JSON.parse(localStorage.getItem('ascend-recent') || '[]');
  recent = recent.filter(r => r.id !== item.id);
  recent.unshift(item);
  if (recent.length > 10) recent = recent.slice(0, 10);
  localStorage.setItem('ascend-recent', JSON.stringify(recent));
}
function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem('ascend-recent') || '[]');
}

const COURSE_ICONS = {
  core:`<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  ba:`<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  idm:`<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="6" width="22" height="14" rx="2"/><path d="M12 2v4"/><path d="M5 10h14"/><path d="M5 14h14"/><path d="M8 6v14"/><path d="M16 6v14"/></svg>`
};
