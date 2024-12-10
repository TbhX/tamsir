import { motion } from 'framer-motion';
import { PortfolioItem } from '../../types/portfolio';

interface PortfolioCardProps {
  project: PortfolioItem;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
      }}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex-shrink-0 overflow-hidden">
        <img
          className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110"
          src={project.image_url}
          alt={project.title}
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900">
            {project.title}
          </h3>
          <p className="mt-3 text-base text-slate-500">
            {project.description}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 transition-colors duration-300 hover:bg-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}