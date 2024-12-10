import { motion } from 'framer-motion';
import { useStory } from '../StoryContext';
import { ArrowRight } from 'lucide-react';

const budgetRanges = [
  '< 5000 €',
  '5000 € - 10000 €',
  '10000 € - 20000 €',
  '> 20000 €'
];

const timelineOptions = [
  '< 1 mois',
  '1-3 mois',
  '3-6 mois',
  '> 6 mois'
];

export default function ProjectDetails() {
  const { projectDetails, setProjectDetails, setStoryStage } = useStory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setProjectDetails({
      ...projectDetails,
      budget: formData.get('budget') as string,
      timeline: formData.get('timeline') as string,
      description: formData.get('description') as string,
    });
    
    setStoryStage(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-slate-900 text-center">
        Parlons de votre projet
      </h2>
      <p className="mt-4 text-xl text-slate-600 text-center">
        Ces informations m'aideront à vous fournir des recommandations pertinentes
      </p>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Budget estimé
          </label>
          <select
            name="budget"
            required
            className="w-full rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une fourchette</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Délai souhaité
          </label>
          <select
            name="timeline"
            required
            className="w-full rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une durée</option>
            {timelineOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description du projet
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Décrivez brièvement votre projet..."
            className="w-full rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full inline-flex justify-center items-center px-6 py-3 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
        >
          Obtenir des recommandations
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.form>
    </motion.div>
  );
}