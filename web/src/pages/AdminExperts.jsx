import React, { useState, useEffect } from 'react';
import { useToast } from '../context';
import { Btn, Badge, Card, Skeleton, Modal, Input, Select, EmptyState, StatusBadge } from '../components/ui';
import { Search, Plus, Edit2, Trash2, Award, GraduationCap } from 'lucide-react';
import { SPECIALIZATIONS } from '../data/mockData';

import Database from '../js/db.js';

const db = new Database();

const AdminExperts = () => {
  const [confirm, setConfirm] = useState(null);
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("approved");
  const [loading, setLoading] = useState(true);
  /*
  const [modal, setModal] = useState(null);
  const [del, setDel] = useState(null);
  const [form, setForm] = useState({ fname:"", lname:"", email:"", specialization:"Crop Science", experience:"" });
  */
  const toast = useToast();

  const fetchExperts = React.useCallback(async () => {
    setLoading(true);
    const tokenStr = sessionStorage.getItem("token");
    if (tokenStr) {
      const res = await db.getAdminUsers(JSON.parse(tokenStr), 'expert', filter === "approved" ? true : false);
      if (res.status) {
        setExperts(res.data.users || []);
      }
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchExperts(); }, [fetchExperts]);

  /*
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));
  */

  const filtered = experts.filter(x =>
    `${x.firstName || x.fname} ${x.lastName || x.lname} ${x.email} ${x.specialization}`.toLowerCase().includes(search.toLowerCase())
  );

  const SPEC_BADGE = { "Crop Science": "success", "Soil Science": "lime", "Pest Management": "warning", "Irrigation": "info", "General Agronomy": "default" };

  /*
  const save = async () => {
    if (modal._new) {
       toast("Expert addition via admin not yet fully implemented in DB","info");
    } else {
       toast("Expert update via admin not yet fully implemented in DB","info");
    }
    setModal(null);
  };
  */

  const updateStatus = async (id, action) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.manageUser(token, id, action);
    if (res.status) {
      toast(`User ${action === "approve" ? "approved" : "suspended"} successfully`, "success");
      fetchExperts();
    } else {
      toast(res.message || `Error ${action}ing user`, "error");
    }
    setConfirm(null);
  };

  /*
  const removeExpert = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.manageUser(token, id, "delete");
    if (res.status) {
      setExperts(p=>p.filter(x=>(x._id || x.id)!==id));
      toast("Expert removed","success");
    } else {
      toast(res.message || "Error removing expert", "error");
    }
    setDel(null);
  };
  */

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search experts..."
            style={{
              width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, color: "var(--text)",
              outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box"
            }} />
        </div>
        {["approved", "pending"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding: "10px 16px", borderRadius: 10, border: `1px solid ${filter === s ? "var(--primary)" : "var(--border)"}`,
              background: filter === s ? "rgba(22,163,74,0.1)" : "var(--surface)", color: filter === s ? "var(--primary)" : "var(--muted)",
              cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif"
            }}>
            {s}
          </button>
        ))}
        {/* <Btn onClick={()=>{setForm({fname:"",lname:"",email:"",specialization:"Crop Science",experience:""});setModal({_new:true});}} icon={<Plus size={15}/>}>Add Expert</Btn> */}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {loading ? [...Array(4)].map((_, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <Skeleton h={48} w={48} r={12} style={{ marginBottom: 12 }} />
            <Skeleton w="70%" h={14} style={{ marginBottom: 8 }} />
            <Skeleton w="50%" h={12} />
          </div>
        )) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1" }}><Card><EmptyState icon={GraduationCap} title="No experts found" subtitle="Agricultural experts will appear here" /></Card></div>
        ) : filtered.map(e => (
          <Card key={e._id || e.id} style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#16A34A,#84CC16)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, flexShrink: 0
              }}>
                {(e.firstName || e.fname || "U")[0]}{(e.lastName || e.lname || "")[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{e.firstName || e.fname} {e.lastName || e.lname}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{e.email}</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {filter === "pending" ? (
                  <button onClick={() => setConfirm({ id: e._id || e.id, action: "approve", name: `${e.firstName || e.fname} ${e.lastName || e.lname}` })}
                    style={{ background: "rgba(22,163,74,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--primary)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Approve</button>
                ) : (
                  <button onClick={() => setConfirm({ id: e._id || e.id, action: "suspend", name: `${e.firstName || e.fname} ${e.lastName || e.lname}` })}
                    style={{ background: "rgba(220,38,38,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--danger)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Suspend</button>
                )}
                {/* 
                <button onClick={()=>{setForm({fname:v.firstName || v.fname,lname:v.lastName || v.lname,email:v.email,phone:v.phoneNumber || v.phone,region:v.region,joinDate:v.createdAt?.split("T")[0] || v.joinDate});setModal(v);}}
                  style={{ background:"rgba(59,130,246,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#3B82F6" }}><Edit2 size={13}/></button>
                <button onClick={()=>setDel(v)}
                  style={{ background:"rgba(220,38,38,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"var(--danger)" }}><Trash2 size={13}/></button>
                */}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <Badge variant={SPEC_BADGE[e.specialization] || "default"}>{"Horticulturist"}</Badge>
              <StatusBadge status={filter === "approved" ? "Approved" : "Pending"} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
              <Award size={14} style={{ color: "var(--primary)" }} />
              <span className="font-mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{Math.round(Math.random() * 10) + 1}</span>
              <span>years of experience</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Confirm Action" width={420}>
        {confirm && (
          <>
            <p style={{ marginTop: 0, color: "var(--muted)" }}>
              Are you sure you want to <strong style={{ color: confirm.action === "approve" ? "var(--primary)" : "var(--danger)" }}>{confirm.action}</strong> expert <strong>{confirm.name}</strong>?
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn variant="ghost" onClick={() => setConfirm(null)}>Cancel</Btn>
              <Btn variant={confirm.action === "approve" ? "primary" : "danger"} onClick={() => updateStatus(confirm.id, confirm.action)}>
                {confirm.action === "approve" ? "Approve" : "Suspend"}
              </Btn>
            </div>
          </>
        )}
      </Modal>

      {/* 
      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?._new?"Add Expert":"Edit Expert"}>
        ...
      </Modal>

      <Modal open={!!del} onClose={()=>setDel(null)} title="Remove Expert" width={400}>
        ...
      </Modal>
      */}
    </div>
  );
};

export default AdminExperts;
