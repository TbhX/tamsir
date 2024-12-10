import { usePortfolio } from '../hooks/usePortfolio';
import PortfolioHeader from './portfolio/PortfolioHeader';
import PortfolioGrid from './portfolio/PortfolioGrid';
import PortfolioSkeleton from './portfolio/PortfolioSkeleton';

export default function Portfolio() {
  const { projects, loading, error } = usePortfolio();

  if (loading) {
    return <PortfolioSkeleton />;
  }

  if (error) {
    return (
      <div className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Une erreur est survenue lors du chargement du portfolio.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="portfolio" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioHeader />
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  );
}