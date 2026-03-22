import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Card = ({ children, style = {}, className = "", gradient }) => (
  <div className={`card-hover grain ${className}`} style={{
    background: gradient ? `linear-gradient(135deg, #16A34A, #15803D)` : "var(--surface)",
    borderRadius: 16, border: "1px solid var(--border)", boxShadow: "var(--shadow-card)",
    padding: 24, position: "relative", overflow: "hidden", ...style
  }}>
    {children}
  </div>
);

export const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
  <Card style={{ position: "relative" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: `rgba(${color},0.1)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={24} style={{ color: `rgb(${color})` }} />
      </div>
      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 20, background: trend === "up" ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)", color: trend === "up" ? "#16A34A" : "#DC2626", fontSize: 12, fontWeight: 700 }}>
          {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{trendValue}%
        </div>
      )}
    </div>
    <div style={{ marginTop: 16 }}>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, fontWeight: 500 }}>{title}</p>
      <h3 style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>{value}</h3>
    </div>
  </Card>
);