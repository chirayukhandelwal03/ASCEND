// ===== ASCEND Data Store v4 — Accurate 2025-27 Programme Structure =====
const COLORS = ["#1B2A4A","#2A7D5F","#B8860B","#3A6B4C","#5B3E96","#8B3A3A","#2A5D7D","#6B4C3A"];
function sc(i){return COLORS[i%COLORS.length]}

// Subject factory: s(id, name, credits, ca, tee, category, specializations)
function s(id,name,cr,ca,tee,cat,specs){
  return {id,name,color:sc(0),maxMarks:ca+tee,credits:cr,ca:ca,tee:tee,examType:tee===0?"internal":"external",category:cat||"core",specializations:specs||["all"],chapters:[],description:""};
}

const COURSES = [
  // ===================== MBA (CORE) =====================
  {
    id:"core", name:"MBA (Core)", shortName:"Core",
    fullName:"Master of Business Administration",
    color:"#1B2A4A",
    description:"The flagship MBA program with specializations in Marketing, Human Resource, Finance, Operations, and General Management.",
    specializations:[
      {id:"mktg",name:"Marketing",shortName:"Mktg"},
      {id:"hr",name:"Human Resource",shortName:"HR"},
      {id:"fin",name:"Finance",shortName:"Finance"},
      {id:"ops",name:"Operations",shortName:"Ops"},
      {id:"gm",name:"General Management",shortName:"GM"}
    ],
    semesters:[
      { id:1, name:"Semester 1", tagline:"Foundation & Core Building",
        description:"All subjects common across specializations. Building core management fundamentals.",
        totalCredits:26,
        subjects:[
          s("business-communication","Business Communication",2,60,40),
          s("business-statistics","Business Statistics",2,60,40),
          s("essentials-marketing","Essentials of Marketing Management",2,60,40),
          s("financial-accounting","Financial Accounting",2,60,40),
          s("intro-financial-mgmt","Introduction to Financial Management",2,60,40),
          s("mgmt-operations","Management of Operations",2,60,40),
          s("operations-research","Operations Research",2,60,40),
          s("organizational-behaviour","Organizational Behaviour",2,60,40),
          s("research-methodology","Research Methodology",2,60,40),
          s("managerial-economics","Managerial Economics",2,60,40),
          s("hrm","Human Resource Management",2,60,40),
          s("indian-ethos","Indian Ethos and Values for Management",2,100,0),
          s("advanced-excel","Advanced Excel",1,50,0),
          s("project-1","Project - I",1,50,0)
        ]
      },
      { id:2, name:"Semester 2", tagline:"Application & Depth",
        description:"Deepening fundamentals with introduction to specialization elective tracks. Choose any 8 elective courses (16 credits).",
        totalCredits:33,
        electiveCreditsRequired:16,
        electiveNote:"Choose any 8 courses from the Open Elective pool",
        subjects:[
          // Generic Core Courses (17 credits)
          s("business-research-methods","Business Research Methods",3,90,60),
          s("basic-econometrics","Basic Econometrics",2,60,40),
          s("business-analytics","Business Analytics",2,60,40),
          s("esg-sustainable-finance","ESG and Sustainable Finance",2,60,40),
          s("legal-aspects","Legal Aspects of Business",2,60,40),
          s("macroeconomics","Macroeconomics for Managers",2,60,40),
          s("csr-project","Corporate Social Responsibility Project",1,50,0),
          s("design-thinking","Design Thinking",1,50,0),
          s("esg-reporting","Basics of ESG Reporting, Frameworks and Regulations",2,100,0),
          // Open Elective — Marketing
          s("brand-management","Brand Management",2,60,40,"elective",["mktg"]),
          s("digital-marketing","Digital Marketing",2,60,40,"elective",["mktg"]),
          s("b2b-marketing","Business to Business Marketing",2,100,0,"elective",["mktg"]),
          s("marketing-sales-analytics","Marketing and Sales Analytics",2,100,0,"elective",["mktg"]),
          s("retail-marketing","Retail Marketing",2,60,40,"elective",["mktg"]),
          s("salesforce-channel-mgmt","Sales Force and Channel Management",2,60,40,"elective",["mktg"]),
          s("consumer-behaviour","Consumer Behaviour",2,60,40,"elective",["mktg"]),
          // Open Elective — Human Resource
          s("compensation-reward","Compensation and Reward Management",2,100,0,"elective",["hr"]),
          s("employment-laws","Employment Related Laws",2,60,40,"elective",["hr"]),
          s("hrd-instruments","HRD Instruments",2,100,0,"elective",["hr"]),
          s("hr-analytics","HR Analytics",2,60,40,"elective",["hr"]),
          s("learning-development","Learning and Development",2,60,40,"elective",["hr"]),
          s("performance-mgmt-system","Performance Management System",2,60,40,"elective",["hr"]),
          s("talent-acquisition","Talent Acquisition",2,60,40,"elective",["hr"]),
          // Open Elective — Finance
          s("commercial-banking","Commercial Banking",2,60,40,"elective",["fin"]),
          s("corporate-valuation","Corporate Valuation",2,60,40,"elective",["fin"]),
          s("derivative-markets","Derivative Markets",2,100,0,"elective",["fin"]),
          s("financial-statement-analysis","Financial Statement Analysis",2,60,40,"elective",["fin"]),
          s("financial-markets-institutions","Introduction to Financial Markets and Institutions",2,100,0,"elective",["fin"]),
          s("international-finance","International Finance",2,60,40,"elective",["fin"]),
          s("intro-fintech","Introduction to FinTech",2,60,40,"elective",["fin"]),
          // Open Elective — Operations
          s("flexi-credit-s2-ops","Flexi-Credit Course",2,100,0,"elective",["ops"]),
          s("lean-six-sigma","Lean Six Sigma",2,60,40,"elective",["ops"]),
          s("service-operations-mgmt","Service Operations Management",2,60,40,"elective",["ops"]),
          s("supply-chain-mgmt","Supply Chain Management",2,60,40,"elective",["ops"]),
          s("warehouse-mgmt","Warehouse Management",2,60,40,"elective",["ops"]),
          // Open Elective — General Management
          s("data-analysis-python","Data Analysis Using Python",2,60,40,"elective",["gm"]),
          s("data-mining","Data Mining",2,60,40,"elective",["gm"]),
          s("data-viz-modeling","Data Visualization and Modeling",2,60,40,"elective",["gm"]),
          s("entrepreneurship","Entrepreneurship",2,60,40,"elective",["gm"]),
          s("lean-startup","Lean Startup",2,60,40,"elective",["gm"]),
          s("r-programming","R Programming",2,60,40,"elective",["gm"]),
          s("social-media-analytics","Social Media Analytics",2,60,40,"elective",["gm"]),
          s("venture-pe-funding","Venture and Private Equity Funding",2,60,40,"elective",["gm"])
        ]
      },
      { id:3, name:"Semester 3", tagline:"Specialization & Strategic Thinking",
        description:"Summer internship, strategic core, and deep specialization electives. Choose any 7 elective courses (14 credits).",
        totalCredits:28,
        electiveCreditsRequired:14,
        electiveNote:"Choose any 7 courses from the Open Elective pool",
        subjects:[
          // Generic Core Courses (14 credits)
          s("summer-internship","Summer Internship",6,180,120),
          s("business-forecasting","Business Forecasting",2,60,40),
          s("innovation-mgmt","Innovation Management",2,60,40),
          s("strategic-mgmt","Strategic Management",2,60,40),
          s("sustainability-concepts","Concepts and Applications in Sustainability",1,50,0),
          s("project-2","Project - II",1,50,0),
          // Open Elective — Marketing
          s("sustainable-marketing","Sustainable Marketing",2,60,40,"elective",["mktg"]),
          s("flexi-credit-s3-mktg","Flexi-Credit Course",2,100,0,"elective",["mktg"]),
          s("integrated-marketing-comm","Integrated Marketing Communication",2,60,40,"elective",["mktg"]),
          s("marketing-simulation","Marketing Simulation",2,100,0,"elective",["mktg"]),
          s("services-marketing","Services Marketing",2,60,40,"elective",["mktg"]),
          s("sports-entertainment-mktg","Sports and Entertainment Marketing",2,60,40,"elective",["mktg"]),
          // Open Elective — Human Resource
          s("conflict-negotiation","Conflict and Negotiation",2,60,40,"elective",["hr"]),
          s("economics-hr","Economics of Human Resources",2,60,40,"elective",["hr"]),
          s("flexi-credit-s3-hr","Flexi-Credit Course",2,100,0,"elective",["hr"]),
          s("hrd-audit-scorecard","HRD Audit and Scorecard",2,100,0,"elective",["hr"]),
          s("industrial-relations","Industrial Relations",2,60,40,"elective",["hr"]),
          s("org-development-change","Organizational Development and Change",2,60,40,"elective",["hr"]),
          s("talent-management","Talent Management",2,60,40,"elective",["hr"]),
          // Open Elective — Finance
          s("advanced-technical-analysis","Advanced Technical Analysis",2,60,40,"elective",["fin"]),
          s("supply-chain-finance","Supply Chain Finance",2,60,40,"elective",["fin"]),
          s("financial-risk-mgmt","Financial Risk Management",2,60,40,"elective",["fin"]),
          s("fixed-income-markets","Fixed Income Markets",2,60,40,"elective",["fin"]),
          s("flexi-credit-s3-fin","Flexi-Credit Course",2,100,0,"elective",["fin"]),
          s("mergers-acquisitions","Mergers and Acquisitions",2,60,40,"elective",["fin"]),
          s("security-analysis-portfolio","Security Analysis and Portfolio Management",2,100,0,"elective",["fin"]),
          // Open Elective — Operations
          s("digital-transformation","Digital Transformation",2,60,40,"elective",["ops"]),
          s("e-business-operations","E-Business Operations",2,60,40,"elective",["ops"]),
          s("flexi-credit-s3-ops","Flexi-Credit Course",2,100,0,"elective",["ops"]),
          s("intl-trade-logistics","International Trade and Logistics",2,60,40,"elective",["ops"]),
          s("internet-of-things","Internet of Things",2,60,40,"elective",["ops"]),
          s("it-consulting","IT Consulting",2,60,40,"elective",["ops"]),
          s("project-management","Project Management",2,60,40,"elective",["ops"]),
          s("project-mgmt-suite","Project Management Suite",2,60,40,"elective",["ops"]),
          s("sc-modeling-design","Supply Chain Modeling and Design",2,60,40,"elective",["ops"]),
          s("sc-strategy","Supply Chain Strategy",2,100,0,"elective",["ops"]),
          s("tech-in-sc","Technology in Supply Chain",2,60,40,"elective",["ops"]),
          // Open Elective — General Management
          s("customer-analytics","Customer Analytics",2,60,40,"elective",["gm"]),
          s("intro-nlp","Introduction to Natural Language Processing",2,60,40,"elective",["gm"]),
          s("social-entrepreneurship","Social Entrepreneurship",2,60,40,"elective",["gm"]),
          s("spreadsheet-modelling","Spreadsheet Modelling",2,60,40,"elective",["gm"]),
          s("technology-innovation","Technology Innovation",2,60,40,"elective",["gm"]),
          s("visual-analytics","Visual Analytics",2,60,40,"elective",["gm"])
        ]
      },
      { id:4, name:"Semester 4", tagline:"Integration & Leadership",
        description:"Final core courses and fully internal electives for capstone preparation. Choose 6 credits from the Open Elective pool.",
        totalCredits:13,
        electiveCreditsRequired:6,
        electiveNote:"Choose 6 credits from the Open Elective pool",
        subjects:[
          // Generic Core Courses (7 credits)
          s("corporate-governance-ethics","Corporate Governance and Ethics",2,100,0),
          s("game-theory","Game Theory for Strategic Thinking",2,100,0),
          s("global-business-env","Global Business Environment",2,60,40),
          s("project-3","Project - III",1,50,0),
          // Open Elective — Marketing (all fully internal)
          s("crm","Customer Relationship Management",2,100,0,"elective",["mktg"]),
          s("marketing-strategy","Marketing Strategy",2,100,0,"elective",["mktg"]),
          s("rural-marketing","Rural Marketing",2,100,0,"elective",["mktg"]),
          // Open Elective — Human Resource (all fully internal)
          s("coaching-counseling","Coaching, Counseling and Mentoring",2,100,0,"elective",["hr"]),
          s("strategic-hrm","Strategic Human Resource Management",2,100,0,"elective",["hr"]),
          s("emotional-intelligence","Emotional Intelligence at Workplace",1,50,0,"elective",["hr"]),
          s("psychological-issues","Psychological Issues at Work",1,50,0,"elective",["hr"]),
          // Open Elective — Finance (all fully internal)
          s("behavioral-finance","Behavioral Finance",2,100,0,"elective",["fin"]),
          s("insurance-mgmt","Insurance Management",2,100,0,"elective",["fin"]),
          s("taxation","Taxation",2,100,0,"elective",["fin"]),
          s("wealth-management","Wealth Management",2,100,0,"elective",["fin"]),
          // Open Elective — Operations (all fully internal)
          s("bpm","Business Process Management",2,100,0,"elective",["ops"]),
          s("operations-strategy","Operations Strategy and Control",2,100,0,"elective",["ops"]),
          s("probability-simulation","Probability Model for Simulation and Analytics",2,100,0,"elective",["ops"]),
          s("project-risk-mgmt","Project Risk Management",2,100,0,"elective",["ops"]),
          s("sustainable-sc","Sustainable Supply Chain",2,100,0,"elective",["ops"]),
          // Open Elective — General Management (all fully internal)
          s("adv-strategic-mgmt","Advanced Strategic Management",2,100,0,"elective",["gm"]),
          s("cloud-big-data","Cloud and Big Data",2,100,0,"elective",["gm"]),
          s("machine-learning","Machine Learning",2,100,0,"elective",["gm"])
        ]
      }
    ]
  },

  // ===================== MBA (BUSINESS ANALYTICS) =====================
  {
    id:"ba", name:"MBA (BA)", shortName:"Business Analytics",
    fullName:"MBA in Business Analytics",
    color:"#2A7D5F",
    description:"Specialized MBA focusing on data science, analytics, and data-driven decision making.",
    specializations:[],
    semesters:[
      { id:1, name:"Semester 1", tagline:"Analytics Foundations",
        description:"Core analytics and management foundations.",
        totalCredits:28,
        subjects:[
          s("ba-database-tech","Database Technologies",4,200,0),
          s("ba-quant-methods","Quantitative Methods",3,90,60),
          s("ba-basic-econometrics","Basic Econometrics",2,100,0),
          s("ba-basics-fin-mgmt","Basics of Financial Management",2,60,40),
          s("ba-business-stats","Business Statistics",2,60,40),
          s("ba-data-analysis-python","Data Analysis Using Python",2,100,0),
          s("ba-essentials-marketing","Essentials of Marketing Management",2,60,40),
          s("ba-financial-accounting","Financial Accounting",2,60,40),
          s("ba-hrm","Human Resource Management",2,60,40),
          s("ba-mgmt-operations","Management of Operations",2,60,40),
          s("ba-managerial-economics","Managerial Economics",2,60,40),
          s("ba-spreadsheet-modelling","Spreadsheet Modelling",2,60,40),
          s("ba-research-methodology","Research Methodology",1,50,0)
        ]
      },
      { id:2, name:"Semester 2", tagline:"Applied Analytics",
        description:"Machine learning, predictive modeling, and business applications.",
        totalCredits:26,
        subjects:[
          s("ba-business-research","Business Research Methods",3,90,60),
          s("ba-cloud-big-data","Cloud and Big Data",3,150,0),
          s("ba-data-mining","Data Mining",2,60,40),
          s("ba-digital-marketing","Digital Marketing",2,60,40),
          s("ba-fin-statement-analysis","Financial Statement Analysis",2,60,40),
          s("ba-machine-learning","Machine Learning",2,60,40),
          s("ba-macroeconomics","Macroeconomics for Managers",2,60,40),
          s("ba-marketing-sales-analytics","Marketing and Sales Analytics",2,60,40),
          s("ba-project-mgmt","Project Management",2,60,40),
          s("ba-social-media-analytics","Social Media Analytics",2,60,40),
          s("ba-visual-analytics","Visual Analytics",2,60,40),
          s("ba-esg-reporting","Basics of ESG Reporting, Frameworks and Regulations",2,100,0)
        ]
      },
      { id:3, name:"Semester 3", tagline:"Advanced Analytics",
        description:"Internship, domain analytics, and elective specialization. Choose 10 credits from the Elective pool.",
        totalCredits:33,
        electiveCreditsRequired:10,
        electiveNote:"Choose elective courses totalling 10 credits",
        subjects:[
          // Generic Core (23 credits)
          s("ba-internship","Internship",8,240,160),
          s("ba-business-forecasting","Business Forecasting",2,60,40),
          s("ba-consumer-behaviour","Consumer Behaviour",2,60,40),
          s("ba-financial-analytics","Financial Analytics",2,60,40),
          s("ba-scm","Supply Chain Management",2,60,40),
          s("ba-hr-analytics","HR Analytics",2,60,40),
          s("ba-iot","Internet of Things",2,100,0),
          s("ba-risk-analytics","Risk Analytics",2,60,40),
          s("ba-project-1","Project - I",1,50,0),
          // Generic Elective Courses
          s("ba-big-data-analytics","Big Data Analytics",3,90,60,"elective"),
          s("ba-image-processing","Image Processing",3,90,60,"elective"),
          s("ba-telecom-analytics","Telecom Analytics",2,60,40,"elective"),
          s("ba-advanced-ml","Advanced Machine Learning",2,60,40,"elective"),
          s("ba-cloud-web-services","Cloud and Web Services",2,60,40,"elective"),
          s("ba-fin-risk-mgmt","Financial Risk Management",2,60,40,"elective"),
          s("ba-healthcare-analytics","Healthcare Analytics",2,60,40,"elective"),
          s("ba-imc","Integrated Marketing Communication",2,60,40,"elective"),
          s("ba-org-dev-change","Organizational Development and Change",2,60,40,"elective"),
          s("ba-nlp","Natural Language Processing",3,90,60,"elective")
        ]
      },
      { id:4, name:"Semester 4", tagline:"Industry Applications",
        description:"Strategic capstone and fully internal electives. Choose any 2 elective courses (4 credits).",
        totalCredits:13,
        electiveCreditsRequired:4,
        electiveNote:"Choose any 2 courses from the Elective pool",
        subjects:[
          // Generic Core (9 credits)
          s("ba-corporate-governance","Corporate Governance and Ethics",2,100,0),
          s("ba-digital-transformation","Digital Transformation",2,100,0),
          s("ba-flexi-credit","Flexi-Credit Course",2,100,0),
          s("ba-strategic-mgmt","Strategic Management",2,60,40),
          s("ba-project-2","Project - II",1,50,0),
          // Generic Elective Courses (all fully internal)
          s("ba-global-business-env","Global Business Environment",2,100,0,"elective"),
          s("ba-marketing-strategy","Marketing Strategy",2,100,0,"elective"),
          s("ba-retail-marketing","Retail Marketing",2,100,0,"elective"),
          s("ba-six-sigma","Six Sigma",2,100,0,"elective")
        ]
      }
    ]
  },

  // ===================== MBA (IDM) =====================
  {
    id:"idm", name:"MBA (IDM)", shortName:"Infra Dev Mgmt",
    fullName:"MBA in Infrastructure Development and Management",
    color:"#B8860B",
    description:"Specialized MBA in infrastructure planning, development, and management of large-scale projects.",
    specializations:[],
    semesters:[
      { id:1, name:"Semester 1", tagline:"Infrastructure Foundations",
        description:"Core management with infrastructure context.",
        totalCredits:30,
        subjects:[
          s("idm-business-comm","Business Communication",2,60,40),
          s("idm-business-stats","Business Statistics",2,60,40),
          s("idm-intro-power-sector","Introduction to Power Sector",2,60,40),
          s("idm-mgmt-accounting","Management Accounting",2,60,40),
          s("idm-oil-gas-economies","Oil and Gas Economies",2,60,40),
          s("idm-project-mgmt","Project Management",2,60,40),
          s("idm-tendering-bidding","Tendering, Bidding and Contracting",2,60,40),
          s("idm-managerial-economics","Managerial Economics",2,60,40),
          s("idm-csr","Corporate Social Responsibility",1,50,0),
          s("idm-research-methodology","Research Methodology",1,50,0),
          s("idm-infra-planning","Infrastructure Planning and Development",3,90,60),
          s("idm-org-behaviour","Organizational Behaviour",2,60,40),
          s("idm-hrm","Human Resource Management",2,60,40),
          s("idm-roads-highways","Roads, Highways and Bridges",3,90,60),
          s("idm-climate-change","Climate Change and Infrastructure",1,50,0),
          s("idm-project-1","Project - I",1,50,0)
        ]
      },
      { id:2, name:"Semester 2", tagline:"Project Development",
        description:"Project finance, planning, and execution methodologies. Choose any 2 elective courses (4 credits).",
        totalCredits:30,
        electiveCreditsRequired:4,
        electiveNote:"Choose any 2 courses from the Elective pool",
        subjects:[
          // Generic Core (26 credits)
          s("idm-land-acquisition","Land Acquisition and Rehabilitation",1,50,0),
          s("idm-renewable-energy","Renewable Energy Sources and Technologies",3,90,60),
          s("idm-contracts-claims","Contracts and Claims Management",2,60,40),
          s("idm-project-feasibility","Project Feasibility and Financing",2,60,40),
          s("idm-intro-fin-mgmt","Introduction to Financial Management",2,60,40),
          s("idm-operations-research","Operations Research",2,60,40),
          s("idm-project-execution","Project Execution Planning and Control",2,60,40),
          s("idm-project-mgmt-suite","Project Management Suite",2,60,40),
          s("idm-scm","Supply Chain Management",2,60,40),
          s("idm-esg-reporting","Basics of ESG Reporting, Frameworks and Regulations",2,100,0),
          s("idm-transport-economics","Transportation Economics",2,60,40),
          s("idm-ppp","Public Private Partnerships",2,60,40),
          s("idm-advanced-excel","Advanced Excel",1,50,0),
          s("idm-project-2","Project - II",1,50,0),
          // Generic Elective Courses (all fully internal)
          s("idm-litigation-arbitration","Litigation and Arbitration in Infrastructure and Real Estate Projects",2,100,0,"elective"),
          s("idm-project-site-mgmt","Project Site Management",2,100,0,"elective"),
          s("idm-project-cost-mgmt","Project Cost Management and Social Cost Benefit Analysis",2,100,0,"elective"),
          s("idm-security-analysis","Security Analysis and Portfolio Management",2,100,0,"elective"),
          s("idm-infra-policy-reforms","Infrastructure Policy and Reforms",2,100,0,"elective")
        ]
      },
      { id:3, name:"Semester 3", tagline:"Sector Specialization",
        description:"Internship, advanced project skills, and sector electives. Choose 4 credits from the Elective pool.",
        totalCredits:29,
        electiveCreditsRequired:4,
        electiveNote:"Choose elective courses totalling 4 credits",
        subjects:[
          // Generic Core (25 credits)
          s("idm-internship","Internship",8,240,160),
          s("idm-adv-corporate-finance","Advanced Corporate Finance",2,100,0),
          s("idm-adv-project-finance","Advanced Project Finance Structuring",2,60,40),
          s("idm-ai-infra","Application of AI in the Infrastructure Sector",2,60,40),
          s("idm-intl-trade-logistics","International Trade and Logistics",2,60,40),
          s("idm-lean-six-sigma","Lean Six Sigma",2,60,40),
          s("idm-project-risk-mgmt","Project Risk Management",2,60,40),
          s("idm-safety-quality","Safety and Quality Management",2,60,40),
          s("idm-warehouse-mgmt","Warehouse Management",2,60,40),
          s("idm-project-3","Project - III",1,50,0),
          // Generic Elective Courses (all fully internal)
          s("idm-smart-cities","City Housing, Townships and Smart Cities",2,100,0,"elective"),
          s("idm-energy-transitions","Energy Transitions",2,100,0,"elective"),
          s("idm-flexi-credit-s3","Flexi-Credit Course",2,100,0,"elective"),
          s("idm-real-estate-design","Introduction, Design and Financing of Real Estate Projects",2,100,0,"elective"),
          s("idm-oil-gas-processing","Oil and Gas - Processing and Distribution",2,100,0,"elective"),
          s("idm-real-estate-rules","Real Estate Rules and Regulations",2,100,0,"elective"),
          s("idm-transmission-dist","Transmission and Distribution Management",2,100,0,"elective"),
          s("idm-urban-transport","Urban Transportation and Metro Rail System",2,100,0,"elective"),
          s("idm-ev-mobility","Electric Vehicle (EV) Mobility and Business",1,50,0,"elective"),
          s("idm-ppp-railways","Public Private Partnership (PPP) in Railways",1,50,0,"elective")
        ]
      },
      { id:4, name:"Semester 4", tagline:"Leadership & Strategy",
        description:"Final core courses with strategic infrastructure focus.",
        totalCredits:11,
        subjects:[
          s("idm-sustainability-concepts","Concepts and Applications in Sustainability",1,50,0),
          s("idm-taxation-infra","Taxation for Infrastructure Projects",1,50,0),
          s("idm-intl-projects-marketing","International Projects and Marketing",2,100,0),
          s("idm-flexi-credit-s4a","Flexi-Credit Course",2,100,0),
          s("idm-flexi-credit-s4b","Flexi-Credit Course",2,100,0),
          s("idm-urban-infra","Urban Infrastructure",2,60,40),
          s("idm-project-4","Project IV",1,50,0)
        ]
      }
    ]
  }
];

// Assign colors per subject index
COURSES.forEach(c => c.semesters.forEach(sem => sem.subjects.forEach((sub,i) => { sub.color = sc(i); })));

// ===== PYQ Resource Generator =====
// Naming: [Program] - [Semester] - [Subject] - [Mid Sem/End Sem] - [Main/Backlog] - [Batch].pdf
// Rules:
//   - Skip projects and internships entirely
//   - Fully internal (TEE=0): Mid Sem Main only (no End Sem, no Backlog)
//   - External (TEE>0): Mid Sem Main + End Sem Main + End Sem Backlog
//   - No Mid Sem Backlog for any subject

const PYQ_BATCHES = ["2022-24","2023-25","2024-26","2025-27","2026-28"];
const PROGRAM_LABEL = {core:"MBA Core",ba:"MBA BA",idm:"MBA IDM"};
const SEM_LABEL = {1:"Sem I",2:"Sem II",3:"Sem III",4:"Sem IV"};

// Date = today for all placeholders; updates when driveLink is populated
const TODAY_DATE = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});

function pyqDate() {
  return TODAY_DATE;
}

const RESOURCES = {};
COURSES.forEach(course => {
  const progLabel = PROGRAM_LABEL[course.id];
  course.semesters.forEach(sem => {
    const semLabel = SEM_LABEL[sem.id];
    sem.subjects.forEach(sub => {
      const nameLower = sub.name.toLowerCase();
      if (nameLower.includes("project") || nameLower.includes("internship")) return;
      const isExternal = sub.tee > 0;
      const entry = { midSem: [], endSem: [], assignments: [], notes: [], prepVideos: [], summaries: [] };
      PYQ_BATCHES.forEach(batch => {
        const mkTitle = (exam, attempt) => `${progLabel} - ${semLabel} - ${sub.name} - ${exam} - ${attempt} - ${batch}`;
        const mkId = (tag) => `${sub.id}-${tag}-${batch}`;
        entry.midSem.push({
          id: mkId("mid-main"), title: mkTitle("Mid Sem", "Main"),
          date: pyqDate(),
          fileType:"PDF", size:"—", uploadedBy:"ASCEND Archive", batch, attempt:"Main",
          views:0, downloads:0, verified:false,
          description:`${sub.name} Mid Sem PYQ (Main) for batch ${batch}.`,
          course:course.id, semester:sem.id, driveLink:""
        });
        if (isExternal) {
          entry.endSem.push({
            id: mkId("end-main"), title: mkTitle("End Sem", "Main"),
            date: pyqDate(),
            fileType:"PDF", size:"—", uploadedBy:"ASCEND Archive", batch, attempt:"Main",
            views:0, downloads:0, verified:false,
            description:`${sub.name} End Sem PYQ (Main) for batch ${batch}.`,
            course:course.id, semester:sem.id, driveLink:""
          });
          entry.endSem.push({
            id: mkId("end-backlog"), title: mkTitle("End Sem", "Backlog"),
            date: pyqDate(),
            fileType:"PDF", size:"—", uploadedBy:"ASCEND Archive", batch, attempt:"Backlog",
            views:0, downloads:0, verified:false,
            description:`${sub.name} End Sem PYQ (Backlog) for batch ${batch}.`,
            course:course.id, semester:sem.id, driveLink:""
          });
        }
      });
      RESOURCES[sub.id] = entry;
    });
  });
});
// ── End of PYQ Generator ──

// ── Wire up available PDFs ──
// Each entry: [subjectId, resourceId, relativePath]
const PDF_MAP = [
  ["idm-roads-highways","idm-roads-highways-end-backlog-2024-26","https://drive.google.com/file/d/1NNC5lwCPwNiEOKAcnU14nVwpjsFv9OCx/preview"],
  ["idm-business-comm","idm-business-comm-end-backlog-2024-26","https://drive.google.com/file/d/1URY--olktlCR1T_r5_oEjuhpyGhM65xn/preview"],
  ["idm-mgmt-accounting","idm-mgmt-accounting-end-backlog-2024-26","https://drive.google.com/file/d/1jvfAPF2PdaQieIkJmElCIwkRyEDB1JSy/preview"],
  ["idm-business-stats","idm-business-stats-end-backlog-2024-26","https://drive.google.com/file/d/1RZMdSpa6_cOUUwaZSo80K-WhWh3ztvzX/preview"],
  ["idm-org-behaviour","idm-org-behaviour-end-backlog-2024-26","https://drive.google.com/file/d/1RHR7d8EXcG8pr_Sl6V-h3jgwi81vbRSg/preview"],
  ["ba-financial-accounting","ba-financial-accounting-end-backlog-2024-26","https://drive.google.com/file/d/1a-OngoMakG1GRcuqVPBemV99T5-LhUF9/preview"],
  ["ba-quant-methods","ba-quant-methods-end-backlog-2024-26","https://drive.google.com/file/d/1gwfBVbQG18uQyGyT2lkilQhHGFxt35Dz/preview"],
  ["ba-business-stats","ba-business-stats-end-backlog-2024-26","https://drive.google.com/file/d/1MAa8wKYERMSqbnxsS5gCDYVGaD0F7Ekl/preview"],
  ["ba-essentials-marketing","ba-essentials-marketing-end-backlog-2024-26","https://drive.google.com/file/d/17XoHVWiWmSaVQ6q7kyjaX2Y-hyN6oJSD/preview"],
  ["intro-financial-mgmt","intro-financial-mgmt-end-backlog-2023-25","https://drive.google.com/file/d/1f17tJuB81EuWod_9xJQXRQ2PIROiyGFT/preview"],
  ["hrm","hrm-end-backlog-2024-26","https://drive.google.com/file/d/11y6OsfKjbxpdHC5HGShDxXcHCN67aXBB/preview"],
  ["intro-financial-mgmt","intro-financial-mgmt-end-backlog-2024-26","https://drive.google.com/file/d/1H0sDRpNClVnZ9rZFoC_15s14r_EE0JAt/preview"],
  ["research-methodology","research-methodology-end-backlog-2024-26","https://drive.google.com/file/d/1ETajGJAjzjmVAi2dQXwRcWj-OcQ3KGWR/preview"],
  ["essentials-marketing","essentials-marketing-end-backlog-2024-26","https://drive.google.com/file/d/1nfMORpgmH1UUz8hShOVBDSm6lwe2BO3R/preview"],
  ["operations-research","operations-research-end-backlog-2024-26","https://drive.google.com/file/d/17X5E6vDCXL5XmzyV2r7YWpC9-mqNK9Sn/preview"],
  ["business-communication","business-communication-end-backlog-2024-26","https://drive.google.com/file/d/1XrvASSSwH3KeiFTmBMr87g-PtS_RfsP7/preview"],
  ["business-statistics","business-statistics-end-backlog-2024-26","https://drive.google.com/file/d/1WZp82XdkltWYflEbCd_1b2GxI44n1wXe/preview"],
  ["organizational-behaviour","organizational-behaviour-end-backlog-2024-26","https://drive.google.com/file/d/1oL8NHfIvQNG5HHX7PbO55vV9YQQaalkY/preview"],
  ["financial-accounting","financial-accounting-end-backlog-2024-26","https://drive.google.com/file/d/1-2LhXdHdrL-gX5cEeISpt6_0v6B13OXP/preview"]
];
PDF_MAP.forEach(([subId, resId, path]) => {
  const res = getResource(subId, resId);
  if (res) { res.driveLink = path; }
});

// Add chapters to Financial Accounting
const faSub = COURSES[0].semesters[0].subjects.find(s=>s.id==="financial-accounting");
faSub.description = "Financial Accounting is the foundation of financial literacy. It focuses on understanding, recording and reporting financial transactions.";
faSub.chapters = [
  {id:1,title:"Introduction to Accounting",concepts:["Meaning and objectives of accounting","Users of accounting information","Qualitative characteristics","Elements of financial statements"],topics:["Definition","Objectives","Users","Elements","Qualitative Characteristics"]},
  {id:2,title:"Accounting Process",concepts:["Double entry system","Rules of debit and credit","Accounting equation","Types of accounts"],topics:["Double Entry","Debit & Credit Rules","Accounting Equation","Golden Rules"]},
  {id:3,title:"Journal",concepts:["Journal entries format","Compound journal entries","Opening entries","Closing entries"],topics:["Format","Compound Entries","Opening","Closing","Narration"]},
  {id:4,title:"Ledger",concepts:["Posting from journal to ledger","Balancing of accounts","Types of ledger accounts"],topics:["Posting","Balancing","T-Accounts","Classification"]},
  {id:5,title:"Trial Balance",concepts:["Preparation of trial balance","Objectives and limitations","Errors not disclosed","Suspense account"],topics:["Preparation","Objectives","Errors","Suspense Account"]},
  {id:6,title:"Final Accounts",concepts:["Trading account","Profit & Loss account","Balance Sheet","Adjustments and provisions"],topics:["Trading A/c","P&L A/c","Balance Sheet","Adjustments"]},
  {id:7,title:"Rectification of Errors",concepts:["Types of errors","One-sided errors","Two-sided errors","Effect on trial balance"],topics:["Error Types","One-sided","Two-sided","Suspense"]}
];

// ===== Helper Functions =====
function getCourse(id){return COURSES.find(c=>c.id===id)}
function getSemester(courseId,semId){const c=getCourse(courseId);return c?c.semesters.find(s=>s.id===parseInt(semId)):null}
function getSubject(courseId,semId,subId){const sem=getSemester(courseId,semId);return sem?sem.subjects.find(s=>s.id===subId):null}
function getResource(subId,resId){const r=RESOURCES[subId];if(!r)return null;for(const cat of Object.values(r)){const f=cat.find(x=>x.id===resId);if(f)return f}return null}
function getResourcesByCategory(subId,cat){const r=RESOURCES[subId];return r?(r[cat]||[]):[]}
function getParam(n){return new URLSearchParams(window.location.search).get(n)}

// Build flat resource index for Explore page
// Pass {onlyWithContent:true} to get only resources with a driveLink
function getAllResources(opts){
  const all=[];
  const onlyContent = opts && opts.onlyWithContent;
  Object.entries(RESOURCES).forEach(([subId,cats])=>{
    Object.entries(cats).forEach(([cat,items])=>{
      items.forEach(r=>{
        if(onlyContent && !r.driveLink) return;
        all.push({...r,subjectId:subId,resourceType:cat});
      });
    });
  });
  return all;
}

// Get subjects filtered by specialization
function getSubjectsForSpec(subjects, specId){
  if(!specId||specId==='all') return subjects;
  if(specId==='core') return subjects.filter(s=>s.specializations.includes('all'));
  return subjects.filter(s=>s.specializations.includes('all')||s.specializations.includes(specId));
}

// Stats helpers
function getCourseStats(courseId){
  const c=getCourse(courseId);if(!c)return{};
  let subjects=0,resources=0;
  c.semesters.forEach(sem=>{subjects+=sem.subjects.length});
  // Only count resources that have actual content (driveLink populated)
  const r=RESOURCES;Object.values(r).forEach(cats=>Object.values(cats).forEach(items=>{
    items.forEach(item=>{if(item.driveLink) resources++});
  }));
  return{semesters:c.semesters.length,subjects,resources};
}
