import React from 'react';
import { X, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const Btn = ({ children, variant="primary", size="md", onClick, type="button", disabled, className="", icon, full }) => {
  const styles = {
    primary: { background:"linear-gradient(135deg,#16A34A,#15803D)", color:"#fff", border:"none", boxShadow:"var(--shadow-btn)" },
    secondary: { background:"transparent", color:"var(--primary)", border:"2px solid var(--primary)", boxShadow:"none" },
    ghost: { background:"transparent", color:"var(--text)", border:"1px solid var(--border)", boxShadow:"none" },
    danger: { background:"linear-gradient(135deg,#DC2626,#B91C1C)", color:"#fff", border:"none", boxShadow:"0 4px 14px rgba(220,38,38,0.3)" },
    accent: { background:"linear-gradient(135deg,#84CC16,#65A30D)", color:"#fff", border:"none", boxShadow:"0 4px 14px rgba(132,204,22,0.3)" },
  };
  const sizes = { sm: { padding:"6px 14px", fontSize:13 }, md: { padding:"10px 20px", fontSize:14 }, lg: { padding:"14px 28px", fontSize:16 } };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="btn-press focus-ring"
      style={{ ...styles[variant], ...sizes[size], borderRadius:10, fontFamily:"'DM Sans',sans-serif",
        fontWeight:600, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.6:1,
        display:"inline-flex", alignItems:"center", gap:6, transition:"all 0.18s ease",
        width:full?"100%":"auto", justifyContent:"center", ...( className ? {} : {} ) }}>
      {icon}{children}
    </button>
  );
};

const Badge = ({ children, variant="default", size="sm" }) => {
  const colors = {
    success: { bg:"rgba(22,163,74,0.12)", color:"#15803D", border:"rgba(22,163,74,0.25)" },
    warning: { bg:"rgba(217,119,6,0.12)", color:"#B45309", border:"rgba(217,119,6,0.25)" },
    danger: { bg:"rgba(220,38,38,0.12)", color:"#B91C1C", border:"rgba(220,38,38,0.25)" },
    info: { bg:"rgba(59,130,246,0.12)", color:"#1D4ED8", border:"rgba(59,130,246,0.25)" },
    default: { bg:"rgba(107,114,128,0.12)", color:"#6B7280", border:"rgba(107,114,128,0.25)" },
    lime: { bg:"rgba(132,204,22,0.12)", color:"#65A30D", border:"rgba(132,204,22,0.25)" },
  };
  const c = colors[variant] || colors.default;
  return (
    <span style={{ background:c.bg, color:c.color, border:`1px solid ${c.border}`,
      borderRadius:99, padding: size==="sm" ? "3px 10px" : "5px 14px",
      fontSize: size==="sm" ? 12 : 13, fontWeight:600, display:"inline-flex", alignItems:"center", gap:4 }}>
      {children}
    </span>
  );
};

const Card = ({ children, style={}, className="", gradient }) => (
  <div className={`card-hover grain ${className}`} style={{
    background: gradient ? `linear-gradient(135deg, #16A34A, #15803D)` : "var(--surface)",
    borderRadius:16, border:"1px solid var(--border)", boxShadow:"var(--shadow-card)",
    padding:24, position:"relative", overflow:"hidden", ...style }}>
    {children}
  </div>
);

const Skeleton = ({ w="100%", h=20, r=8, style={} }) => (
  <div className="skeleton" style={{ width:w, height:h, borderRadius:r, ...style }}/>
);

const Modal = ({ open, onClose, title, children, width=540 }) => {
  if (!open) return null;
  return (
    <div className="modal-bg" onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(5,46,22,0.7)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div className="modal-content" onClick={e=>e.stopPropagation()} style={{
        background:"var(--surface)", borderRadius:20, width:"100%", maxWidth:width,
        maxHeight:"90vh", overflow:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.3)",
        border:"1px solid var(--border)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"20px 24px", borderBottom:"1px solid var(--border)" }}>
          <h3 style={{ margin:0, fontSize:18, fontWeight:700, color:"var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{ background:"transparent", border:"none", cursor:"pointer",
            color:"var(--muted)", padding:4, borderRadius:8 }}><X size={20}/></button>
        </div>
        <div style={{ padding:24 }}>{children}</div>
      </div>
    </div>
  );
};

const Input = ({ label, type="text", value, onChange, placeholder, required, icon, error, hint }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:13, fontWeight:600, color:"var(--text)", opacity:0.85 }}>{label}{required&&<span style={{color:"var(--danger)"}}>*</span>}</label>}
    <div style={{ position:"relative" }}>
      {icon && <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}>{icon}</span>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="focus-ring"
        style={{ width:"100%", padding: icon ? "11px 14px 11px 40px" : "11px 14px",
          background:"var(--bg)", border:`1px solid ${error ? "var(--danger)" : "var(--border)"}`,
          borderRadius:10, fontSize:14, color:"var(--text)", outline:"none", transition:"border 0.2s",
          fontFamily:"'DM Sans',sans-serif" }}/>
    </div>
    {error && <span style={{ fontSize:12, color:"var(--danger)" }}>{error}</span>}
    {hint && <span style={{ fontSize:12, color:"var(--muted)" }}>{hint}</span>}
  </div>
);

const Select = ({ label, value, onChange, options, required }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:13, fontWeight:600, color:"var(--text)", opacity:0.85 }}>{label}{required&&<span style={{color:"var(--danger)"}}>*</span>}</label>}
    <select value={value} onChange={onChange} className="focus-ring"
      style={{ width:"100%", padding:"11px 14px", background:"var(--bg)",
        border:"1px solid var(--border)", borderRadius:10, fontSize:14,
        color:"var(--text)", outline:"none", fontFamily:"'DM Sans',sans-serif" }}>
      {options.map(o => <option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
    </select>
  </div>
);

const EmptyState = ({ icon: Icon, title, subtitle }) => (
  <div style={{ textAlign:"center", padding:"60px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
    <div style={{ width:72, height:72, borderRadius:20, background:"rgba(22,163,74,0.1)", display:"flex", alignItems:"center", justifyContent:"center", border:"2px dashed rgba(22,163,74,0.25)" }}>
      <Icon size={32} style={{ color:"var(--primary)", opacity:0.7 }}/>
    </div>
    <div>
      <p style={{ margin:0, fontWeight:700, fontSize:17, color:"var(--text)" }}>{title}</p>
      <p style={{ margin:"6px 0 0", fontSize:14, color:"var(--muted)", maxWidth:280 }}>{subtitle}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    completed: { v:"success", label:"Completed" }, pending: { v:"warning", label:"Pending" },
    failed: { v:"danger", label:"Failed" }, delivered: { v:"success", label:"Delivered" },
    shipped: { v:"info", label:"Shipped" }, "Approved": { v:"success", label:"Approved" },
    "Pending": { v:"warning", label:"Pending" }, "Rejected": { v:"danger", label:"Rejected" },
    "Active": { v:"success", label:"Active" }, "Inactive": { v:"default", label:"Inactive" },
  };
  const m = map[status] || { v:"default", label:status };
  return <Badge variant={m.v}>{m.label}</Badge>;
};

export { Btn, Badge, Card, Skeleton, Modal, Input, Select, EmptyState, StatusBadge };
