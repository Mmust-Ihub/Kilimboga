export const Select = ({ label, value, onChange, options, required }) => (
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