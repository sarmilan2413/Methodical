interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  badge?: string;
  badgeColor?: string;
}

const StatCard = ({ icon, label, value, badge, badgeColor = "text-primary bg-primary-fixed/30" }: StatCardProps) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl editorial-shadow group transition-all hover:editorial-shadow-hover border border-transparent hover:border-primary-fixed">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-primary-fixed text-primary rounded-lg">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {badge && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-on-surface-variant font-medium text-xs mb-1">{label}</p>
      <h3 className="text-4xl font-bold tracking-tight text-on-surface">{value}</h3>
    </div>
  );
};

export default StatCard;
