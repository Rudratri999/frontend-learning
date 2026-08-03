const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
};


const PriorityBadge = ({ priority }) => {

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                priorityStyles[priority] || "bg-slate-100 text-slate-700"
            }`}
        >
            {priority}
        </span>
    );
};

export default PriorityBadge;