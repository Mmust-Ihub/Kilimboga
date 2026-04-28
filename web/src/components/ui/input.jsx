export const Input = ({ label, type="text", value, onChange, placeholder, required, icon, error, hint }) => (
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