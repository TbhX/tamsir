export default function PortfolioSkeleton() {
  return (
    <div className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}