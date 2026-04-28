export const Btn = ({ children, variant="primary", size="md", onClick, type="button", disabled, className="", icon, full }) => {
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