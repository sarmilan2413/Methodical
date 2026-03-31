interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  label: string;
}

const statusStyles = {
  success: "bg-[#e8f5e9] text-[#2e7d32]",
  warning: "bg-[#fff8e1] text-[#f57f17]",
  error: "bg-error-container text-error",
  info: "bg-primary-fixed text-primary",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {label}
    </span>
  );
};

export default StatusBadge;
