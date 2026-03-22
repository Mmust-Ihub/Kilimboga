import { Badge } from './badge';

export const StatusBadge = ({ status }) => {
  const map = {
    completed: { v: "success", label: "Completed" }, pending: { v: "warning", label: "Pending" },
    failed: { v: "danger", label: "Failed" }, delivered: { v: "success", label: "Delivered" },
    shipped: { v: "info", label: "Shipped" }, "Approved": { v: "success", label: "Approved" },
    "Pending": { v: "warning", label: "Pending" }, "Rejected": { v: "danger", label: "Rejected" },
    "Active": { v: "success", label: "Active" }, "Inactive": { v: "default", label: "Inactive" },
  };
  const m = map[status] || { v: "default", label: status };
  return <Badge variant={m.v}>{m.label}</Badge>;
};