import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Dashboard from './mainComponents/Dashboard.jsx'
import Products from './subComponents/Products.jsx'
import Orders from './subComponents/Orders.jsx'
import SignUp from './mainComponents/SignUp.jsx'
import Login from './mainComponents/Login.jsx'
import Admin from './mainComponents/Admin.jsx'
import Protected from './mainComponents/Protected.jsx'
import AdminProtected from './mainComponents/AdminProtected.jsx'
import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Users, UserCheck, GraduationCap,
  LogOut, Sun, Moon, Bell, ChevronDown, Plus, Edit2, Trash2, Eye, Search,
  X, Leaf, ArrowUpRight, ArrowDownRight, FileText, Phone, Mail, Calendar,
  CheckCircle, Truck, ShoppingBag, TrendingUp, DollarSign, Activity, Menu,
  Filter, Clock, MapPin, MoreVertical, Upload, Check, ChevronRight, XCircle,
  Sprout, Download, BarChart2, Package2, RefreshCw, Star, Award, Briefcase,
  AlertCircle, Image as ImgIcon, Shield, Zap, Wind, Droplets, ChevronLeft,
  UserCircle, Settings, CreditCard
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─────────────────────────────────────────────
// FONT + CSS INJECTION
// ─────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      :root {
        --bg: #F0FDF4; --surface: #FFFFFF; --primary: #16A34A;
        --secondary: #15803D; --accent: #84CC16; --text: #052E16;
        --muted: #6B7280; --border: #D1FAE5; --warning: #D97706; --danger: #DC2626;
        --shadow-card: 0 4px 20px -2px rgba(22,163,74,0.12);
        --shadow-hover: 0 12px 28px -4px rgba(22,163,74,0.20);
        --shadow-btn: 0 4px 14px 0 rgba(22,163,74,0.35);
      }
      .dark {
        --bg: #052E16; --surface: #14532D; --primary: #4ADE80;
        --secondary: #86EFAC; --accent: #A3E635; --text: #F0FDF4;
        --muted: #86EFAC; --border: #166534;
        --shadow-card: 0 4px 20px -2px rgba(74,222,128,0.10);
        --shadow-hover: 0 12px 28px -4px rgba(74,222,128,0.18);
        --shadow-btn: 0 4px 14px 0 rgba(74,222,128,0.30);
      }
      body, #root { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); margin:0; }
      .font-mono { font-family: 'DM Mono', monospace; }
      .page-enter { animation: pageIn 0.28s ease forwards; }
      @keyframes pageIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      .stat-glow { box-shadow: 0 0 32px rgba(74,222,128,0.22); }
      .blob { filter: blur(80px); opacity: 0.18; border-radius: 999px; position:absolute; pointer-events:none; }
      .grain::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; border-radius:inherit; }
      .sidebar-item { transition: all 0.18s ease; }
      .sidebar-item:hover { background: rgba(22,163,74,0.12); transform:translateX(2px); }
      .sidebar-item.active { background: linear-gradient(135deg, rgba(22,163,74,0.22), rgba(132,204,22,0.12)); }
      .btn-press:active { transform: scale(0.97); }
      .card-hover { transition: box-shadow 0.22s ease, transform 0.22s ease; }
      .card-hover:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
      .pulse-dot { animation: pulse 2s infinite; }
      @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      .count-up { animation: countUp 0.8s ease; }
      @keyframes countUp { from{opacity:0;transform:scale(0.8);} to{opacity:1;transform:scale(1);} }
      .skeleton { background: linear-gradient(90deg, rgba(22,163,74,0.08) 25%, rgba(22,163,74,0.16) 50%, rgba(22,163,74,0.08) 75%); background-size:200% 100%; animation: shimmer 1.5s infinite; }
      .dark .skeleton { background: linear-gradient(90deg, rgba(74,222,128,0.06) 25%, rgba(74,222,128,0.12) 50%, rgba(74,222,128,0.06) 75%); background-size:200% 100%; animation: shimmer 1.5s infinite; }
      @keyframes shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }
      ::-webkit-scrollbar { width:6px; height:6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(22,163,74,0.3); border-radius:3px; }
      input, select, textarea { font-family: 'DM Sans', sans-serif; }
      .toast-enter { animation: toastIn 0.3s ease; }
      @keyframes toastIn { from{opacity:0;transform:translateX(40px);} to{opacity:1;transform:translateX(0);} }
      .modal-bg { animation: modalBgIn 0.2s ease; }
      @keyframes modalBgIn { from{opacity:0;} to{opacity:1;} }
      .modal-content { animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1); }
      @keyframes modalIn { from{opacity:0;transform:scale(0.93) translateY(16px);} to{opacity:1;transform:scale(1) translateY(0);} }
      .focus-ring:focus { outline: 2px solid var(--primary); outline-offset: 2px; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
  return null;
};

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const MOCK_USERS = {
  "admin@farmlink.com": { password: "admin123", role: "admin", name: "Alex Kimani", email: "admin@farmlink.com", initials: "AK" },
  "vendor@farmlink.com": { password: "vendor123", role: "vendor", name: "Victor Ochieng", email: "vendor@farmlink.com", initials: "VO" },
};

const VENDOR_DASH = {
  totalRevenue: 62000, pendingOrders: 4, deliveredOrders: 6,
  currentMonthOrders: 10, previousMonthOrders: 0, percentageChange: "0.00",
  bestSellingProducts: [], monthlyOrders: [], monthlyRevenue: []
};

const ADMIN_DASH = {
  userData: [{ totalUsers:[{count:7}], verifiedUsers:[{count:7}], pendingApprovals:[], approvedUsers:[{count:6}],
    roleDistribution:[{_id:"admin",count:2},{_id:"expert",count:1},{_id:"vendor",count:3},{_id:"farmer",count:1}],
    recentUsers:[{count:2}], userGrowth:[{_id:3,count:6},{_id:6,count:1}] }],
  salesData:[{monthlyRevenue:[{_id:4,totalSales:2}],totalRevenue:[{_id:null,totalSales:2}]}],
  orderData:[{totalOrders:[{count:2}],pendingOrders:[{count:1}],shippedOrders:[],deliveredOrders:[{count:1}],monthlyOrders:[{_id:4,count:2,revenue:2}]}]
};

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const initOrders = [
  { id:"ORD-001", products:[{product:{_id:"p1",title:"Maize Seeds Premium"},quantity:2,price:500}],
    totalAmount:1000, checkoutRequestId:"ws_CO_14042025144937057111768132", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"LBB, Kakamega", farmerPhoneNumber:"0111768132", createdAt:"2025-04-14" },
  { id:"ORD-002", products:[{product:{_id:"p2",title:"DAP Fertilizer 50kg"},quantity:1,price:3200}],
    totalAmount:3200, checkoutRequestId:"ws_CO_15042025091234567890123456", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"delivered", orderAddress:"Milimani, Kisumu", farmerPhoneNumber:"0722345678", createdAt:"2025-04-15" },
  { id:"ORD-003", products:[{product:{_id:"p3",title:"Dursban Pesticide"},quantity:3,price:450}],
    totalAmount:1350, checkoutRequestId:"ws_CO_16042025101234567890654321", paymentStatus:"pending",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"Eldoret Town, Uasin Gishu", farmerPhoneNumber:"0733456789", createdAt:"2025-04-16" },
  { id:"ORD-004", products:[{product:{_id:"p4",title:"Drip Irrigation Kit"},quantity:1,price:8500}],
    totalAmount:8500, checkoutRequestId:"ws_CO_17042025121234567890987654", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"Thika Road, Nairobi", farmerPhoneNumber:"0744567890", createdAt:"2025-04-17" },
  { id:"ORD-005", products:[{product:{_id:"p1",title:"Maize Seeds Premium"},quantity:5,price:500},{product:{_id:"p5",title:"CAN Fertilizer 25kg"},quantity:2,price:1200}],
    totalAmount:4900, checkoutRequestId:"ws_CO_18042025141234567890111222", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"delivered", orderAddress:"Nakuru CBD, Nakuru", farmerPhoneNumber:"0755678901", createdAt:"2025-04-18" },
  { id:"ORD-006", products:[{product:{_id:"p6",title:"Greenhouse Polythene"},quantity:1,price:12000}],
    totalAmount:12000, checkoutRequestId:"ws_CO_19042025161234567890333444", paymentStatus:"failed",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"Kitale Town, Trans Nzoia", farmerPhoneNumber:"0766789012", createdAt:"2025-04-19" },
];

const initProducts = [
  { id:"prod-1", name:"Maize Seeds Premium", description:"High-yield hybrid maize seeds, drought-tolerant variety suitable for all altitudes.", category:"Seeds", quantity:200, price:500, images:[] },
  { id:"prod-2", name:"DAP Fertilizer 50kg", description:"Diammonium Phosphate fertilizer for improved root development and yields.", category:"Fertilizers", quantity:45, price:3200, images:[] },
  { id:"prod-3", name:"Dursban Pesticide 1L", description:"Broad-spectrum insecticide for soil and foliar application on cereals.", category:"Pesticides", quantity:80, price:450, images:[] },
  { id:"prod-4", name:"Drip Irrigation Kit", description:"Complete drip irrigation system for 1/8 acre, includes pipes, emitters, and timer.", category:"Equipment", quantity:12, price:8500, images:[] },
  { id:"prod-5", name:"Fresh Tomatoes (1kg)", description:"Grade A cherry tomatoes from greenhouse, pesticide-free.", category:"Produce", quantity:500, price:120, images:[] },
];

const initVendors = [
  { id:"v1", fname:"Samuel", lname:"Oduya", email:"samuel.oduya@email.com", phone:"0712345678", status:"Approved", documents:["business_permit.pdf","id_copy.jpg"], createdAt:"2025-01-10" },
  { id:"v2", fname:"Grace", lname:"Wanjiku", email:"grace.wanjiku@email.com", phone:"0723456789", status:"Pending", documents:["business_permit.pdf"], createdAt:"2025-02-14" },
  { id:"v3", fname:"Brian", lname:"Otieno", email:"brian.otieno@email.com", phone:"0734567890", status:"Approved", documents:["kra_pin.pdf","id_copy.jpg","business_permit.pdf"], createdAt:"2025-01-28" },
  { id:"v4", fname:"Faith", lname:"Chebet", email:"faith.chebet@email.com", phone:"0745678901", status:"Rejected", documents:["id_copy.jpg"], createdAt:"2025-03-05" },
  { id:"v5", fname:"Moses", lname:"Kamau", email:"moses.kamau@email.com", phone:"0756789012", status:"Pending", documents:["business_permit.pdf","kra_pin.pdf"], createdAt:"2025-03-20" },
];

const initFarmers = [
  { id:"f1", fname:"John", lname:"Mwangi", email:"john.mwangi@email.com", phone:"0712000001", region:"Central Kenya", joinDate:"2024-11-15", status:"Active" },
  { id:"f2", fname:"Mary", lname:"Auma", email:"mary.auma@email.com", phone:"0723000002", region:"Nyanza", joinDate:"2024-12-01", status:"Active" },
  { id:"f3", fname:"Peter", lname:"Rotich", email:"peter.rotich@email.com", phone:"0734000003", region:"Rift Valley", joinDate:"2025-01-08", status:"Inactive" },
  { id:"f4", fname:"Jane", lname:"Njoroge", email:"jane.njoroge@email.com", phone:"0745000004", region:"Central Kenya", joinDate:"2025-02-20", status:"Active" },
  { id:"f5", fname:"David", lname:"Simiyu", email:"david.simiyu@email.com", phone:"0756000005", region:"Western", joinDate:"2025-03-10", status:"Active" },
];

const SPECIALIZATIONS = ["Crop Science","Soil Science","Pest Management","Irrigation","General Agronomy"];
const initExperts = [
  { id:"e1", fname:"Dr. Amina", lname:"Hassan", email:"amina.hassan@farmlink.com", specialization:"Soil Science", experience:12, status:"Active" },
  { id:"e2", fname:"Prof. James", lname:"Mwenda", email:"james.mwenda@farmlink.com", specialization:"Crop Science", experience:18, status:"Active" },
  { id:"e3", fname:"Eng. Rose", lname:"Kipkoech", email:"rose.kipkoech@farmlink.com", specialization:"Irrigation", experience:8, status:"Active" },
  { id:"e4", fname:"Dr. Felix", lname:"Omondi", email:"felix.omondi@farmlink.com", specialization:"Pest Management", experience:10, status:"Inactive" },
];

// ─────────────────────────────────────────────
// CONTEXTS
// ─────────────────────────────────────────────
const AuthCtx = createContext(null);
const ThemeCtx = createContext(null);
const ToastCtx = createContext(null);
const NavCtx = createContext(null);

const useAuth = () => useContext(AuthCtx);
const useTheme = () => useContext(ThemeCtx);
const useToast = () => useContext(ToastCtx);
const useNav = () => useContext(NavCtx);

// ─────────────────────────────────────────────
// TOAST PROVIDER
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────
const VENDOR_NAV = [
  { label:"Dashboard", icon:LayoutDashboard, route:"/vendor/dashboard" },
  { label:"Products", icon:Package, route:"/vendor/products" },
  { label:"Orders", icon:ShoppingCart, route:"/vendor/orders" },
];
const ADMIN_NAV = [
  { label:"Dashboard", icon:LayoutDashboard, route:"/admin/dashboard" },
  { label:"Vendors", icon:Briefcase, route:"/admin/vendors" },
  { label:"Farmers", icon:Sprout, route:"/admin/farmers" },
  { label:"Experts", icon:GraduationCap, route:"/admin/experts" },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const { route } = useNav();
  const { navigate } = useNav();
  const nav = user?.role === "admin" ? ADMIN_NAV : VENDOR_NAV;
  const w = collapsed ? 68 : 260;

  return (
    <aside style={{ width:w, minHeight:"100vh", background:"var(--surface)", borderRight:"1px solid var(--border)",
      display:"flex", flexDirection:"column", transition:"width 0.28s cubic-bezier(0.4,0,0.2,1)",
      position:"relative", overflow:"hidden", flexShrink:0, zIndex:50 }}>
      {/* Decorative blobs */}
      <div className="blob" style={{ width:120, height:120, background:"#16A34A", top:-20, left:-20 }}/>
      <div className="blob" style={{ width:80, height:80, background:"#84CC16", top:60, right:-30 }}/>

      {/* Header */}
      <div style={{ padding: collapsed ? "20px 16px" : "24px 20px", borderBottom:"1px solid var(--border)", position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#16A34A,#84CC16)",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"var(--shadow-btn)" }}>
            <Leaf size={18} color="#fff"/>
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontWeight:800, fontSize:17, color:"var(--text)", letterSpacing:"-0.03em" }}>FarmLink</div>
              <div style={{ fontSize:10, color:"var(--muted)", fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase" }}>
                {user?.role === "admin" ? "Admin Portal" : "Vendor Portal"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"16px 10px", display:"flex", flexDirection:"column", gap:4 }}>
        {!collapsed && (
          <div style={{ fontSize:11, fontWeight:700, color:"var(--muted)", letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px 10px" }}>
            Navigation
          </div>
        )}
        {nav.map(item => {
          const active = route === item.route;
          return (
            <button key={item.route} onClick={() => navigate(item.route)}
              className={`sidebar-item ${active?"active":""}`}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding: collapsed ? "12px 16px" : "11px 14px",
                borderRadius:12, border:"none", cursor:"pointer", background:"transparent",
                color: active ? "var(--primary)" : "var(--text)", fontFamily:"'DM Sans',sans-serif",
                fontWeight: active ? 700 : 500, fontSize:14, textAlign:"left",
                justifyContent: collapsed ? "center" : "flex-start" }}>
              <item.icon size={18} style={{ flexShrink:0, color: active ? "var(--primary)" : "var(--muted)" }}/>
              {!collapsed && item.label}
              {!collapsed && active && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:999, background:"var(--primary)" }}/>}
            </button>
          );
        })}
      </nav>

      {/* Role chip */}
      {!collapsed && (
        <div style={{ margin:"0 10px 8px", padding:"10px 14px", background:"rgba(22,163,74,0.08)",
          borderRadius:10, border:"1px solid var(--border)" }}>
          <div style={{ fontSize:11, color:"var(--muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Role</div>
          <Badge variant={user?.role==="admin"?"info":"lime"}>{user?.role === "admin" ? "Administrator" : "Vendor"}</Badge>
        </div>
      )}

      {/* User card */}
      <div style={{ padding:"12px 10px", borderTop:"1px solid var(--border)" }}>
        {!collapsed ? (
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
            borderRadius:12, background:"rgba(22,163,74,0.06)" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#16A34A,#84CC16)",
              display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13, flexShrink:0 }}>
              {user?.initials}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--text)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.name}</div>
              <div style={{ fontSize:11, color:"var(--muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.email}</div>
            </div>
            <button onClick={logout} style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--muted)", padding:4 }}>
              <LogOut size={16}/>
            </button>
          </div>
        ) : (
          <button onClick={logout} style={{ width:"100%", display:"flex", justifyContent:"center", padding:12,
            background:"transparent", border:"none", cursor:"pointer", color:"var(--muted)" }}>
            <LogOut size={18}/>
          </button>
        )}
      </div>
    </aside>
  );
};

const Topbar = ({ collapsed, setCollapsed, pageTitle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header style={{ height:64, background:"var(--surface)", borderBottom:"1px solid var(--border)",
      display:"flex", alignItems:"center", padding:"0 24px", gap:16, position:"sticky", top:0, zIndex:40 }}>
      <button onClick={() => setCollapsed(c=>!c)} className="focus-ring"
        style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:10,
          padding:8, cursor:"pointer", color:"var(--text)", display:"flex" }}>
        {collapsed ? <ChevronRight size={18}/> : <Menu size={18}/>}
      </button>

      <div style={{ flex:1 }}>
        <h1 style={{ margin:0, fontSize:18, fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em" }}>{pageTitle}</h1>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} className="focus-ring"
          style={{ position:"relative", width:56, height:28, borderRadius:99,
            background: theme==="dark" ? "linear-gradient(135deg,#16A34A,#4ADE80)" : "rgba(22,163,74,0.12)",
            border:"1px solid var(--border)", cursor:"pointer", transition:"all 0.3s", padding:0 }}>
          <div style={{ position:"absolute", top:3, left: theme==="dark" ? 29 : 3, width:20, height:20, borderRadius:999,
            background: theme==="dark" ? "#052E16" : "#16A34A", transition:"left 0.3s",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {theme==="dark" ? <Moon size={11} color="#4ADE80"/> : <Sun size={11} color="#fff"/>}
          </div>
        </button>

        {/* Bell */}
        <button className="focus-ring" style={{ background:"transparent", border:"1px solid var(--border)",
          borderRadius:10, padding:8, cursor:"pointer", color:"var(--muted)", position:"relative" }}>
          <Bell size={18}/>
          <div style={{ position:"absolute", top:6, right:6, width:7, height:7, borderRadius:99,
            background:"var(--accent)", border:"2px solid var(--surface)" }} className="pulse-dot"/>
        </button>

        {/* User */}
        <div style={{ position:"relative" }}>
          <button onClick={()=>setUserOpen(o=>!o)} className="focus-ring"
            style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(22,163,74,0.08)",
              border:"1px solid var(--border)", borderRadius:10, padding:"6px 12px", cursor:"pointer" }}>
            <div style={{ width:26, height:26, borderRadius:8, background:"linear-gradient(135deg,#16A34A,#84CC16)",
              display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:11 }}>
              {user?.initials}
            </div>
            <span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{user?.name?.split(" ")[0]}</span>
            <ChevronDown size={14} style={{ color:"var(--muted)" }}/>
          </button>
          {userOpen && (
            <div onClick={()=>setUserOpen(false)} style={{ position:"fixed", inset:0, zIndex:100 }}>
              <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", top:48, right:0, background:"var(--surface)",
                border:"1px solid var(--border)", borderRadius:12, width:180, boxShadow:"0 12px 40px rgba(0,0,0,0.15)", padding:8 }}>
                <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 12px",
                  background:"transparent", border:"none", cursor:"pointer", color:"var(--danger)",
                  borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>
                  <LogOut size={15}/> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const PAGE_TITLES = {
  "/vendor/dashboard": "Dashboard", "/vendor/products": "My Products", "/vendor/orders": "Orders",
  "/admin/dashboard": "Dashboard", "/admin/vendors": "Vendors", "/admin/farmers": "Farmers", "/admin/experts": "Experts",
};

const AppShell = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { route } = useNav();
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} pageTitle={PAGE_TITLES[route]||"FarmLink"}/>
        <main style={{ flex:1, padding:28, overflow:"auto" }}>
          <div className="page-enter">{children}</div>
        </main>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────
const LoginPage = () => {
  const { login } = useAuth();
  const { navigate } = useNav();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    setErr(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = MOCK_USERS[email];
    if (user && user.password === pass) {
      login(user);
      toast("Welcome back, " + user.name.split(" ")[0] + "! 🌿", "success");
      navigate(user.role === "admin" ? "/admin/dashboard" : "/vendor/dashboard");
    } else {
      setErr("Invalid email or password.");
      toast("Login failed. Please check your credentials.", "error");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(160deg, #052E16 0%, #14532D 40%, #166534 70%, #052E16 100%)" }}>
      {/* Atmospheric blobs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:999, left:-120, top:-100,
        background:"radial-gradient(circle,#16A34A,transparent)", opacity:0.2, filter:"blur(80px)" }}/>
      <div style={{ position:"absolute", width:400, height:400, borderRadius:999, right:-80, bottom:-80,
        background:"radial-gradient(circle,#84CC16,transparent)", opacity:0.15, filter:"blur(80px)" }}/>
      <div style={{ position:"absolute", width:200, height:200, borderRadius:999, left:"40%", top:"20%",
        background:"radial-gradient(circle,#4ADE80,transparent)", opacity:0.12, filter:"blur(60px)" }}/>

      {/* Floating leaves */}
      {[...Array(6)].map((_,i) => (
        <div key={i} style={{ position:"absolute", color:"rgba(74,222,128,0.15)", fontSize:24,
          top:`${15+i*13}%`, left:`${5+i*16}%`, transform:`rotate(${i*47}deg)`, userSelect:"none" }}>🌿</div>
      ))}

      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:420, padding:20 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,#16A34A,#84CC16)",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px",
            boxShadow:"0 0 40px rgba(74,222,128,0.4)" }}>
            <Leaf size={28} color="#fff"/>
          </div>
          <h1 style={{ margin:0, color:"#F0FDF4", fontWeight:800, fontSize:28, letterSpacing:"-0.04em" }}>FarmLink</h1>
          <p style={{ margin:"6px 0 0", color:"rgba(134,239,172,0.8)", fontSize:14 }}>Connecting the agricultural supply chain</p>
        </div>

        {/* Card */}
        <div style={{ background:"rgba(255,255,255,0.07)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
          borderRadius:24, border:"1px solid rgba(74,222,128,0.2)", padding:36,
          boxShadow:"0 32px 80px rgba(0,0,0,0.4)" }}>
          <h2 style={{ margin:"0 0 24px", color:"#F0FDF4", fontWeight:700, fontSize:20 }}>Sign In</h2>

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"rgba(240,253,244,0.8)", marginBottom:6 }}>Email Address</label>
              <div style={{ position:"relative" }}>
                <Mail size={16} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"rgba(134,239,172,0.6)" }}/>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com"
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  style={{ width:"100%", padding:"12px 14px 12px 40px", background:"rgba(255,255,255,0.08)",
                    border:"1px solid rgba(74,222,128,0.2)", borderRadius:12, fontSize:14,
                    color:"#F0FDF4", outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}
                  className="focus-ring"/>
              </div>
            </div>

            <div>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"rgba(240,253,244,0.8)", marginBottom:6 }}>Password</label>
              <div style={{ position:"relative" }}>
                <input value={pass} onChange={e=>setPass(e.target.value)} type={showPass?"text":"password"} placeholder="••••••••"
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  style={{ width:"100%", padding:"12px 40px 12px 14px", background:"rgba(255,255,255,0.08)",
                    border:"1px solid rgba(74,222,128,0.2)", borderRadius:12, fontSize:14,
                    color:"#F0FDF4", outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}
                  className="focus-ring"/>
                <button onClick={()=>setShowPass(s=>!s)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                  background:"transparent", border:"none", cursor:"pointer", color:"rgba(134,239,172,0.6)", padding:0 }}>
                  {showPass ? <Eye size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {err && <div style={{ background:"rgba(220,38,38,0.15)", border:"1px solid rgba(220,38,38,0.3)",
              borderRadius:10, padding:"10px 14px", fontSize:13, color:"#FCA5A5" }}>{err}</div>}

            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:16, height:16, borderRadius:4, border:"1px solid rgba(74,222,128,0.4)",
                background:"rgba(22,163,74,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Check size={10} color="#4ADE80"/>
              </div>
              <span style={{ fontSize:13, color:"rgba(240,253,244,0.6)" }}>Remember me</span>
            </div>

            <button onClick={handleLogin} disabled={loading} className="btn-press"
              style={{ width:"100%", padding:"13px", background: loading ? "rgba(22,163,74,0.5)" : "linear-gradient(135deg,#16A34A,#84CC16)",
                border:"none", borderRadius:12, color:"#fff", fontWeight:700, fontSize:15,
                cursor:loading?"not-allowed":"pointer", fontFamily:"'DM Sans',sans-serif",
                boxShadow:"0 4px 20px rgba(22,163,74,0.4)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {loading ? <><RefreshCw size={16} style={{ animation:"spin 1s linear infinite" }}/> Signing In...</> : "Sign In →"}
            </button>

            <p style={{ textAlign:"center", margin:0, fontSize:13, color:"rgba(240,253,244,0.5)" }}>
              New vendor?{" "}
              <button onClick={()=>navigate("/register")} style={{ background:"transparent", border:"none", color:"#4ADE80", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>
                Register here
              </button>
            </p>
          </div>
        </div>

        {/* Hint */}
        <div style={{ marginTop:20, textAlign:"center" }}>
          <p style={{ fontSize:12, color:"rgba(134,239,172,0.4)", margin:0 }}>
            Demo: admin@farmlink.com / admin123 · vendor@farmlink.com / vendor123
          </p>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}`}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// REGISTER PAGE
// ─────────────────────────────────────────────
const RegisterPage = () => {
  const { navigate } = useNav();
  const toast = useToast();
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"", password:"", confirm:"" });
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();
  const f = (k) => (e) => setForm(p=>({...p,[k]:e.target.value}));
  const strength = form.password.length < 4 ? 0 : form.password.length < 7 ? 1 : form.password.length < 10 ? 2 : 3;
  const sColors = ["#DC2626","#D97706","#16A34A","#15803D"];
  const sLabels = ["Too short","Weak","Good","Strong"];

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).filter(f => ["application/pdf","image/jpeg","image/png"].includes(f.type));
    setFiles(p => [...p, ...arr]);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };

  const handleSubmit = () => {
    if (!form.fname || !form.email || !form.password) return toast("Please fill all required fields", "error");
    if (form.password !== form.confirm) return toast("Passwords do not match", "error");
    toast("Registration submitted! Awaiting approval.", "success");
    navigate("/login");
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"stretch" }}>
      {/* Left panel */}
      <div style={{ width:340, background:"linear-gradient(160deg,#052E16,#166534)", display:"flex",
        flexDirection:"column", justifyContent:"center", padding:"48px 36px", position:"relative", overflow:"hidden",
        flexShrink:0 }} className="hidden md:flex">
        <div className="blob" style={{ width:200, height:200, background:"#16A34A", top:-40, right:-40 }}/>
        <div className="blob" style={{ width:160, height:160, background:"#84CC16", bottom:40, left:-40 }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ width:52, height:52, borderRadius:16, background:"linear-gradient(135deg,#16A34A,#84CC16)",
            display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
            <Leaf size={22} color="#fff"/>
          </div>
          <h2 style={{ color:"#F0FDF4", fontWeight:800, fontSize:26, letterSpacing:"-0.04em", margin:"0 0 12px" }}>Join FarmLink</h2>
          <p style={{ color:"rgba(134,239,172,0.8)", fontSize:14, lineHeight:1.7, margin:"0 0 32px" }}>
            Connect with farmers across Kenya. List your agricultural products and grow your business.
          </p>
          {[["Reach 5,000+ farmers","Sprout"],["Instant M-Pesa payments","DollarSign"],["Expert support 24/7","Award"]].map(([t,_],i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:"rgba(74,222,128,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <CheckCircle size={14} color="#4ADE80"/>
              </div>
              <span style={{ color:"rgba(240,253,244,0.8)", fontSize:14 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px", overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:520 }}>
          <div style={{ marginBottom:32 }}>
            <h1 style={{ margin:0, fontWeight:800, fontSize:26, letterSpacing:"-0.04em" }}>Create Vendor Account</h1>
            <p style={{ margin:"8px 0 0", color:"var(--muted)", fontSize:14 }}>Fill in your details to get started</p>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <Input label="First Name" value={form.fname} onChange={f("fname")} placeholder="John" required/>
              <Input label="Last Name" value={form.lname} onChange={f("lname")} placeholder="Doe" required/>
            </div>
            <Input label="Email Address" type="email" value={form.email} onChange={f("email")} placeholder="you@example.com" required icon={<Mail size={14}/>}/>
            <Input label="Phone Number" value={form.phone} onChange={f("phone")} placeholder="0712 345 678" icon={<Phone size={14}/>}/>
            <Input label="Password" type="password" value={form.password} onChange={f("password")} placeholder="••••••••" required/>
            {form.password && (
              <div>
                <div style={{ display:"flex", gap:4, marginBottom:6 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ flex:1, height:4, borderRadius:99,
                      background: strength > i ? sColors[strength] : "var(--border)", transition:"background 0.3s" }}/>
                  ))}
                </div>
                <span style={{ fontSize:12, color:sColors[strength], fontWeight:600 }}>{sLabels[strength]}</span>
              </div>
            )}
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={f("confirm")} placeholder="••••••••" required
              error={form.confirm && form.password !== form.confirm ? "Passwords do not match" : ""}/>

            {/* File upload */}
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:"var(--text)", opacity:0.85, display:"block", marginBottom:6 }}>
                Verification Documents <span style={{ color:"var(--muted)", fontWeight:400 }}>(PDF, JPG, PNG)</span>
              </label>
              <div onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop}
                onClick={()=>fileRef.current.click()}
                style={{ border:`2px dashed ${dragging?"var(--primary)":"var(--border)"}`, borderRadius:14,
                  padding:"28px 20px", textAlign:"center", cursor:"pointer", transition:"all 0.2s",
                  background: dragging ? "rgba(22,163,74,0.06)" : "var(--bg)" }}>
                <Upload size={24} style={{ color:"var(--primary)", margin:"0 auto 8px", display:"block" }}/>
                <p style={{ margin:0, fontSize:14, color:"var(--muted)" }}>Drop files here or <span style={{ color:"var(--primary)", fontWeight:600 }}>browse</span></p>
                <p style={{ margin:"4px 0 0", fontSize:12, color:"var(--muted)" }}>Business permit, ID copy, KRA PIN</p>
              </div>
              <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }}
                onChange={e=>addFiles(e.target.files)}/>
              {files.length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
                  {files.map((file,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px 5px 8px",
                      background:"rgba(22,163,74,0.08)", border:"1px solid var(--border)", borderRadius:8, fontSize:12 }}>
                      <FileText size={12} style={{ color:"var(--primary)" }}/>
                      <span style={{ maxWidth:100, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{file.name}</span>
                      <button onClick={e=>{e.stopPropagation();setFiles(p=>p.filter((_,j)=>j!==i));}}
                        style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--muted)", padding:0, lineHeight:1 }}>
                        <X size={12}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Btn onClick={handleSubmit} size="lg" full>Register as Vendor</Btn>
            <p style={{ textAlign:"center", margin:0, fontSize:13, color:"var(--muted)" }}>
              Already have an account?{" "}
              <button onClick={()=>navigate("/login")} style={{ background:"transparent", border:"none", color:"var(--primary)", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// VENDOR DASHBOARD
// ─────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, sub, trend, loading, gradient, mono }) => (
  <Card style={{ minHeight:120 }} gradient={gradient}>
    {loading ? (
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <Skeleton w={60} h={12}/><Skeleton w={80} h={28}/><Skeleton w={100} h={12}/>
      </div>
    ) : (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:13, fontWeight:600, color: gradient ? "rgba(255,255,255,0.75)" : "var(--muted)", letterSpacing:"0.01em" }}>{label}</span>
          <div style={{ width:36, height:36, borderRadius:10, background: gradient ? "rgba(255,255,255,0.15)" : "rgba(22,163,74,0.1)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon size={16} style={{ color: gradient ? "#fff" : "var(--primary)" }}/>
          </div>
        </div>
        <div className={`count-up ${mono?"font-mono":""}`}
          style={{ fontSize:28, fontWeight:800, color: gradient ? "#fff" : "var(--text)", letterSpacing:"-0.03em", lineHeight:1 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize:12, color: gradient ? "rgba(255,255,255,0.65)" : "var(--muted)", display:"flex", alignItems:"center", gap:4 }}>
          {trend && (trend > 0 ? <ArrowUpRight size={12} style={{ color:"#4ADE80" }}/> : <ArrowDownRight size={12} style={{ color:"#F87171" }}/>)}
          {sub}
        </div>}
      </div>
    )}
  </Card>
);

const VendorDashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  const d = VENDOR_DASH;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      {/* Hero stat + grid */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:20 }}>
        <StatCard label="Total Revenue (KES)" value={loading?"":"62,000"} icon={DollarSign}
          sub="All-time earnings" loading={loading} gradient mono/>
        <StatCard label="Pending Orders" value={loading?"":d.pendingOrders} icon={Clock}
          sub="Awaiting fulfillment" loading={loading}/>
        <StatCard label="Delivered Orders" value={loading?"":d.deliveredOrders} icon={CheckCircle}
          sub="Successfully completed" loading={loading}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <StatCard label="This Month's Orders" value={loading?"":d.currentMonthOrders} icon={Activity}
          sub={`${d.percentageChange}% vs last month`} loading={loading}/>
        <StatCard label="Previous Month" value={loading?"":d.previousMonthOrders} icon={BarChart2}
          sub="Comparative baseline" loading={loading}/>
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:20 }}>
        <Card>
          <h3 style={{ margin:"0 0 20px", fontSize:16, fontWeight:700 }}>Monthly Revenue</h3>
          {d.monthlyRevenue.length === 0 ? (
            <EmptyState icon={TrendingUp} title="No revenue data yet" subtitle="Revenue trends will appear once you start receiving orders this month"/>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={d.monthlyRevenue}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="_id" tick={{ fontSize:12 }}/>
                <YAxis tick={{ fontSize:12 }}/>
                <Tooltip/>
                <Area type="monotone" dataKey="totalSales" stroke="#16A34A" fill="url(#revGrad)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h3 style={{ margin:"0 0 20px", fontSize:16, fontWeight:700 }}>Best Selling Products</h3>
          {d.bestSellingProducts.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="No sales data yet" subtitle="Your top-performing products will be ranked here as orders come in"/>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={d.bestSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="name" tick={{ fontSize:11 }}/>
                <YAxis tick={{ fontSize:11 }}/>
                <Tooltip/>
                <Bar dataKey="sales" fill="#16A34A" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// VENDOR PRODUCTS
// ─────────────────────────────────────────────
const CATEGORIES = ["Seeds","Fertilizers","Pesticides","Equipment","Produce","Other"];
const CAT_COLORS = { Seeds:"lime", Fertilizers:"success", Pesticides:"warning", Equipment:"info", Produce:"success", Other:"default" };

const VendorProducts = () => {
  const [products, setProducts] = useState(initProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState(null); // null | { mode:'add'|'edit', data }
  const [form, setForm] = useState({ name:"", description:"", category:"Seeds", quantity:0, price:0 });
  const [loading, setLoading] = useState(true);
  const [del, setDel] = useState(null);
  const toast = useToast();
  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const openAdd = () => { setForm({ name:"", description:"", category:"Seeds", quantity:"", price:"" }); setModal({mode:"add"}); };
  const openEdit = (p) => { setForm({...p}); setModal({mode:"edit",data:p}); };

  const save = () => {
    if (!form.name || !form.price) return toast("Name and price are required","error");
    if (modal.mode === "add") {
      setProducts(p=>[...p,{...form,id:"prod-"+Date.now(),images:[],quantity:+form.quantity,price:+form.price}]);
      toast("Product added successfully","success");
    } else {
      setProducts(p=>p.map(x=>x.id===modal.data.id?{...x,...form,quantity:+form.quantity,price:+form.price}:x));
      toast("Product updated","success");
    }
    setModal(null);
  };

  const doDelete = (id) => {
    setProducts(p=>p.filter(x=>x.id!==id));
    toast("Product deleted","success");
    setDel(null);
  };

  const filtered = products.filter(p =>
    (catFilter==="All"||p.category===catFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Toolbar */}
      <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."
            style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10,
              background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontSize:14, color:"var(--text)",
              outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
        </div>
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)}
          style={{ padding:"10px 14px", background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:10, fontSize:14, color:"var(--text)", outline:"none", fontFamily:"'DM Sans',sans-serif" }}>
          {["All",...CATEGORIES].map(c=><option key={c}>{c}</option>)}
        </select>
        <Btn onClick={openAdd} icon={<Plus size={15}/>}>Add Product</Btn>
      </div>

      {loading ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
          {[...Array(4)].map((_,i)=><div key={i} style={{ borderRadius:16, overflow:"hidden", background:"var(--surface)", border:"1px solid var(--border)", padding:20 }}><Skeleton h={120} style={{ marginBottom:12 }}/><Skeleton w="70%" h={16} style={{ marginBottom:8 }}/><Skeleton w="40%" h={12}/></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <Card><EmptyState icon={Package} title="No products found" subtitle="Add your first product or adjust your search filters"/></Card>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:16 }}>
          {filtered.map(p => (
            <Card key={p.id} style={{ padding:0, overflow:"hidden" }}>
              {/* Image placeholder */}
              <div style={{ height:120, background:"linear-gradient(135deg,rgba(22,163,74,0.08),rgba(132,204,22,0.08))",
                display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"1px solid var(--border)" }}>
                <ImgIcon size={36} style={{ color:"rgba(22,163,74,0.3)" }}/>
              </div>
              <div style={{ padding:"16px 18px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{p.name}</div>
                    <Badge variant={CAT_COLORS[p.category]||"default"}>{p.category}</Badge>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>openEdit(p)} style={{ background:"rgba(22,163,74,0.1)", border:"none", borderRadius:8,
                      padding:7, cursor:"pointer", color:"var(--primary)" }}><Edit2 size={14}/></button>
                    <button onClick={()=>setDel(p.id)} style={{ background:"rgba(220,38,38,0.1)", border:"none", borderRadius:8,
                      padding:7, cursor:"pointer", color:"var(--danger)" }}><Trash2 size={14}/></button>
                  </div>
                </div>
                <p style={{ margin:"8px 0 12px", fontSize:13, color:"var(--muted)", lineHeight:1.5,
                  display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.description}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:500, fontSize:16, color:"var(--primary)" }}>
                    KES {p.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize:12, color:"var(--muted)" }}>Stock: <strong>{p.quantity}</strong></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.mode==="add"?"Add New Product":"Edit Product"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="Product Name" value={form.name} onChange={f("name")} placeholder="e.g. Maize Seeds Premium" required/>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:"var(--text)", opacity:0.85, display:"block", marginBottom:6 }}>Description</label>
            <textarea value={form.description} onChange={f("description")} rows={3} placeholder="Describe your product..."
              style={{ width:"100%", padding:"11px 14px", background:"var(--bg)", border:"1px solid var(--border)",
                borderRadius:10, fontSize:14, color:"var(--text)", outline:"none", resize:"vertical",
                fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
          </div>
          <Select label="Category" value={form.category} onChange={f("category")} options={CATEGORIES.map(c=>({value:c,label:c}))} required/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Input label="Quantity" type="number" value={form.quantity} onChange={f("quantity")} placeholder="0" required/>
            <Input label="Price (KES)" type="number" value={form.price} onChange={f("price")} placeholder="0" required/>
          </div>
          {/* Multi-image upload placeholder */}
          <div style={{ border:"2px dashed var(--border)", borderRadius:12, padding:"20px", textAlign:"center",
            cursor:"pointer", background:"var(--bg)" }}>
            <Upload size={20} style={{ color:"var(--primary)", margin:"0 auto 6px", display:"block" }}/>
            <p style={{ margin:0, fontSize:13, color:"var(--muted)" }}>Upload product images (optional)</p>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal?.mode==="add"?"Add Product":"Save Changes"}</Btn>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!del} onClose={()=>setDel(null)} title="Delete Product" width={400}>
        <p style={{ color:"var(--muted)", marginTop:0 }}>Are you sure you want to delete this product? This action cannot be undone.</p>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <Btn variant="ghost" onClick={()=>setDel(null)}>Cancel</Btn>
          <Btn variant="danger" onClick={()=>doDelete(del)}>Delete Product</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ─────────────────────────────────────────────
// VENDOR ORDERS
// ─────────────────────────────────────────────
const VendorOrders = () => {
  const [orders] = useState(initOrders);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(()=>setLoading(false),600); },[]);

  const filtered = orders.filter(o =>
    (filter==="all" || o.deliveryStatus===filter || o.paymentStatus===filter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.orderAddress.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by ID or address..."
            style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10,
              background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontSize:14, color:"var(--text)",
              outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
        </div>
        {["all","pending","delivered","completed"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:"10px 16px", borderRadius:10, border:`1px solid ${filter===s?"var(--primary)":"var(--border)"}`,
              background: filter===s ? "rgba(22,163,74,0.1)" : "var(--surface)", color: filter===s?"var(--primary)":"var(--muted)",
              cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif", textTransform:"capitalize" }}>
            {s}
          </button>
        ))}
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? (
          <div style={{ padding:24, display:"flex", flexDirection:"column", gap:12 }}>
            {[...Array(4)].map((_,i)=><Skeleton key={i} h={52} r={10}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={ShoppingCart} title="No orders found" subtitle="Orders matching your filter will appear here"/>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid var(--border)", background:"rgba(22,163,74,0.04)" }}>
                  {["Order ID","Products","Amount","Payment","Delivery","Address","Action"].map(h=>(
                    <th key={h} style={{ padding:"14px 16px", textAlign:"left", fontSize:12, fontWeight:700,
                      color:"var(--muted)", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o,i) => (
                  <tr key={o.id} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"rgba(22,163,74,0.02)" }}>
                    <td style={{ padding:"14px 16px", fontSize:13, fontFamily:"'DM Mono',monospace", fontWeight:500 }}>{o.id}</td>
                    <td style={{ padding:"14px 16px", fontSize:13 }}>{o.products.map(p=>p.product.title).join(", ").slice(0,30)}...</td>
                    <td style={{ padding:"14px 16px", fontSize:13, fontFamily:"'DM Mono',monospace", color:"var(--primary)", fontWeight:600 }}>
                      KES {o.totalAmount.toLocaleString()}
                    </td>
                    <td style={{ padding:"14px 16px" }}><StatusBadge status={o.paymentStatus}/></td>
                    <td style={{ padding:"14px 16px" }}><StatusBadge status={o.deliveryStatus}/></td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"var(--muted)" }}>{o.orderAddress}</td>
                    <td style={{ padding:"14px 16px" }}>
                      <button onClick={()=>setDetail(o)} style={{ background:"rgba(22,163,74,0.1)", border:"none",
                        borderRadius:8, padding:"6px 12px", cursor:"pointer", color:"var(--primary)", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail modal */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title={`Order ${detail?.id}`} width={580}>
        {detail && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div style={{ padding:"12px 14px", background:"var(--bg)", borderRadius:10, border:"1px solid var(--border)" }}>
                <div style={{ fontSize:11, color:"var(--muted)", fontWeight:600, marginBottom:4 }}>PAYMENT STATUS</div>
                <StatusBadge status={detail.paymentStatus}/>
              </div>
              <div style={{ padding:"12px 14px", background:"var(--bg)", borderRadius:10, border:"1px solid var(--border)" }}>
                <div style={{ fontSize:11, color:"var(--muted)", fontWeight:600, marginBottom:4 }}>DELIVERY STATUS</div>
                <StatusBadge status={detail.deliveryStatus}/>
              </div>
            </div>

            <div style={{ background:"var(--bg)", borderRadius:10, border:"1px solid var(--border)", padding:"14px 16px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--muted)", marginBottom:12, letterSpacing:"0.05em" }}>ORDER DETAILS</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"var(--muted)" }}>Checkout Request ID</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11 }}>{detail.checkoutRequestId}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"var(--muted)" }}>Payment Method</span>
                  <Badge variant="lime">{detail.paymentMethod.toUpperCase()}</Badge>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"var(--muted)" }}>Delivery Address</span>
                  <span style={{ fontWeight:600 }}>{detail.orderAddress}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"var(--muted)" }}>Farmer Phone</span>
                  <span style={{ fontFamily:"'DM Mono',monospace" }}>{detail.farmerPhoneNumber}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"var(--muted)" }}>Order Date</span>
                  <span>{detail.createdAt}</span>
                </div>
              </div>
            </div>

            <div style={{ background:"var(--bg)", borderRadius:10, border:"1px solid var(--border)", padding:"14px 16px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--muted)", marginBottom:12, letterSpacing:"0.05em" }}>PRODUCTS</div>
              {detail.products.map((item,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"10px 0", borderBottom: i<detail.products.length-1?"1px solid var(--border)":"none" }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>{item.product.title}</div>
                    <div style={{ fontSize:12, color:"var(--muted)" }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:600, color:"var(--primary)" }}>
                    KES {(item.price*item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"2px solid var(--border)", marginTop:4 }}>
                <span style={{ fontWeight:700, fontSize:15 }}>Total Amount</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:800, fontSize:18, color:"var(--primary)" }}>
                  KES {detail.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─────────────────────────────────────────────
// ADMIN DASHBOARD
// ─────────────────────────────────────────────
const PIE_COLORS = { admin:"#16A34A", expert:"#84CC16", vendor:"#15803D", farmer:"#4ADE80" };

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{setTimeout(()=>setLoading(false),600);},[]);
  const ud = ADMIN_DASH.userData[0];
  const od = ADMIN_DASH.orderData[0];
  const sd = ADMIN_DASH.salesData[0];

  const roleData = ud.roleDistribution.map(r=>({ name:r._id, value:r.count, color:PIE_COLORS[r._id]||"#6B7280" }));
  const growthData = ud.userGrowth.map(g=>({ month:MONTH_NAMES[g._id-1]||`M${g._id}`, users:g.count }));
  const orderMonthly = od.monthlyOrders.map(o=>({ month:MONTH_NAMES[o._id-1]||`M${o._id}`, orders:o.count, revenue:o.revenue }));

  const stats = [
    { label:"Total Users", value:ud.totalUsers[0]?.count||0, icon:Users, sub:"Registered accounts" },
    { label:"Verified Users", value:ud.verifiedUsers[0]?.count||0, icon:UserCheck, sub:"Email verified" },
    { label:"Total Orders", value:od.totalOrders[0]?.count||0, icon:ShoppingCart, sub:"All-time orders" },
    { label:"Total Revenue", value:"KES "+((sd.totalRevenue[0]?.totalSales||0)*1000).toLocaleString(), icon:DollarSign, sub:"Platform revenue" },
    { label:"Pending Orders", value:od.pendingOrders[0]?.count||0, icon:Clock, sub:"Awaiting processing" },
    { label:"Delivered", value:od.deliveredOrders[0]?.count||0, icon:CheckCircle, sub:"Fulfilled orders" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
        {stats.map((s,i) => (
          <StatCard key={i} label={s.label} value={loading?"":s.value} icon={s.icon} sub={s.sub} loading={loading} gradient={i===0} mono={i===3}/>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20 }}>
        {/* Role distribution */}
        <Card>
          <h3 style={{ margin:"0 0 16px", fontSize:16, fontWeight:700 }}>User Role Distribution</h3>
          {loading ? <Skeleton h={180}/> : (
            <>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={roleData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {roleData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip formatter={(v,n)=>[v,n.charAt(0).toUpperCase()+n.slice(1)]}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                {roleData.map(r=>(
                  <div key={r.name} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12 }}>
                    <div style={{ width:8, height:8, borderRadius:99, background:r.color }}/>
                    <span style={{ textTransform:"capitalize", color:"var(--muted)" }}>{r.name}: {r.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* User growth */}
        <Card>
          <h3 style={{ margin:"0 0 16px", fontSize:16, fontWeight:700 }}>User Growth</h3>
          {loading ? <Skeleton h={200}/> : growthData.length === 0 ? (
            <EmptyState icon={TrendingUp} title="No growth data" subtitle="User registration trends will appear here"/>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="month" tick={{ fontSize:11 }}/>
                <YAxis tick={{ fontSize:11 }}/>
                <Tooltip/>
                <Bar dataKey="users" fill="#16A34A" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Orders */}
        <Card>
          <h3 style={{ margin:"0 0 16px", fontSize:16, fontWeight:700 }}>Monthly Orders</h3>
          {loading ? <Skeleton h={200}/> : orderMonthly.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No order data" subtitle="Monthly order trends will appear here"/>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={orderMonthly}>
                <defs>
                  <linearGradient id="oGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84CC16" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#84CC16" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="month" tick={{ fontSize:11 }}/>
                <YAxis tick={{ fontSize:11 }}/>
                <Tooltip/>
                <Area type="monotone" dataKey="orders" stroke="#84CC16" fill="url(#oGrad)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Pending approvals notice */}
      {ud.pendingApprovals.length === 0 && (
        <Card style={{ background:"linear-gradient(135deg,rgba(22,163,74,0.08),rgba(132,204,22,0.04))", border:"1px solid rgba(22,163,74,0.2)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:"rgba(22,163,74,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <CheckCircle size={20} style={{ color:"var(--primary)" }}/>
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:15 }}>All Clear — No Pending Approvals</div>
              <div style={{ fontSize:13, color:"var(--muted)", marginTop:2 }}>All vendor and user approvals are up to date.</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ADMIN VENDORS
// ─────────────────────────────────────────────
const AdminVendors = () => {
  const [vendors, setVendors] = useState(initVendors);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [docModal, setDocModal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"" });
  const toast = useToast();
  useEffect(()=>{setTimeout(()=>setLoading(false),500);},[]);

  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));

  const filtered = vendors.filter(v =>
    (filter==="All"||v.status===filter) &&
    (`${v.fname} ${v.lname} ${v.email}`.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id, status) => {
    setVendors(p=>p.map(v=>v.id===id?{...v,status}:v));
    toast(`Vendor ${status.toLowerCase()} successfully`,"success");
    setConfirm(null);
  };

  const deleteVendor = (id) => {
    setVendors(p=>p.filter(v=>v.id!==id));
    toast("Vendor removed","success");
    setModal(null);
  };

  const saveEdit = () => {
    setVendors(p=>p.map(v=>v.id===editModal.id?{...v,...form}:v));
    toast("Vendor updated","success");
    setEditModal(null);
  };

  const addVendor = () => {
    setVendors(p=>[...p,{...form,id:"v"+Date.now(),status:"Pending",documents:[],createdAt:new Date().toISOString().split("T")[0]}]);
    toast("Vendor added","success");
    setEditModal(null);
  };

  const FILE_ICONS = { pdf:<FileText size={16} style={{color:"#DC2626"}}/>, jpg:<ImgIcon size={16} style={{color:"#D97706"}}/>, jpeg:<ImgIcon size={16} style={{color:"#D97706"}}/>, png:<ImgIcon size={16} style={{color:"#16A34A"}}/> };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search vendors..."
            style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10,
              background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontSize:14, color:"var(--text)",
              outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
        </div>
        {["All","Approved","Pending","Rejected"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:"10px 16px", borderRadius:10, border:`1px solid ${filter===s?"var(--primary)":"var(--border)"}`,
              background:filter===s?"rgba(22,163,74,0.1)":"var(--surface)", color:filter===s?"var(--primary)":"var(--muted)",
              cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
            {s}
          </button>
        ))}
        <Btn onClick={()=>{setForm({fname:"",lname:"",email:"",phone:""});setEditModal({_new:true});}} icon={<Plus size={15}/>}>Add Vendor</Btn>
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? <div style={{ padding:24 }}>{[...Array(4)].map((_,i)=><Skeleton key={i} h={52} r={10} style={{marginBottom:10}}/>)}</div> :
        filtered.length===0 ? <EmptyState icon={Briefcase} title="No vendors found" subtitle="No vendors match your current filters"/> : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid var(--border)", background:"rgba(22,163,74,0.04)" }}>
                  {["Name","Email","Phone","Status","Documents","Joined","Actions"].map(h=>(
                    <th key={h} style={{ padding:"14px 16px", textAlign:"left", fontSize:12, fontWeight:700, color:"var(--muted)", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((v,i) => (
                  <tr key={v.id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"transparent":"rgba(22,163,74,0.02)" }}>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#16A34A,#84CC16)",
                          display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12, flexShrink:0 }}>
                          {v.fname[0]}{v.lname[0]}
                        </div>
                        <span style={{ fontWeight:600, fontSize:14 }}>{v.fname} {v.lname}</span>
                      </div>
                    </td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"var(--muted)" }}>{v.email}</td>
                    <td style={{ padding:"14px 16px", fontSize:13, fontFamily:"'DM Mono',monospace" }}>{v.phone}</td>
                    <td style={{ padding:"14px 16px" }}><StatusBadge status={v.status}/></td>
                    <td style={{ padding:"14px 16px" }}>
                      <button onClick={()=>setDocModal(v)} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(22,163,74,0.1)",
                        border:"none", borderRadius:8, padding:"5px 10px", cursor:"pointer", color:"var(--primary)", fontSize:12, fontWeight:600 }}>
                        <FileText size={12}/> {v.documents.length} docs
                      </button>
                    </td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"var(--muted)" }}>{v.createdAt}</td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        {v.status==="Pending" && <>
                          <button onClick={()=>setConfirm({id:v.id,action:"Approved",name:`${v.fname} ${v.lname}`})}
                            style={{ background:"rgba(22,163,74,0.1)",border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",color:"var(--primary)",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif" }}>Approve</button>
                          <button onClick={()=>setConfirm({id:v.id,action:"Rejected",name:`${v.fname} ${v.lname}`})}
                            style={{ background:"rgba(220,38,38,0.1)",border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",color:"var(--danger)",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif" }}>Reject</button>
                        </>}
                        <button onClick={()=>{setForm({fname:v.fname,lname:v.lname,email:v.email,phone:v.phone});setEditModal(v);}}
                          style={{ background:"rgba(59,130,246,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#3B82F6" }}><Edit2 size={13}/></button>
                        <button onClick={()=>setModal(v)}
                          style={{ background:"rgba(220,38,38,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"var(--danger)" }}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Document preview modal */}
      <Modal open={!!docModal} onClose={()=>setDocModal(null)} title={`Documents — ${docModal?.fname} ${docModal?.lname}`}>
        {docModal && (docModal.documents.length===0 ? (
          <EmptyState icon={FileText} title="No documents uploaded" subtitle="This vendor has not uploaded any documents yet"/>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {docModal.documents.map((doc,i) => {
              const ext = doc.split(".").pop().toLowerCase();
              return (
                <div key={i} style={{ border:"1px solid var(--border)", borderRadius:12, padding:"14px 16px",
                  display:"flex", alignItems:"center", gap:10, background:"var(--bg)" }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"rgba(22,163,74,0.08)",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {FILE_ICONS[ext]||<FileText size={16}/>}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc}</div>
                    <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase" }}>{ext} file</div>
                  </div>
                  <button style={{ background:"rgba(22,163,74,0.1)", border:"none", borderRadius:8, padding:7, cursor:"pointer", color:"var(--primary)" }}>
                    <Download size={13}/>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </Modal>

      {/* Status confirm */}
      <Modal open={!!confirm} onClose={()=>setConfirm(null)} title="Confirm Action" width={420}>
        {confirm && (
          <>
            <p style={{ marginTop:0, color:"var(--muted)" }}>
              Are you sure you want to <strong style={{ color: confirm.action==="Approved"?"var(--primary)":"var(--danger)" }}>{confirm.action==="Approved"?"approve":"reject"}</strong> vendor <strong>{confirm.name}</strong>?
            </p>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <Btn variant="ghost" onClick={()=>setConfirm(null)}>Cancel</Btn>
              <Btn variant={confirm.action==="Approved"?"primary":"danger"} onClick={()=>updateStatus(confirm.id,confirm.action)}>
                {confirm.action==="Approved"?"Approve":"Reject"}
              </Btn>
            </div>
          </>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!modal} onClose={()=>setModal(null)} title="Delete Vendor" width={400}>
        {modal && <>
          <p style={{ marginTop:0, color:"var(--muted)" }}>Remove <strong>{modal.fname} {modal.lname}</strong>? This cannot be undone.</p>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={()=>deleteVendor(modal.id)}>Delete</Btn>
          </div>
        </>}
      </Modal>

      {/* Edit/Add modal */}
      <Modal open={!!editModal} onClose={()=>setEditModal(null)} title={editModal?._new?"Add Vendor":"Edit Vendor"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Input label="First Name" value={form.fname} onChange={f("fname")} required/>
            <Input label="Last Name" value={form.lname} onChange={f("lname")} required/>
          </div>
          <Input label="Email" type="email" value={form.email} onChange={f("email")} required/>
          <Input label="Phone" value={form.phone} onChange={f("phone")}/>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setEditModal(null)}>Cancel</Btn>
            <Btn onClick={editModal?._new ? addVendor : saveEdit}>{editModal?._new?"Add Vendor":"Save Changes"}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─────────────────────────────────────────────
// ADMIN FARMERS
// ─────────────────────────────────────────────
const AdminFarmers = () => {
  const [farmers, setFarmers] = useState(initFarmers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [del, setDel] = useState(null);
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"", region:"", joinDate:"" });
  const toast = useToast();
  useEffect(()=>{setTimeout(()=>setLoading(false),500);},[]);
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));

  const filtered = farmers.filter(x =>
    (filter==="All"||x.status===filter) &&
    `${x.fname} ${x.lname} ${x.email} ${x.region}`.toLowerCase().includes(search.toLowerCase())
  );

  const save = () => {
    if (modal._new) {
      setFarmers(p=>[...p,{...form,id:"f"+Date.now(),status:"Active"}]);
      toast("Farmer added","success");
    } else {
      setFarmers(p=>p.map(x=>x.id===modal.id?{...x,...form}:x));
      toast("Farmer updated","success");
    }
    setModal(null);
  };

  const REGIONS = ["Central Kenya","Nyanza","Rift Valley","Western","Eastern","Coast","Nairobi"];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search farmers..."
            style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10,
              background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontSize:14, color:"var(--text)",
              outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
        </div>
        {["All","Active","Inactive"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:"10px 16px", borderRadius:10, border:`1px solid ${filter===s?"var(--primary)":"var(--border)"}`,
              background:filter===s?"rgba(22,163,74,0.1)":"var(--surface)", color:filter===s?"var(--primary)":"var(--muted)",
              cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
            {s}
          </button>
        ))}
        <Btn onClick={()=>{setForm({fname:"",lname:"",email:"",phone:"",region:"Central Kenya",joinDate:new Date().toISOString().split("T")[0]});setModal({_new:true});}} icon={<Plus size={15}/>}>Add Farmer</Btn>
      </div>

      <Card style={{ padding:0, overflow:"hidden" }}>
        {loading ? <div style={{ padding:24 }}>{[...Array(4)].map((_,i)=><Skeleton key={i} h={52} r={10} style={{marginBottom:10}}/>)}</div> :
        filtered.length===0 ? <EmptyState icon={Sprout} title="No farmers found" subtitle="Registered farmers will appear here"/> : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid var(--border)", background:"rgba(22,163,74,0.04)" }}>
                  {["Name","Email","Phone","Region","Joined","Status","Actions"].map(h=>(
                    <th key={h} style={{ padding:"14px 16px", textAlign:"left", fontSize:12, fontWeight:700, color:"var(--muted)", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((v,i)=>(
                  <tr key={v.id} style={{ borderBottom:"1px solid var(--border)", background:i%2===0?"transparent":"rgba(22,163,74,0.02)" }}>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,#15803D,#16A34A)",
                          display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:11, flexShrink:0 }}>
                          {v.fname[0]}{v.lname[0]}
                        </div>
                        <span style={{ fontWeight:600, fontSize:14 }}>{v.fname} {v.lname}</span>
                      </div>
                    </td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"var(--muted)" }}>{v.email}</td>
                    <td style={{ padding:"14px 16px", fontSize:13, fontFamily:"'DM Mono',monospace" }}>{v.phone}</td>
                    <td style={{ padding:"14px 16px" }}><Badge variant="lime">{v.region}</Badge></td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"var(--muted)" }}>{v.joinDate}</td>
                    <td style={{ padding:"14px 16px" }}><StatusBadge status={v.status}/></td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={()=>{setForm({fname:v.fname,lname:v.lname,email:v.email,phone:v.phone,region:v.region,joinDate:v.joinDate});setModal(v);}}
                          style={{ background:"rgba(59,130,246,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#3B82F6" }}><Edit2 size={13}/></button>
                        <button onClick={()=>setDel(v)}
                          style={{ background:"rgba(220,38,38,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"var(--danger)" }}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?._new?"Add Farmer":"Edit Farmer"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Input label="First Name" value={form.fname} onChange={f("fname")} required/>
            <Input label="Last Name" value={form.lname} onChange={f("lname")} required/>
          </div>
          <Input label="Email" type="email" value={form.email} onChange={f("email")} required/>
          <Input label="Phone" value={form.phone} onChange={f("phone")}/>
          <Select label="Region" value={form.region} onChange={f("region")} options={REGIONS}/>
          <Input label="Join Date" type="date" value={form.joinDate} onChange={f("joinDate")}/>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal?._new?"Add Farmer":"Save Changes"}</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!del} onClose={()=>setDel(null)} title="Remove Farmer" width={400}>
        {del && <>
          <p style={{ marginTop:0, color:"var(--muted)" }}>Remove <strong>{del.fname} {del.lname}</strong>?</p>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setDel(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={()=>{setFarmers(p=>p.filter(x=>x.id!==del.id));toast("Farmer removed","success");setDel(null);}}>Remove</Btn>
          </div>
        </>}
      </Modal>
    </div>
  );
};

// ─────────────────────────────────────────────
// ADMIN EXPERTS
// ─────────────────────────────────────────────
const AdminExperts = () => {
  const [experts, setExperts] = useState(initExperts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [del, setDel] = useState(null);
  const [form, setForm] = useState({ fname:"", lname:"", email:"", specialization:"Crop Science", experience:"" });
  const toast = useToast();
  useEffect(()=>{setTimeout(()=>setLoading(false),500);},[]);
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));

  const filtered = experts.filter(x =>
    (filter==="All"||x.status===filter) &&
    `${x.fname} ${x.lname} ${x.email} ${x.specialization}`.toLowerCase().includes(search.toLowerCase())
  );

  const SPEC_BADGE = { "Crop Science":"success","Soil Science":"lime","Pest Management":"warning","Irrigation":"info","General Agronomy":"default" };

  const save = () => {
    if (modal._new) {
      setExperts(p=>[...p,{...form,id:"e"+Date.now(),status:"Active",experience:+form.experience}]);
      toast("Expert added","success");
    } else {
      setExperts(p=>p.map(x=>x.id===modal.id?{...x,...form,experience:+form.experience}:x));
      toast("Expert updated","success");
    }
    setModal(null);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search experts..."
            style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10,
              background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontSize:14, color:"var(--text)",
              outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
        </div>
        {["All","Active","Inactive"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:"10px 16px", borderRadius:10, border:`1px solid ${filter===s?"var(--primary)":"var(--border)"}`,
              background:filter===s?"rgba(22,163,74,0.1)":"var(--surface)", color:filter===s?"var(--primary)":"var(--muted)",
              cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
            {s}
          </button>
        ))}
        <Btn onClick={()=>{setForm({fname:"",lname:"",email:"",specialization:"Crop Science",experience:""});setModal({_new:true});}} icon={<Plus size={15}/>}>Add Expert</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
        {loading ? [...Array(4)].map((_,i)=>(
          <div key={i} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:20 }}>
            <Skeleton h={48} w={48} r={12} style={{ marginBottom:12 }}/><Skeleton w="70%" h={14} style={{ marginBottom:8 }}/><Skeleton w="50%" h={12}/>
          </div>
        )) : filtered.length===0 ? (
          <div style={{ gridColumn:"1/-1" }}><Card><EmptyState icon={GraduationCap} title="No experts found" subtitle="Agricultural experts will appear here"/></Card></div>
        ) : filtered.map(e=>(
          <Card key={e.id} style={{ position:"relative" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:"linear-gradient(135deg,#16A34A,#84CC16)",
                display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:15, flexShrink:0 }}>
                {e.fname.split(" ").pop()[0]}{e.lname[0]}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:15 }}>{e.fname} {e.lname}</div>
                <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{e.email}</div>
              </div>
              <div style={{ display:"flex", gap:5 }}>
                <button onClick={()=>{setForm({fname:e.fname,lname:e.lname,email:e.email,specialization:e.specialization,experience:e.experience});setModal(e);}}
                  style={{ background:"rgba(59,130,246,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#3B82F6" }}><Edit2 size={13}/></button>
                <button onClick={()=>setDel(e)}
                  style={{ background:"rgba(220,38,38,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"var(--danger)" }}><Trash2 size={13}/></button>
              </div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>
              <Badge variant={SPEC_BADGE[e.specialization]||"default"}>{e.specialization}</Badge>
              <StatusBadge status={e.status}/>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"var(--muted)" }}>
              <Award size={14} style={{ color:"var(--primary)" }}/>
              <span className="font-mono" style={{ color:"var(--primary)", fontWeight:600 }}>{e.experience}</span>
              <span>years of experience</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?._new?"Add Expert":"Edit Expert"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Input label="First Name" value={form.fname} onChange={f("fname")} required/>
            <Input label="Last Name" value={form.lname} onChange={f("lname")} required/>
          </div>
          <Input label="Email" type="email" value={form.email} onChange={f("email")} required/>
          <Select label="Specialization" value={form.specialization} onChange={f("specialization")} options={SPECIALIZATIONS} required/>
          <Input label="Years of Experience" type="number" value={form.experience} onChange={f("experience")} placeholder="0" required/>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal?._new?"Add Expert":"Save Changes"}</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!del} onClose={()=>setDel(null)} title="Remove Expert" width={400}>
        {del && <>
          <p style={{ marginTop:0, color:"var(--muted)" }}>Remove expert <strong>{del.fname} {del.lname}</strong>?</p>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setDel(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={()=>{setExperts(p=>p.filter(x=>x.id!==del.id));toast("Expert removed","success");setDel(null);}}>Remove</Btn>
          </div>
        </>}
      </Modal>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [route, setRoute] = useState("/login");

  const login = useCallback((u) => { setUser(u); }, []);
  const logout = useCallback(() => { setUser(null); setRoute("/login"); }, []);
  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t==="light"?"dark":"light";
      document.documentElement.classList.toggle("dark", next==="dark");
      return next;
    });
  }, []);

  const navigate = useCallback((path) => {
    if (!user && path !== "/login" && path !== "/register") { setRoute("/login"); return; }
    if (user && path.startsWith("/vendor") && user.role !== "vendor") { setRoute("/admin/dashboard"); return; }
    if (user && path.startsWith("/admin") && user.role !== "admin") { setRoute("/vendor/dashboard"); return; }
    setRoute(path);
  }, [user]);

  const renderPage = () => {
    if (!user) {
      if (route === "/register") return <RegisterPage/>;
      return <LoginPage/>;
    }
    const pages = {
      "/vendor/dashboard": <VendorDashboard/>,
      "/vendor/products": <VendorProducts/>,
      "/vendor/orders": <VendorOrders/>,
      "/admin/dashboard": <AdminDashboard/>,
      "/admin/vendors": <AdminVendors/>,
      "/admin/farmers": <AdminFarmers/>,
      "/admin/experts": <AdminExperts/>,
    };
    const content = pages[route] || pages[user.role==="admin"?"/admin/dashboard":"/vendor/dashboard"];
    return <AppShell>{content}</AppShell>;
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      <ThemeCtx.Provider value={{ theme, toggleTheme }}>
        <NavCtx.Provider value={{ route, navigate }}>
          <ToastProvider>
            <GlobalStyles/>
            {renderPage()}
          </ToastProvider>
        </NavCtx.Provider>
      </ThemeCtx.Provider>
    </AuthCtx.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    //  <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/dashboard" element={
    //       <Protected>
    //         <Dashboard />
    //       </Protected>
    //     }/>
    //     <Route path="/signUp" element={<SignUp />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/products" element={
    //       <Protected>
    //         <Products />
    //       </Protected>
    //     }/>
    //     <Route path="/orders" element={
    //       <Protected>
    //         <Orders />
    //       </Protected>
    //     } />
    //     <Route path="/admin" element={
    //       <Protected>
    //         {/* <AdminProtected> */}
    //           <Admin />
    //         {/* </AdminProtected> */}
    //       </Protected>
    //     } />
    //   </Routes>
    // </BrowserRouter>
  // </StrictMode>
  <App/>
  
)
