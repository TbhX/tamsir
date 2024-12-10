import { motion } from 'framer-motion';

export default function PortfolioHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h2 className="text-base text-blue-900 font-semibold">Portfolio</h2>
      <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
        Projets récents
      </p>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
        Découvrez quelques-unes de mes réalisations
      </p>
    </motion.div>
  );
}