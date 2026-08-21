// ── Color Tokens ─────────────────────────────────────────────
export const COLORS = {
  BG: "#0f0f0f",
  SURF: "#1a1a1a",
  SURF2: "#222222",
  BORDER: "#2a2a2a",
  TEXT: "#f0f0f0",
  TEXT2: "#9ca3af",
  TEXT3: "#4b5563",
};

// ── Career Ladder Colors ─────────────────────────────────────
export const LADDER_COLORS = {
  "Tech/Ed": { c: "#ffdf00" },
  "AI Policy": { c: "#00b100" },
  "Government Affairs": { c: "#c457f3" },
  "Product/Project Mgmt": { c: "#FF4040" },
  "Gaming/Technical": { c: "#40f5ff" },
  "Consulting": { c: "#94a3b8" },
};

// ── Status Column Colors ─────────────────────────────────────
export const STATUS_COLORS = {
  "Qualified": { c: "#03be00", hbg: "#1A1A1A" },
  "Reach": { c: "#fe8300", hbg: "#2A2A2A" },
  "Aspirational": { c: "#03b8ff", hbg: "#1A1A1A" },
  "Over Qualified": { c: "#ff0000", hbg: "#1A1A1A" },
};

// ── Row Header Colors ────────────────────────────────────────
export const ROW_COLORS = {
  "US-Based": { c: "#F0F0F0", hbg: "#1A1A1A" },
  "Colombia / International": { c: "#F0F0F0", hbg: "#1A1A1A" },
};

// ── Kanban Column Colors ────────────────────────────────────
export const KANBAN_COLORS = {
  todo: { c: "#FFFFFF", label: "To-Do" },
  inprogress: { c: "#60a5fa", label: "In Progress" },
  sent: { c: "#4ade80", label: "Sent" },
};

export const KANBAN_NEXT = { todo: "inprogress", inprogress: "sent", sent: null };
export const KANBAN_PREV = { todo: null, inprogress: "todo", sent: "inprogress" };

// ── Parking Modifier Badge Colors ────────────────────────────
export const REASON_COLORS = {
  "Career Coach": { c: "#67e8f9", bg: "#0c4a6e" },
  "Clearance": { c: "#fca5a5", bg: "#450a0a" },
  "Closed": { c: "#6b7280", bg: "#1f2937" },
  "Watch": { c: "#6b7280", bg: "#1f2937" },
};

// ── Spacing Scale ──────────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// ── All Styles ─────────────────────────────────────────────
export const STYLES = {
  // ═══ CONTAINER & LAYOUT ═══
  container: {
    fontFamily: "Aboreto",
    background: COLORS.BG,
    minHeight: "100vh",
    color: COLORS.TEXT,
  },

  // ═══ HEADER ═══
  header: {
    background: "#000",
    padding: `16px ${SPACING.xxl}px`,
    borderBottom: `1px solid ${COLORS.BORDER}`,
  },

  headerTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.3px",
    color: COLORS.TEXT,
  },

  pageSubtitle: {
    fontSize: 11,
    color: COLORS.TEXT3,
    margin: "3px 0 0",
    fontFamily: "Figtree",
  },

  // ═══ TABS ═══
  tabs: {
    background: "#111",
    borderBottom: `1px solid ${COLORS.BORDER}`,
    padding: `0 ${SPACING.xxl}px`,
    display: "flex",
  },

  tab: {
    padding: "10px 18px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  tabLabel: {
    fontSize: 13,
    fontWeight: 400,
  },

  tabLabelActive: {
    fontSize: 13,
    fontWeight: 700,
  },

  // ═══ LEGEND ═══
  legendContainer: {
    background: "#111",
    padding: `7px ${SPACING.xxl}px`,
    borderBottom: `1px solid ${COLORS.BORDER}`,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
  },

  legendLabel: {
    fontSize: 10,
    color: COLORS.TEXT3,
    fontWeight: 600,
    letterSpacing: "0.06em",
  },

  legendItemName: {
    fontSize: 11,
    color: COLORS.TEXT2,
  },

  // ═══ MAIN CONTENT ═══
  mainContent: {
    padding: `${SPACING.xl}px ${SPACING.xxl}px`,
    maxWidth: 1200,
    margin: "0 auto",
  },

  sectionDesc: {
    fontSize: 12,
    color: COLORS.TEXT3,
    margin: "0 0 16px",
  },

  sectionDescKanban: {
    fontSize: 12,
    color: COLORS.TEXT3,
    margin: "0 0 18px",
  },

  // ═══ GRID LAYOUT ═══
  gridContainer: {
    overflowX: "auto",
  },

  gridTable: {
    display: "grid",
    gap: "1px",
    background: COLORS.BORDER,
    border: `1px solid ${COLORS.BORDER}`,
    borderRadius: 10,
    overflow: "hidden",
    minWidth: 600,
  },

  gridCorner: {
    background: COLORS.SURF,
  },

  gridColHeaderCell: {
    background: COLORS.SURF,
    padding: "11px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  gridColHeader: {
    fontSize: 12,
    fontWeight: 700,
  },

  gridColCount: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 10,
    background: "rgba(0,0,0,0.35)",
  },

  gridRowHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 4px",
    minHeight: 80,
  },

  rowHeader: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.06em",
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    transform: "rotate(180deg)",
    whiteSpace: "nowrap",
  },

  gridCell: {
    background: COLORS.SURF,
    padding: 10,
    maxHeight: 380,
    overflowY: "auto",
  },

  gridCellEmpty: {
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.BORDER,
    fontSize: 20,
  },

  gridCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },

  // ═══ CARDS (PIPELINE) ═══
  card: {
    background: COLORS.SURF2,
    border: `1px solid ${COLORS.BORDER}`,
    borderRadius: 6,
    overflow: "hidden",
  },

  cardClickable: {
    padding: "8px 10px",
    cursor: "pointer",
  },

  cardExpanded: {
    padding: "0 10px 10px",
    borderTop: `1px solid ${COLORS.BORDER}`,
  },

  cardRole: {
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.TEXT,
    lineHeight: 1.3,
    marginBottom: 3,
  },

  cardCompany: {
    fontSize: 10,
    color: COLORS.TEXT2,
    marginBottom: 2,
  },

  cardSalary: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 5,
  },

  cardLocation: {
    fontSize: 10,
    color: COLORS.TEXT3,
    marginBottom: 5,
  },

  cardNote: {
    fontSize: 11,
    color: COLORS.TEXT2,
    lineHeight: 1.55,
    margin: "0 0 8px",
  },

  cardToggleIcon: {
    fontSize: 9,
    color: COLORS.TEXT3,
  },

  // ═══ KANBAN ═══
  kanbanGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 14,
  },

  kanbanColumn: {
    borderRadius: "7px 7px 0 0",
    background: COLORS.SURF,
    border: `1px solid ${COLORS.BORDER}`,
    borderBottom: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "9px 13px",
  },

  kanbanColumnContent: {
    minHeight: 200,
    padding: 9,
    border: `1px solid ${COLORS.BORDER}`,
    borderTop: "none",
    borderRadius: "0 0 7px 7px",
    background: COLORS.BG,
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },

  kanbanColumnEmpty: {
    fontSize: 11,
    color: COLORS.TEXT3,
    textAlign: "center",
    padding: "24px 0",
  },

  kanbanRole: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.TEXT,
    marginBottom: 2,
    lineHeight: 1.4,
    fontFamily: "Arapey",
  },

  kanbanCompany: {
    fontSize: 10,
    color: COLORS.TEXT2,
    marginBottom: 2,
  },

  kanbanSalary: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 7,
  },

  kanbanStatus: {
    fontSize: 9,
    fontWeight: 700,
    padding: "1px 5px",
    borderRadius: 8,
  },

  kanbanStatusLabel: {
    fontSize: 9,
    color: COLORS.TEXT3,
  },

  kanbanButton: {
    fontSize: 9,
    fontWeight: 700,
    padding: "3px 0",
    borderRadius: 4,
  },

  // ═══ PARKING LOT ═══
  parkingButton: {
    width: "100%",
    padding: "10px 16px",
    marginTop: 16,
    background: COLORS.SURF,
    border: `1px dashed #444`,
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  parkingToggleButton: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.TEXT2,
  },

  parkingToggleSub: {
    fontSize: 11,
  },

  parkingContainer: {
    marginTop: 12,
    padding: "16px",
    background: COLORS.SURF,
    border: `1px dashed #444`,
    borderRadius: 8,
  },

  parkingDivider: {
    height: 1,
    background: COLORS.BORDER,
    margin: "14px 0",
  },

  parkingZoneContent: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  parkingZoneTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.TEXT,
  },

  parkingZoneSubtitle: {
    fontSize: 10,
    color: COLORS.TEXT3,
  },

  parkingCardRole: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.TEXT,
  },

  parkingCardCompany: {
    fontSize: 10,
    color: COLORS.TEXT2,
    fontWeight: 600,
  },

  parkingCardLocation: {
    fontSize: 10,
    color: COLORS.TEXT3,
  },

  parkingCardSalary: {
    fontSize: 10,
    color: COLORS.TEXT3,
  },

  // ═══ SKIPPED CARDS ═══
  skippedCard: {
    background: COLORS.SURF2,
    border: `1px solid ${COLORS.BORDER}`,
    borderRadius: 6,
    padding: "8px 10px",
  },

  skippedCardSkipReason: {
    fontSize: 10,
    color: "#6b7280",
    fontStyle: "italic",
    lineHeight: 1.4,
    marginBottom: 5,
  },

  // ═══ BUTTONS & LINKS ═══
  primaryButton: {
    fontSize: 10,
    fontWeight: 700,
    padding: "4px 10px",
    color: "#000",
    borderRadius: 4,
    textDecoration: "none",
  },
};
