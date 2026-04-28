import React, { useState, useEffect } from 'react';
import { useToast } from '../context';
import { Btn, Badge, Card, Skeleton, Modal, Input, Select, EmptyState, StatusBadge } from '../components/ui';
import { Search, Plus, Edit2, Trash2, FileText, Image as ImgIcon, Download, Briefcase } from 'lucide-react';

import Database from '../js/db.js';

const db = new Database();

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("approved");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [docModal, setDocModal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "" });
  const toast = useToast();

  const fetchVendors = React.useCallback(async () => {
    setLoading(true);
    const tokenStr = sessionStorage.getItem("token");
    if (tokenStr) {
      const res = await db.getAdminUsers(JSON.parse(tokenStr), 'vendor', filter == "approved" ? true : false);
      if (res.status) {
        setVendors(res.data.users)
      }
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchVendors(); }, [filter]);

  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // const filtered = vendors?.filter(v =>
  //   (`${v.firstName || v.fname} ${v.lastName || v.lname} ${v.email}`.toLowerCase().includes(search.toLowerCase()))
  // );

  let filtered = [];

  if (vendors) {
    filtered = vendors.filter(v =>
      (`${v.firstName || v.fname} ${v.lastName || v.lname} ${v.email}`.toLowerCase().includes(search.toLowerCase()))
    );
  }

  const updateStatus = async (id, action) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.manageUser(token, id, action);
    if (res.status) {
      toast(`User ${action === "approve" ? "approved" : "suspended"} successfully`, "success");
      fetchVendors();
    } else {
      toast(res.message || `Error ${action}ing user`, "error");
    }
    setConfirm(null);
  };

  const deleteVendor = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.manageUser(token, id, "delete");
    if (res.status) {
      setVendors(p => p.filter(v => (v._id || v.id) !== id));
      toast("Vendor removed", "success");
    } else {
      toast(res.message || "Error deleting vendor", "error");
    }
    setModal(null);
  };

  const saveEdit = () => {
    setVendors(p => p.map(v => v.id === editModal.id ? { ...v, ...form } : v));
    toast("Vendor updated", "success");
    setEditModal(null);
  };

  const addVendor = () => {
    setVendors(p => [...p, { ...form, id: "v" + Date.now(), status: "Pending", documents: [], createdAt: new Date().toISOString().split("T")[0] }]);
    toast("Vendor added", "success");
    setEditModal(null);
  };

  const FILE_ICONS = { pdf: <FileText size={16} style={{ color: "#DC2626" }} />, jpg: <ImgIcon size={16} style={{ color: "#D97706" }} />, jpeg: <ImgIcon size={16} style={{ color: "#D97706" }} />, png: <ImgIcon size={16} style={{ color: "#16A34A" }} /> };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendors..."
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
        {/* <Btn onClick={() => { setForm({ fname: "", lname: "", email: "", phone: "" }); setEditModal({ _new: true }); }} icon={<Plus size={15} />}>Add Vendor</Btn> */}
      </div>

      <div style={{ padding: 0, overflow: "hidden" }}>
        {loading ? <div style={{ padding: 24 }}>{[...Array(4)].map((_, i) => <Skeleton key={i} h={52} r={10} style={{ marginBottom: 10 }} />)}</div> :
          filtered.length === 0 ? <EmptyState icon={Briefcase} title="No vendors found" subtitle="No vendors match your current filters" /> : (
            <div style={{ overflowX: "auto" }}>
              {/* <table style={{ width: "100%", borderCollapse: "collapse" }}> */}
              <table style={{ width: "100%" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(22,163,74,0.04)" }}>
                    {["Name", "Email", "Status", "Documents", "Actions"].map(h => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={v._id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(22,163,74,0.02)" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#16A34A,#84CC16)",
                            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0
                          }}>
                            {(v.firstName || v.fname || "U")[0]}{(v.lastName || v.lname || "")[0]}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{v.firstName || v.fname} {v.lastName || v.lname}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--muted)" }}>{v.email}</td>
                      <td style={{ padding: "14px 16px" }}><StatusBadge status={filter == "approved" ? "Approved" : "Pending"} /></td>
                      <td style={{ padding: "14px 16px" }}>
                        <button onClick={() => setDocModal(v)} style={{
                          display: "flex", alignItems: "center", gap: 5, background: "rgba(22,163,74,0.1)",
                          border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--primary)", fontSize: 12, fontWeight: 600
                        }}>
                          <FileText size={12} /> {v.documents?.length || 0} docs
                        </button>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {filter === "pending" ? (
                            <button onClick={() => setConfirm({ id: v._id || v.id, action: "approve", name: `${v.firstName || v.fname} ${v.lastName || v.lname}` })}
                              style={{ background: "rgba(22,163,74,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--primary)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Approve</button>
                          ) : (
                            <button onClick={() => setConfirm({ id: v._id || v.id, action: "suspend", name: `${v.firstName || v.fname} ${v.lastName || v.lname}` })}
                              style={{ background: "rgba(220,38,38,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--danger)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Suspend</button>
                          )}
                          {/* <button onClick={() => { setForm({ fname: v.firstName || v.fname, lname: v.lastName || v.lname, email: v.email, phone: v.phoneNumber || v.phone }); setEditModal(v); }}
                            style={{ background: "rgba(59,130,246,0.1)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "#3B82F6" }}><Edit2 size={13} /></button>
                          <button onClick={() => setModal(v)}
                            style={{ background: "rgba(220,38,38,0.1)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--danger)" }}><Trash2 size={13} /></button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {/* Document preview modal */}
      <Modal open={!!docModal} onClose={() => setDocModal(null)} title={`Documents — ${docModal?.firstName || docModal?.fname} ${docModal?.lastName || docModal?.lname}`}>
        {docModal && (docModal.documents?.length === 0 ? (
          <EmptyState icon={FileText} title="No documents uploaded" subtitle="This vendor has not uploaded any documents yet" />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {docModal.documents?.map((doc, i) => {
              const ext = doc.split(".").pop().toLowerCase();
              return (
                <div key={i} style={{
                  border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 10, background: "var(--bg)"
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: "rgba(22,163,74,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    {FILE_ICONS[ext] || <FileText size={16} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>{ext} file</div>
                  </div>
                  <button style={{ background: "rgba(22,163,74,0.1)", border: "none", borderRadius: 8, padding: 7, cursor: "pointer", color: "var(--primary)" }}>
                    <Download size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </Modal>

      {/* Status confirm */}
      <Modal open={!!confirm} onClose={() => setConfirm(null)} title="Confirm Action" width={420}>
        {confirm && (
          <>
            <p style={{ marginTop: 0, color: "var(--muted)" }}>
              Are you sure you want to <strong style={{ color: confirm.action === "approve" ? "var(--primary)" : "var(--danger)" }}>{confirm.action}</strong> vendor <strong>{confirm.name}</strong>?
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

      {/* Delete confirm */}
      <Modal open={!!modal} onClose={() => setModal(null)} title="Delete Vendor" width={400}>
        {modal && <>
          <p style={{ marginTop: 0, color: "var(--muted)" }}>Remove <strong>{modal.firstName || modal.fname} {modal.lastName || modal.lname}</strong>? This cannot be undone.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={() => deleteVendor(modal._id || modal.id)}>Delete</Btn>
          </div>
        </>}
      </Modal>

      {/* Edit/Add modal */}
      <Modal open={!!editModal} onClose={() => setEditModal(null)} title={editModal?._new ? "Add Vendor" : "Edit Vendor"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Input label="First Name" value={form.fname} onChange={f("fname")} required />
            <Input label="Last Name" value={form.lname} onChange={f("lname")} required />
          </div>
          <Input label="Email" type="email" value={form.email} onChange={f("email")} required />
          <Input label="Phone" value={form.phone} onChange={f("phone")} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setEditModal(null)}>Cancel</Btn>
            <Btn onClick={editModal?._new ? addVendor : saveEdit}>{editModal?._new ? "Add Vendor" : "Save Changes"}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminVendors;
