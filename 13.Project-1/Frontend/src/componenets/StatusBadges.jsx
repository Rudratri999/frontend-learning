const statusStyles = {
    completed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    in_progress: "bg-blue-100 text-blue-700",
    inprogress: "bg-blue-100 text-blue-700",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-emerald-100 text-emerald-700",
    ongoing: "bg-blue-100 text-blue-700",
};

const statusLabels = {
    in_progress: "In Progress",
    inprogress: "In Progress",
    "in-progress": "In Progress",
    ongoing: "Ongoing",
    done: "Done",
};

const normalizeStatus = (status) => {
    if (!status) return "pending";

    const normalized = String(status)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/-/g, "_");

    if (normalized === "completed") return "completed";
    if (normalized === "pending") return "pending";
    if (normalized === "in_progress" || normalized === "inprogress" || normalized === "in-progress") return "in_progress";
    if (normalized === "done") return "done";
    if (normalized === "ongoing") return "ongoing";

    return normalized;
};

const StatusBadge = ({ status }) => {
    const normalizedStatus = normalizeStatus(status);
    const styleClass = statusStyles[normalizedStatus] || "bg-slate-100 text-slate-700";
    const label = statusLabels[normalizedStatus] || String(status || "Pending");

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styleClass}`}>
            {label}
        </span>
    );
};

export default StatusBadge;