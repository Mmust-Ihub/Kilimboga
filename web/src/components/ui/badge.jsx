export const Badge = ({ children, variant = "default", size = "sm" }) => {
  const colors = {
    success: { bg: "rgba(22,163,74,0.12)", color: "#15803D", border: "rgba(22,163,74,0.25)" },
    warning: { bg: "rgba(217,119,6,0.12)", color: "#B45309", border: "rgba(217,119,6,0.25)" },
    danger: { bg: "rgba(220,38,38,0.12)", color: "#B91C1C", border: "rgba(220,38,38,0.25)" },
    info: { bg: "rgba(59,130,246,0.12)", color: "#ffffffff", border: "rgba(59,130,246,0.25)" },
    default: { bg: "rgba(107,114,128,0.12)", color: "#6B7280", border: "rgba(107,114,128,0.25)" },
    lime: { bg: "rgba(132,204,22,0.12)", color: "#65A30D", border: "rgba(132,204,22,0.25)" },
  };
  const c = colors[variant] || colors.default;
  return (
    <span style={{
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      borderRadius: 99, padding: size === "sm" ? "3px 10px" : "5px 14px",
      fontSize: size === "sm" ? 12 : 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4
    }}>
      {children}
    </span>
  );
};