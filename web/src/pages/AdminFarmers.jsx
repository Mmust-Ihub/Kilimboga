import React, { useState, useEffect } from 'react';
import { useToast } from '../context';
import { Btn, Badge, Card, Skeleton, Modal, Input, Select, EmptyState, StatusBadge } from '../components/ui';
import { Search, Plus, Edit2, Trash2, Sprout } from 'lucide-react';

import Database from '../js/db.js';

const db = new Database();

const AdminFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  /*
  const [modal, setModal] = useState(null);
  const [del, setDel] = useState(null);
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"", region:"", joinDate:"" });
  */
  const toast = useToast();

  const fetchFarmers = React.useCallback(async () => {
    setLoading(true);
    const tokenStr = sessionStorage.getItem("token");
    if (tokenStr) {
      const res = await db.getAdminUsers(JSON.parse(tokenStr), 'farmer', filter === "approved" ? true : false);
      if (res.status) {
        setFarmers(res.data.users || []);
      }
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchFarmers(); }, [fetchFarmers]);

  /*
  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));
  */

  const filtered = farmers.filter(x =>
    `${x.firstName || x.fname} ${x.lastName || x.lname} ${x.email} ${x.region}`.toLowerCase().includes(search.toLowerCase())
  );

  /*
  const save = async () => {
    if (modal._new) {
       toast("Farmer addition via admin not yet fully implemented in DB","info");
    } else {
       toast("Farmer update via admin not yet fully implemented in DB","info");
    }
    setModal(null);
  };
  */

  const updateStatus = async (id, action) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.manageUser(token, id, action);
    if (res.status) {
      toast(`User ${action === "approve" ? "approved" : "suspended"} successfully`, "success");
      fetchFarmers();
    } else {
      toast(res.message || `Error ${action}ing user`, "error");
    }
    setConfirm(null);
  };

  /*
  const removeFarmer = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.manageUser(token, id, "delete");
    if (res.status) {
      setFarmers(p=>p.filter(x=>(x._id || x.id)!==id));
      toast("Farmer removed","success");
    } else {
      toast(res.message || "Error removing farmer", "error");
    }
    setDel(null);
  };
  */

  const REGIONS = ["Central Kenya", "Nyanza", "Rift Valley", "Western", "Eastern", "Coast", "Nairobi"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search farmers..."
            style={{
              width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, color: "var(--text)",
              outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box"
            }} />
        </div>
        {/* {["approved", "pending"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding: "10px 16px", borderRadius: 10, border: `1px solid ${filter === s ? "var(--primary)" : "var(--border)"}`,
              background: filter === s ? "rgba(22,163,74,0.1)" : "var(--surface)", color: filter === s ? "var(--primary)" : "var(--muted)",
              cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif"
            }}>
            {s}
          </button>
        ))} */}
        {/* <Btn onClick={()=>{setForm({fname:"",lname:"",email:"",phone:"",region:"Central Kenya",joinDate:new Date().toISOString().split("T")[0]});setModal({_new:true});}} icon={<Plus size={15}/>}>Add Farmer</Btn> */}
      </div>

      <div style={{ padding: 0, overflow: "hidden" }}>
        {loading ? <div style={{ padding: 24 }}>{[...Array(4)].map((_, i) => <Skeleton key={i} h={52} r={10} style={{ marginBottom: 10 }} />)}</div> :
          filtered.length === 0 ? <EmptyState icon={Sprout} title="No farmers found" subtitle="Registered farmers will appear here" /> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(22,163,74,0.04)" }}>
                    {/* {["Name", "Email", "Status", "Actions"].map(h => ( */}
                    {["Name", "Email"].map(h => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={v._id || v.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(22,163,74,0.02)" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#15803D,#16A34A)",
                            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11, flexShrink: 0
                          }}>
                            {(v.firstName || v.fname || "U")[0]}{(v.lastName || v.lname || "")[0]}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{v.firstName || v.fname} {v.lastName || v.lname}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--muted)" }}>{v.email}</td>
                      {/* <td style={{ padding: "14px 16px" }}><StatusBadge status={filter === "approved" ? "Approved" : "Pending"} /></td> */}
                      {/* <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {filter === "pending" ? (
                            <button onClick={() => setConfirm({ id: v._id || v.id, action: "approve", name: `${v.firstName || v.fname} ${v.lastName || v.lname}` })}
                              style={{ background: "rgba(22,163,74,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--primary)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Approve</button>
                          ) : (
                            <button onClick={() => setConfirm({ id: v._id || v.id, action: "suspend", name: `${v.firstName || v.fname} ${v.lastName || v.lname}` })}
                              style={{ background: "rgba(220,38,38,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--danger)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Suspend</button>
                          )}
                          
                        <button onClick={()=>{setForm({fname:v.firstName || v.fname,lname:v.lastName || v.lname,email:v.email,phone:v.phoneNumber || v.phone,region:v.region,joinDate:v.createdAt?.split("T")[0] || v.joinDate});setModal(v);}}
                          style={{ background:"rgba(59,130,246,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#3B82F6" }}><Edit2 size={13}/></button>
                        <button onClick={()=>setDel(v)}
                          style={{ background:"rgba(220,38,38,0.1)",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"var(--danger)" }}><Trash2 size={13}/></button>
                       
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Confirm Action" width={420}>
        {confirm && (
          <>
            <p style={{ marginTop: 0, color: "var(--muted)" }}>
              Are you sure you want to <strong style={{ color: confirm.action === "approve" ? "var(--primary)" : "var(--danger)" }}>{confirm.action}</strong> farmer <strong>{confirm.name}</strong>?
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
      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?._new?"Add Farmer":"Edit Farmer"}>
        ...
      </Modal>

      <Modal open={!!del} onClose={()=>setDel(null)} title="Remove Farmer" width={400}>
        ...
      </Modal>
      */}
    </div>
  );
};

export default AdminFarmers;
