import { useState } from "react";

// ── Design tokens ─────────────────────────────────────────────
const BG      = "#0f0f0f";
const SURF    = "#1a1a1a";
const SURF2   = "#222222";
const BORDER  = "#2a2a2a";
const TEXT    = "#f0f0f0";
const TEXT2   = "#9ca3af";
const TEXT3   = "#4b5563";

// Career ladder colors (the second data layer)
const LC = {
  "Tech/Ed":              { c: "#ffdf00" },
  "AI Policy":            { c: "#00b100" },
  "Government Affairs":   { c: "#c457f3" },
  "Product/Project Mgmt": { c: "#FF4040" },
  "Gaming/Technical":     { c: "#40f5ff" },
  "Consulting":           { c: "#94a3b8" },
};

// Status column colors
const SC = {
  "Qualified":     { c: "#03be00", hbg: "#1A1A1A" },
  "Reach":         { c: "#fe8300", hbg: "#2A2A2A" },
  "Aspirational":  { c: "#03b8ff", hbg: "#1A1A1A" },
  "Over Qualified":{ c: "#ff0000", hbg: "#1A1A1A" },
};

// Row header colors
const PC = {
  "US-Based":               { c: "#F0F0F0", hbg: "#1A1A1A" },
  "Colombia/International": { c: "#F0F0F0", hbg: "#1A1A1A" },
};

// Kanban columns
const KC = {
  todo:       { c: "#FFFFFF", label: "To-Do"       },
  inprogress: { c: "#60a5fa", label: "In Progress"  },
  sent:       { c: "#4ade80", label: "Sent"         },
};
const KNEXT = { todo:"inprogress", inprogress:"sent",  sent:null        };
const KPREV = { todo:null,         inprogress:"todo",  sent:"inprogress" };

// Parking modifier badge colors
const RC = {
  "Career Coach": { c: "#67e8f9", bg: "#0c4a6e" },
  "Clearance":    { c: "#fca5a5", bg: "#450a0a" },
  "Closed":       { c: "#6b7280", bg: "#1f2937" },
  "Watch":        { c: "#6b7280", bg: "#1f2937" },
};

const MAIN_COLS = ["Qualified","Reach","Aspirational"];
const SKIP_COLS = ["Over Qualified","Qualified","Reach"]; // Aspirational exists but hidden
const ROWS      = ["US-Based","Colombia/International"];

// ── Data ─────────────────────────────────────────────────────
const MAIN = [
  // QUALIFIED · US-Based
  { id:1,  status:"Qualified",    row:"US-Based",               ladder:"Tech/Ed",              kanban:"inprogress", salary:"$270K–$365K",        salaryMin:270000, role:"AI Fluency Education Lead",                         company:"Anthropic",         loc:"San Francisco / NYC",                url:"https://job-boards.greenhouse.io/anthropic/jobs/5383242008",                                      note:"Best overall fit in the entire search. AI literacy + curriculum design + technical fluency intersection. Scale gap is the only honest miss. #1 priority." },
  { id:2,  status:"Qualified",    row:"US-Based",               ladder:"AI Policy",            kanban:"todo",       salary:"$171K–$280K+equity", salaryMin:171000, role:"US External Affairs Associate, Global Affairs",     company:"OpenAI",            loc:"Washington, DC",                     url:"https://openai.com/careers/us-external-affairs-associate-global-affairs-washington-dc/",          note:"Coalition building with skeptical civil society groups. Colombian-American identity and bilingual Spanish are real differentiators. DC summers are a climate concern." },
  { id:3,  status:"Qualified",    row:"US-Based",               ladder:"AI Policy",            kanban:"todo",       salary:"$170K–$190K+equity", salaryMin:170000, role:"Government and Community Affairs Manager",          company:"OpenAI",            loc:"San Francisco",                      url:"https://openai.com/careers/government-and-community-affairs-manager-san-francisco/",              note:"AI fluency meets community engagement in California. Bilingual Spanish is an asset. California political knowledge is the gap to address in the cover letter." },
  { id:4,  status:"Qualified",    row:"US-Based",               ladder:"Tech/Ed",              kanban:"todo",       salary:"$225K–$250K",        salaryMin:225000, role:"AI Product Manager",                               company:"Success Academy",   loc:"New York City (hybrid)",             url:"https://job-boards.greenhouse.io/successacademycharterschool/jobs/5212041008",                    note:"Long shot. AI enablement across a K-12 network expanding to Florida. AI-curriculum story and compliance-bounded tooling are the best proof points." },
  { id:5,  status:"Qualified",    row:"US-Based",               ladder:"Tech/Ed",              kanban:"todo",       salary:"$110K–$125K (est.)", salaryMin:110000, role:"Program Manager, Enrollment",                      company:"Success Academy",   loc:"NYC or Florida (unconfirmed)",       url:"https://job-boards.greenhouse.io/successacademycharterschool/jobs/5221281008",                    note:"Well-calibrated fit. Florida expansion team. Confirm location before investing in application — that is the decisive variable." },
  { id:6,  status:"Qualified",    row:"US-Based",               ladder:"Tech/Ed",              kanban:"todo",       salary:"$85K–$110K",         salaryMin:85000,  role:"Program Manager, Claude Corps",                    company:"CodePath",          loc:"Remote (US)",                        url:"https://job-boards.greenhouse.io/codepath/jobs/5182020007",                                       note:"Strongest near-term realistic match. The AI workflow application question is a layup given Teen Court tooling. Five written prompts — apply carefully, not fast." },
  // REACH · US-Based
  { id:7,  status:"Reach",        row:"US-Based",               ladder:"AI Policy",            kanban:"sent",       salary:"$180K–$440K",        salaryMin:180000, role:"Mission Manager, Intl Government (South America)", company:"xAI",               loc:"Palo Alto (30–50% travel S. America)",url:"https://www.linkedin.com/jobs/view/4388512244/",                                                  note:"Colombia named in preferred qualifications. Native Spanish. AI-in-public-sector experience. Applied — broken link, outreach sent to Gabriela Castillo and Olivia Ogden." },
  { id:8,  status:"Reach",        row:"US-Based",               ladder:"Tech/Ed",              kanban:"todo",       salary:"$132K–$258K",        salaryMin:258000, role:"Director, Education and Workforce Policy US",       company:"Microsoft",         loc:"Redmond / Bay Area / NYC",           url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=2143f2e4-613a-4610-a24f-27c9cc71edde",            note:"AI literacy + K-12 + LATAM coverage converging in one role. Campaign experience named as a qualifying credential. 6+ years or equivalent. Reaching for the stars, not the galaxy." },
  { id:9,  status:"Reach",        row:"US-Based",               ladder:"Government Affairs",   kanban:"todo",       salary:"$120K–$150K",        salaryMin:120000, role:"Sr. Manager, Government Relations",                 company:"Cargill",           loc:"Seattle, WA",                        url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=9f176d7e-e701-41b1-96f0-b7f0833deca6",            note:"Strongest traditional government affairs role. Seattle clears climate bar. Latin America preferred qualification is a direct match. 4 years minimum, 'or equivalent'." },
  { id:10, status:"Reach",        row:"US-Based",               ladder:"Government Affairs",   kanban:"todo",       salary:"$140K+",             salaryMin:140000, role:"Director, Government Affairs",                      company:"Hertz Corporation", loc:"Washington, DC (remote)",            url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=f8cf7c7d-fac8-46ad-91d7-df30a04fa28a",            note:"Remote DC role. 5+ years government affairs required — campaign work is the argument. Mission question (corporate auto) worth sitting with." },
  { id:11, status:"Reach",        row:"US-Based",               ladder:"Government Affairs",   kanban:"todo",       salary:"$130K–$180K (est.)", salaryMin:130000, role:"Sr. Manager, Gov Relations — Americas",             company:"Match Group",       loc:"Washington, DC (hybrid)",            url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=44a08474-717b-40f8-be93-7bfb3f915e35",            note:"8 years tech-focused GR required plus established Hill network — harder wall than Cargill. Online safety and privacy domain is interesting. 40% travel." },
  { id:12, status:"Reach",        row:"US-Based",               ladder:"AI Policy",            kanban:"todo",       salary:"$80K–$182K",         salaryMin:80168,  role:"Global AI Policy Associate",                        company:"Tencent",           loc:"Palo Alto, CA (in-office)",          url:"https://builtin.com/job/product-management-senior-specialist/8798725",                            note:"0-3 years required — overqualified on years. AI policy, LATAM thread relevant. Bay Area climate ideal. Chinese ownership flagged re: future clearance but not a current dealbreaker." },
  { id:13, status:"Reach",        row:"US-Based",               ladder:"Product/Project Mgmt", kanban:"todo",       salary:"$98K–$153K",         salaryMin:98000,  role:"Product Manager",                                   company:"Nava PBC",          loc:"Remote (FL-eligible)",               url:"https://job-boards.greenhouse.io/navapbc/jobs/4293670009",                                        note:"Civic tech nonprofit modernizing government digital services. 3+ years PM required. Florida on approved states list. Flexible leveling. Strong mission alignment." },
  { id:14, status:"Reach",        row:"US-Based",               ladder:"Product/Project Mgmt", kanban:"todo",       salary:"$100K–$108K",        salaryMin:100000, role:"Project Manager",                                   company:"DirectDefense",     loc:"Remote (US)",                        url:"https://careers.jobscore.com/careers/directdefense/jobs/project-manager-dJDxoG4i1mt6qDIect8AML",  note:"Cybersecurity managed services PM. Functional fit is real; domain is the gap. Coordination around security work, not performing it." },
  { id:15, status:"Reach",        row:"US-Based",               ladder:"Tech/Ed",              kanban:"todo",       salary:"$82K–$102K",         salaryMin:82100,  role:"Product Operations Manager",                        company:"Teachstone",        loc:"Remote (US)",                        url:"https://builtin.com/job/product-operations-manager/9253356",                                      note:"CLASS observation tool for K-12 teacher assessment. Direct line to PBIS behavioral data work. Verify still live before applying." },
  // REACH · Colombia/International
  { id:16, status:"Reach",        row:"Colombia/International", ladder:"Product/Project Mgmt", kanban:"todo",       salary:"TBD (est. $40–60K)", salaryMin:40000,  role:"Project Manager 3",                                 company:"Twilio",            loc:"Remote — Colombia",                  url:"https://job-boards.greenhouse.io/twilio/jobs/7818575",                                            note:"Colombian citizenship clears work authorization. Functional fit is real. Salary likely below Bogota lifestyle floor — confirm before applying." },
  // ASPIRATIONAL · US-Based
  { id:17, status:"Aspirational", row:"US-Based",               ladder:"Product/Project Mgmt",               salary:"$140K–$209K",        salaryMin:140000, role:"Staff Technical Program Manager, AI Native",        company:"Life360",           loc:"Remote (US)",                        url:"https://job-boards.greenhouse.io/life360/jobs/8627517002",                                        note:"A rung between now and the EA Director of Operations role. 10+ years required. AI-native operating system, Claude agents. Mid-career waypoint." },
  { id:18, status:"Aspirational", row:"US-Based",               ladder:"Product/Project Mgmt",               salary:"$209K+",             salaryMin:209000, role:"Group Product Manager",                             company:"Ordergroove",       loc:"Remote (NYC HQ)",                    url:"https://www.ordergroove.com/jobs/?gh_jid=8357233002",                                             note:"Manages a team of PMs owning the Merchant Growth Pillar. People-management layer above IC PM — requires having already been a PM." },
  { id:19, status:"Aspirational", row:"US-Based",               ladder:"Gaming/Technical",                   salary:"$175K–$276K",        salaryMin:175600, role:"Head of Operations, Global Affairs",                company:"Electronic Arts",   loc:"Redwood City / LA / Seattle",        url:"https://jobs.ea.com/en_US/careers/JobDetail/Head-of-Operations-Global-Affairs/215799",            note:"10+ years operations + people leadership + corporate legal-ops. No LATAM or Spanish advantage. Marker for a different senior EA path vs. the Bogota operations role." },
  { id:20, status:"Aspirational", row:"US-Based",               ladder:"Gaming/Technical",                   salary:"$133K–$186K CAD",    salaryMin:100000, role:"Senior Lead Game Product Manager, EA SPORTS FC",    company:"Electronic Arts",   loc:"Vancouver, Canada (hybrid)",         url:"https://jobs.ea.com/en_US/careers/JobDetail/Senior-Lead-Game-Product-Manager-EA-Sports-FC/214892",note:"10 years formal PM required. Canada requires employer sponsorship. Skills roadmap more than a target — telemetry, forecasting, PM mentoring to build toward." },
  // ASPIRATIONAL · Colombia/International
  { id:21, status:"Aspirational", row:"Colombia/International", ladder:"Gaming/Technical",                   salary:"$75K–$115K (est.)",  salaryMin:75000,  role:"Director of Operations, Quality Verification",      company:"Electronic Arts",   loc:"Bogota, Colombia",                   url:"https://jobs.ea.com/en_US/careers/JobDetail/Director-of-Operations/212808",                       note:"8+ years QA/operations in gaming. On-site Bogota. Colombian citizenship is the work-auth advantage. Gaming operations leadership in your city. Galaxy next door." },
  { id:22, status:"Aspirational", row:"Colombia/International", ladder:"Gaming/Technical",                   salary:"$104K–$142K CAD",    salaryMin:78000,  role:"Development Manager, EA SPORTS FC",                 company:"Electronic Arts",   loc:"Vancouver, Canada (hybrid)",         url:"https://jobs.ea.com/en_US/careers/JobDetail/Development-Manager/215637",                          note:"3+ years managing engineering/artist teams in Agile game development. Canada work authorization required. Technical production management — not the current track." },
];

const PARKING = [
  { id:101, zone:"coach",   reason:"Career Coach", softStatus:"Reach",        track:"US-Based",               ladder:"AI Policy",            role:"External Affairs, US Federal",       company:"Anthropic",         salary:"$265K–$295K",  salaryMin:265000, loc:"Washington, DC",        url:"https://job-boards.greenhouse.io/anthropic/jobs/5382274008",                                      note:"Requires established Senate relationships — the hard wall. Application is light. Discuss with coach whether federal AI policy is the right DC ladder long-term. Apply anyway given light lift." },
  { id:102, zone:"coach",   reason:"Career Coach", softStatus:"Aspirational", track:"US-Based",               ladder:"Tech/Ed",              role:"Head of Content & Curriculum",       company:"Anthropic",         salary:"$290K–$435K",  salaryMin:290000, loc:"San Francisco / NYC",   url:"https://job-boards.greenhouse.io/anthropic/jobs/5288959008",                                      note:"Same team as the AI Fluency Lead — this is what that role grows into. Requires managing a team of content strategists. Not an application now. Discuss as a medium-term trajectory marker." },
  { id:103, zone:"coach",   reason:"Career Coach", softStatus:"Reach",        track:"US-Based",               ladder:"Consulting",           role:"Consultant, Experienced Hire",       company:"BCG",               salary:"Est. $175K+",  salaryMin:175000, loc:"DC / Summit NJ / Philly",url:"https://careers.bcg.com/global/en/job/54552/Consultant-Experienced-Hire-United-States",           note:"Case interview is the wall, not credentials. BCG DC is public-sector heavy. Discuss with coach: is case prep realistic given the year-end timeline?" },
  { id:104, zone:"coach",   reason:"Career Coach", softStatus:"Reach",        track:"Colombia/International", ladder:"Consulting",           role:"Consultant, Colombia 2026",           company:"BCG",               salary:"Not posted",   salaryMin:0,      loc:"Bogota, Colombia",      url:"https://careers.bcg.com/global/en/job/55841/Consultant-Colombia-2026",                           note:"Requires active graduate enrollment — hard eligibility gate. Discuss: does an MBA or relevant master's make BCG Bogota a realistic medium-term target?" },
  { id:105, zone:"longterm",reason:"Clearance",   softStatus:"Reach",        track:"US-Based",               ladder:"Consulting",           role:"AI Advisory Strategy Consultant",    company:"Deloitte",          salary:"$93K–$155K",   salaryMin:93100,  loc:"Arlington, VA",         url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=86bcbc36-016d-4828-aad2-bcc49633db1f",            note:"Without clearance: one of the best DC matches — AI governance, responsible-use policy, translating tech for government clients. Active Secret clearance currently required." },
  { id:106, zone:"longterm",reason:"Clearance",   softStatus:"Aspirational", track:"US-Based",               ladder:"AI Policy",            role:"Latin America Intelligence Team Lead",company:"Peraton",           salary:"$135K–$216K",  salaryMin:135000, loc:"Washington, DC",        url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=633f65dc-bc2c-4f3e-8586-c4e78b83bb9d",            note:"Without clearance: still aspirational — 12 years intel analysis required. The Latin America thread is real. Worth revisiting when financially cushioned." },
  { id:107, zone:"longterm",reason:"Closed",      softStatus:"Qualified",    track:"US-Based",               ladder:"Tech/Ed",              role:"Product Manager, Classwork",         company:"College Board",     salary:"$80K–$157K",   salaryMin:80000,  loc:"Remote (US)",           url:"https://collegeboard.wd1.myworkdayjobs.com/en-US/Careers",                                        note:"Was the cleanest fit in the entire search — JD written around the teacher-to-product transition. Set a job alert on their Workday; this team will hire again." },
  { id:108, zone:"longterm",reason:"Closed",      softStatus:"Reach",        track:"US-Based",               ladder:"Product/Project Mgmt", role:"Product Manager in Civic Tech",      company:"Last Call Media",   salary:"$90K–$120K",   salaryMin:90000,  loc:"Remote (US)",           url:"https://lastcallmedia.com/careers",                                                               note:"Government/community-improvement digital agency. Strong stakeholder translation fit. Follow on LinkedIn for future openings — small shops recycle roles." },
  { id:109, zone:"longterm",reason:"Closed",      softStatus:"Reach",        track:"US-Based",               ladder:"Tech/Ed",              role:"Product Manager ($135–175K)",        company:"CodePath",          salary:"$135K–$175K",  salaryMin:135000, loc:"Remote (US)",           url:"https://codepath.org/careers",                                                                    note:"Higher-paying CodePath PM role. Closed before application. The Claude Corps Program Manager (still live) is the better-calibrated option anyway." },
  { id:110, zone:"longterm",reason:"Watch",       softStatus:"Aspirational", track:"US-Based",               ladder:"Gaming/Technical",     role:"No current matching role",           company:"Underdog Sports",   salary:"N/A",          salaryMin:0,      loc:"Remote",                url:"https://underdogfantasy.com/careers",                                                             note:"Fast-growing sports-tech, AI-native, irreverent culture. Genuine personal interest in the product. Watch for Product/Program/Operations openings." },
  { id:111, zone:"longterm",reason:"Watch",       softStatus:"Aspirational", track:"US-Based",               ladder:"Consulting",           role:"No current matching role",           company:"McKinsey & Company",salary:"N/A",          salaryMin:0,      loc:"Various",               url:"https://www.mckinsey.com/careers",                                                                note:"Top-tier management consulting firm. Equivalent career target to BCG and Deloitte. Watch for policy, technology, or education practice openings." },
];

const SKIPPED = [
  { id:200, col:"Over Qualified", row:"US-Based",               ladder:"Government Affairs",   role:"Early Career Program, N. America & LATAM Gov", company:"World Economic Forum", salary:"$4,550/mo",         salaryMin:0,      loc:"New York City",          skipReason:"Pay unsustainable in NYC; max 3-year experience cap disqualifies",              url:"" },
  { id:201, col:"Over Qualified", row:"US-Based",               ladder:"Government Affairs",   role:"Government Affairs Analyst",                   company:"MetLife",             salary:"$62,100–$80,000",   salaryMin:62100,  loc:"Washington, DC",         skipReason:"Below floor; entry-level admin support, overqualified on experience",           url:"https://www.tommanatosjobs.com/JobDetail.aspx?j=13cde8bf-bec4-45e6-ba99-8ab3b5e4b249" },
  { id:202, col:"Qualified",      row:"US-Based",               ladder:"Gaming/Technical",     role:"Guerrilla Marketing Associate",                company:"Underdog Sports",     salary:"$75K–$100K",        salaryMin:75000,  loc:"Remote",                 skipReason:"Wrong function; company tracked as cultural interest instead",                  url:"https://job-boards.greenhouse.io/underdog/jobs/4719643005" },
  { id:203, col:"Qualified",      row:"US-Based",               ladder:"Tech/Ed",              role:"Senior Program Officer, K-12 Field Readiness", company:"Gates Foundation",    salary:"$190K–$294K",       salaryMin:190100, loc:"Seattle, WA",            skipReason:"11-month limited term; grantmaking portfolio management experience absent",     url:"" },
  { id:204, col:"Qualified",      row:"Colombia/International", ladder:"Gaming/Technical",     role:"EA SPORTS Academy — Game Maker",               company:"Electronic Arts",     salary:"Not posted",        salaryMin:0,      loc:"Vancouver, Canada",      skipReason:"12-month term program; likely below salary floor; Canada requires sponsorship", url:"https://jobs.ea.com/en_US/careers/JobDetail/Assoc-DM-II/215742" },
  { id:205, col:"Reach",          row:"US-Based",               ladder:"Government Affairs",   role:"Director, LAC Policy Strategy",                company:"Visa",                salary:"$163K–$261K",       salaryMin:163500, loc:"Miami, FL",              skipReason:"Payments experience listed as essential; Miami climate fails bar",              url:"" },
  { id:206, col:"Reach",          row:"US-Based",               ladder:"Tech/Ed",              role:"Proposal Manager",                             company:"Khan Academy",        salary:"$96,800–$121,000",  salaryMin:96800,  loc:"Remote (US)",            skipReason:"Grant writing and RFP management experience absent",                           url:"https://job-boards.greenhouse.io/khanacademy/jobs/8056270" },
  { id:207, col:"Reach",          row:"US-Based",               ladder:"Product/Project Mgmt", role:"Project Manager, Ubuntu Embedded Systems",     company:"Canonical",           salary:"Not posted",        salaryMin:0,      loc:"Remote (Americas/EMEA)", skipReason:"Linux/embedded systems domain too specialized",                                url:"https://canonical.com/careers/2808065" },
  { id:208, col:"Reach",          row:"US-Based",               ladder:"AI Policy",            role:"Technical Policy Researcher",                  company:"Irregular",           salary:"Not posted",        salaryMin:0,      loc:"On-site (unspecified)",  skipReason:"ML engineering depth required for AI security research",                       url:"https://jobs.ashbyhq.com/Irregular/69966779-e3e7-4ffa-a691-329b86dbf53d" },
  { id:209, col:"Reach",          row:"Colombia/International", ladder:"Consulting",           role:"AI Tech Architect",                            company:"BCG Platinion",       salary:"Not posted",        salaryMin:0,      loc:"Bogotá & Santiago",      skipReason:"Python/ML engineering stack outside background",                               url:"https://careers.bcg.com/global/en/job/58697" },
];

// ── Root ─────────────────────────────────────────────────────
export default function JobTracker() {
  const [view,        setView]        = useState("pipeline");
  const [expanded,    setExpanded]    = useState(null);
  const [parkingOpen, setParkingOpen] = useState(false);
  const [kanban,      setKanban]      = useState(() => {
    const s = {};
    MAIN.forEach(j => { if (j.kanban) s[j.id] = j.kanban; });
    return s;
  });

  const kJobs  = MAIN.filter(j => j.status === "Qualified" || j.id === 7);
  const toggle = id => setExpanded(p => p === id ? null : id);
  const move   = (id, col) => setKanban(p => ({ ...p, [id]: col }));

  return (
    <div style={{ fontFamily:"'Inter',-apple-system,sans-serif", background:BG, minHeight:"100vh", color:TEXT }}>

      {/* Header */}
      <div style={{ background:"#000", padding:"16px 24px", borderBottom:`1px solid ${BORDER}` }}>
        <h1 style={{ margin:0, fontSize:18, fontWeight:700, letterSpacing:"-0.3px" }}>Wilson's Job Pipeline</h1>
        <p style={{ margin:"3px 0 0", fontSize:11, color:TEXT3 }}>
          {MAIN.length} active · {PARKING.length} in parking lot · {SKIPPED.length} passed on
        </p>
      </div>

      {/* Tabs */}
      <div style={{ background:"#111", borderBottom:`1px solid ${BORDER}`, padding:"0 24px", display:"flex" }}>
        {[["pipeline","Pipeline"],["kanban","Applications"],["passedOn","Passed On"]].map(([v,lbl]) => (
          <button key={v} onClick={() => setView(v)} style={{
            padding:"10px 18px", border:"none",
            borderBottom: view===v ? `2.5px solid ${TEXT}` : "2.5px solid transparent",
            background:"transparent", color: view===v ? TEXT : TEXT3,
            fontWeight: view===v ? 700 : 400, fontSize:13, cursor:"pointer",
          }}>{lbl}</button>
        ))}
      </div>

      {/* Ladder legend */}
      <div style={{ background:"#111", padding:"7px 24px", borderBottom:`1px solid ${BORDER}`, display:"flex", flexWrap:"wrap", gap:16, alignItems:"center" }}>
        <span style={{ fontSize:10, color:TEXT3, fontWeight:600, letterSpacing:"0.06em" }}>LADDER</span>
        {Object.entries(LC).map(([name,{c}]) => (
          <div key={name} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:8, height:8, borderRadius:2, background:c }} />
            <span style={{ fontSize:11, color:TEXT2 }}>{name}</span>
          </div>
        ))}
      </div>

      <div style={{ padding:"20px 24px", maxWidth:1200, margin:"0 auto" }}>

        {/* ══ PIPELINE ══ */}
        {view === "pipeline" && <>
          <Grid jobs={MAIN} cols={MAIN_COLS} rows={ROWS} isSkipped={false} expanded={expanded} onToggle={toggle} />

          <button onClick={() => setParkingOpen(p=>!p)} style={{
            width:"100%", padding:"10px 16px", marginTop:16,
            background:SURF, border:`1px dashed #444`, borderRadius:8,
            cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center",
            color:TEXT2, fontSize:13, fontWeight:600,
          }}>
            <span>🅿️  Parking Lot — {PARKING.length} roles</span>
            <span style={{ fontSize:11 }}>{parkingOpen ? "▲ collapse" : "▼ expand"}</span>
          </button>

          {parkingOpen && (
            <div style={{ marginTop:12, padding:"16px", background:SURF, border:`1px dashed #444`, borderRadius:8 }}>
              <ParkingZone label="⏳ Waiting for Sorting" sub="Career Coach follow-up needed before firm placement"
                jobs={PARKING.filter(j=>j.zone==="coach")} expanded={expanded} onToggle={toggle} />
              <div style={{ height:1, background:BORDER, margin:"14px 0" }} />
              <ParkingZone label="🔒 Long-term Parking"   sub="Closed, clearance-blocked, or watching"
                jobs={PARKING.filter(j=>j.zone==="longterm")} expanded={expanded} onToggle={toggle} />
            </div>
          )}
        </>}

        {/* ══ KANBAN ══ */}
        {view === "kanban" && <>
          <p style={{ fontSize:12, color:TEXT3, margin:"0 0 18px" }}>
            Active pipeline jobs + submitted applications. Use arrows to move cards between stages.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
            {["todo","inprogress","sent"].map(col => {
              const cc = KC[col];
              const colJobs = kJobs.filter(j => (kanban[j.id]||"todo") === col);
              return (
                <div key={col}>
                  <div style={{ padding:"9px 13px", borderRadius:"7px 7px 0 0", background:SURF, border:`1px solid ${BORDER}`, borderBottom:"none", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, fontWeight:700, color:cc.c }}>{cc.label}</span>
                    <span style={{ fontSize:10, fontWeight:700, width:18, height:18, borderRadius:"50%", background:cc.c, color:"#000", display:"flex", alignItems:"center", justifyContent:"center" }}>{colJobs.length}</span>
                  </div>
                  <div style={{ minHeight:200, padding:9, border:`1px solid ${BORDER}`, borderTop:"none", borderRadius:"0 0 7px 7px", background:BG, display:"flex", flexDirection:"column", gap:7 }}>
                    {colJobs.map(job => {
                      const lc = LC[job.ladder]||{c:"#6b7280"};
                      const sc = SC[job.status]||SC.Qualified;
                      const nxt = KNEXT[col]; const prv = KPREV[col];
                      return (
                        <div key={job.id} style={{ background:SURF, border:`1px solid ${BORDER}`, borderLeft:`4px solid ${lc.c}`, borderRadius:6, padding:"9px 11px" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:TEXT, marginBottom:2, lineHeight:1.4 }}>{job.role}</div>
                          <div style={{ fontSize:10, color:TEXT2, marginBottom:2 }}>{job.company}</div>
                          <div style={{ fontSize:10, color:lc.c, fontWeight:600, marginBottom:7 }}>{job.salary}</div>
                          <div style={{ display:"flex", gap:4, marginBottom:7, alignItems:"center" }}>
                            <span style={{ fontSize:9, fontWeight:700, padding:"1px 5px", borderRadius:8, background:sc.hbg, color:sc.c }}>{job.status}</span>
                            {job.id===7 && <span style={{ fontSize:9, color:TEXT3 }}>outreach sent</span>}
                          </div>
                          <div style={{ display:"flex", gap:4 }}>
                            {prv && <button onClick={()=>move(job.id,prv)} style={{ flex:1, padding:"3px 0", border:`1px solid ${BORDER}`, background:SURF2, color:KC[prv].c, borderRadius:4, fontSize:9, fontWeight:700, cursor:"pointer" }}>← {KC[prv].label}</button>}
                            {nxt && <button onClick={()=>move(job.id,nxt)} style={{ flex:1, padding:"3px 0", border:`1px solid ${BORDER}`, background:SURF2, color:KC[nxt].c, borderRadius:4, fontSize:9, fontWeight:700, cursor:"pointer" }}>→ {KC[nxt].label}</button>}
                          </div>
                        </div>
                      );
                    })}
                    {!colJobs.length && <div style={{ fontSize:11, color:TEXT3, textAlign:"center", padding:"24px 0" }}>Empty</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </>}

        {/* ══ PASSED ON ══ */}
        {view === "passedOn" && <>
          <p style={{ fontSize:12, color:TEXT3, margin:"0 0 16px" }}>
            Jobs reviewed and passed on. Columns reflect qualification level had the skip reason not applied.
          </p>
          <Grid jobs={SKIPPED} cols={SKIP_COLS} rows={ROWS} isSkipped={true} expanded={expanded} onToggle={toggle} />
        </>}

      </div>
    </div>
  );
}

// ── Shared grid ───────────────────────────────────────────────
function Grid({ jobs, cols, rows, isSkipped, expanded, onToggle }) {
  const getCol = j => isSkipped ? j.col : j.status;
  return (
    <div style={{ overflowX:"auto" }}>
      <div style={{
        display:"grid",
        gridTemplateColumns:`80px ${"1fr ".repeat(cols.length).trim()}`,
        gap:"1px", background:BORDER,
        border:`1px solid ${BORDER}`, borderRadius:10, overflow:"hidden", minWidth:600,
      }}>
        {/* Corner */}
        <div style={{ background:SURF }} />

        {/* Column headers */}
        {cols.map(col => {
          const sc = SC[col]||SC.Qualified;
          const count = jobs.filter(j => getCol(j) === col).length;
          return (
            <div key={col} style={{ background:sc.hbg, padding:"11px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, fontWeight:700, color:sc.c }}>{col}</span>
              <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:10, background:"rgba(0,0,0,0.35)", color:sc.c }}>{count}</span>
            </div>
          );
        })}

        {/* Rows */}
        {rows.map(row => {
          const pc = PC[row];
          return [
            <div key={`${row}-h`} style={{ background:pc.hbg, display:"flex", alignItems:"center", justifyContent:"center", padding:"12px 4px", minHeight:80 }}>
              <span style={{ fontSize:10, fontWeight:700, color:pc.c, writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{row}</span>
            </div>,
            ...cols.map(col => {
              const cellJobs = jobs
                .filter(j => getCol(j) === col && j.row === row)
                .sort((a,b) => b.salaryMin - a.salaryMin);
              return (
                <div key={`${row}-${col}`} style={{ background:SURF, padding:10, maxHeight:380, overflowY:"auto" }}>
                  {cellJobs.length === 0
                    ? <div style={{ minHeight:60, display:"flex", alignItems:"center", justifyContent:"center", color:BORDER, fontSize:20 }}>—</div>
                    : <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                        {cellJobs.map(job => isSkipped
                          ? <SkippedCard key={job.id} job={job} />
                          : <GridCard key={job.id} job={job} expanded={expanded===job.id} onToggle={onToggle} />
                        )}
                      </div>
                  }
                </div>
              );
            }),
          ];
        })}
      </div>
    </div>
  );
}

// ── Pipeline card ─────────────────────────────────────────────
function GridCard({ job, expanded, onToggle }) {
  const lc = LC[job.ladder]||{c:"#6b7280"};
  return (
    <div style={{ background:SURF2, border:`1px solid ${BORDER}`, borderLeft:`4px solid ${lc.c}`, borderRadius:6, overflow:"hidden" }}>
      <div onClick={() => onToggle(job.id)} style={{ padding:"8px 10px", cursor:"pointer" }}>
        <div style={{ fontSize:11, fontWeight:600, color:TEXT, lineHeight:1.3, marginBottom:3 }}>{job.role}</div>
        <div style={{ fontSize:10, color:TEXT2, marginBottom:2 }}>{job.company}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:10, color: job.salaryMin>0 ? lc.c : TEXT3, fontWeight:600 }}>{job.salary}</span>
          <span style={{ fontSize:9, color:TEXT3 }}>{expanded?"▲":"▼"}</span>
        </div>
      </div>
      {expanded && (
        <div style={{ padding:"0 10px 10px", borderTop:`1px solid ${BORDER}` }}>
          <div style={{ fontSize:10, color:TEXT3, margin:"6px 0 5px" }}>{job.loc}</div>
          <p style={{ fontSize:11, color:TEXT2, lineHeight:1.55, margin:"0 0 8px" }}>{job.note}</p>
          {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"4px 10px", background:lc.c, color:"#000", borderRadius:4, fontSize:10, fontWeight:700, textDecoration:"none" }}>View →</a>}
        </div>
      )}
    </div>
  );
}

// ── Skipped card ──────────────────────────────────────────────
function SkippedCard({ job }) {
  const lc = LC[job.ladder]||{c:"#6b7280"};
  return (
    <div style={{ background:SURF2, border:`1px solid ${BORDER}`, borderLeft:`4px solid ${lc.c}`, borderRadius:6, padding:"8px 10px" }}>
      <div style={{ fontSize:11, fontWeight:600, color:TEXT, lineHeight:1.3, marginBottom:2 }}>{job.role}</div>
      <div style={{ fontSize:10, color:TEXT2, marginBottom:2 }}>{job.company} · {job.salary}</div>
      <div style={{ fontSize:10, color:TEXT3, marginBottom:5 }}>{job.loc}</div>
      <div style={{ fontSize:10, color:"#6b7280", fontStyle:"italic", lineHeight:1.4 }}>{job.skipReason}</div>
      {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:9, color:lc.c, textDecoration:"none", display:"block", marginTop:5, fontWeight:600 }}>View →</a>}
    </div>
  );
}

// ── Parking zone ──────────────────────────────────────────────
function ParkingZone({ label, sub, jobs, expanded, onToggle }) {
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:TEXT }}>{label}</div>
          <div style={{ fontSize:10, color:TEXT3 }}>{sub}</div>
        </div>
        <span style={{ marginLeft:"auto", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:10, background:SURF2, color:TEXT2 }}>{jobs.length}</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {jobs.sort((a,b)=>b.salaryMin-a.salaryMin).map(job => {
          const lc = LC[job.ladder]||{c:"#6b7280"};
          const sc = SC[job.softStatus]||SC.Reach;
          const rc = RC[job.reason]||RC["Closed"];
          const isOpen = expanded === job.id;
          return (
            <div key={job.id} style={{ background:SURF2, border:`1px solid ${BORDER}`, borderLeft:`4px solid ${lc.c}`, borderRadius:6 }}>
              <div onClick={() => onToggle(job.id)} style={{ padding:"9px 12px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", marginBottom:3 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:TEXT }}>{job.role}</span>
                    <span style={{ fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:8, background:sc.hbg, color:sc.c }}>~{job.softStatus}</span>
                    <span style={{ fontSize:9, fontWeight:600, padding:"1px 6px", borderRadius:8, background:rc.bg, color:rc.c }}>{job.reason}</span>
                  </div>
                  <div style={{ display:"flex", gap:8, fontSize:10, color:TEXT3, flexWrap:"wrap" }}>
                    <span style={{ fontWeight:600, color:TEXT2 }}>{job.company}</span>
                    <span>{job.loc}</span>
                    <span style={{ color:lc.c }}>{job.salary}</span>
                  </div>
                </div>
                <span style={{ color:TEXT3, fontSize:11, flexShrink:0 }}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen && (
                <div style={{ padding:"0 12px 12px", borderTop:`1px solid ${BORDER}` }}>
                  <p style={{ fontSize:11, color:TEXT2, lineHeight:1.6, margin:"8px 0 8px" }}>{job.note}</p>
                  {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"4px 10px", background:lc.c, color:"#000", borderRadius:4, fontSize:10, fontWeight:700, textDecoration:"none" }}>View →</a>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
