import { createPortal } from "react-dom";
import { X } from "lucide-react";

export const Modal = ({ open, onClose, title, children, width = 540 }) => {
  if (!open) return null;
  return createPortal(
    <div className="modal-bg w-full h-full" onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(5,46,22,0.7)", zIndex: 1000000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: "var(--surface)", borderRadius: 20, width: "100%", maxWidth: width,
        maxHeight: "90vh", overflow: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        border: "1px solid var(--border)"
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid var(--border)"
        }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "var(--muted)", padding: 4, borderRadius: 8
          }}><X size={20} /></button>
        </div>
        <div style={{ padding: 24 }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};