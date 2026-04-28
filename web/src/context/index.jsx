import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const AuthCtx = createContext(null);
const ThemeCtx = createContext(null);
const ToastCtx = createContext(null);
const NavCtx = createContext(null);

const useAuth = () => useContext(AuthCtx);
const useTheme = () => useContext(ThemeCtx);
const useToast = () => useContext(ToastCtx);
const useNav = () => useContext(NavCtx);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type="success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const remove = (id) => setToasts(p => p.filter(t => t.id !== id));
  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:10 }}>
        {toasts.map(t => (
          <div key={t.id} className="toast-enter" style={{
            display:"flex", alignItems:"center", gap:10, padding:"12px 16px",
            borderRadius:12, minWidth:260, maxWidth:360,
            background: t.type==="success" ? "linear-gradient(135deg,#16A34A,#15803D)" : t.type==="error" ? "linear-gradient(135deg,#DC2626,#B91C1C)" : "linear-gradient(135deg,#D97706,#B45309)",
            color:"#fff", boxShadow:"0 8px 32px rgba(0,0,0,0.25)", cursor:"pointer"
          }} onClick={() => remove(t.id)}>
            {t.type==="success" ? <CheckCircle size={16}/> : t.type==="error" ? <XCircle size={16}/> : <AlertCircle size={16}/>}
            <span style={{ fontSize:14, fontWeight:500, flex:1 }}>{t.msg}</span>
            <X size={14} style={{ opacity:0.7 }}/>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

export { AuthCtx, ThemeCtx, ToastCtx, NavCtx, useAuth, useTheme, useToast, useNav, ToastProvider };
