import { motion } from 'framer-motion';
import PortfolioCard from './PortfolioCard';
import { PortfolioItem } from '../../types/portfolio';

interface PortfolioGridProps {
  projects: PortfolioItem[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <div className="mt-16 text-center text-slate-500">
        Aucun projet à afficher pour le moment.
      </div>
    );
  }

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
        }
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <PortfolioCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}