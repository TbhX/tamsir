import { motion } from 'framer-motion';
import { useStory } from '../StoryContext';
import { Check, ArrowDown, Calendar, CreditCard, Rocket } from 'lucide-react';

export default function Recommendations() {
  const { userName, projectDetails } = useStory();

  const getRecommendations = () => {
    const budget = projectDetails.budget;
    const timeline = projectDetails.timeline;
    
    let recommendations = [];
    
    // Base sur le budget
    if (budget?.includes('< 5000')) {
      recommendations.push({
        title: 'Site Vitrine Optimisé',
        description: 'Solution rapide et efficace avec les technologies modernes',
        icon: Rocket,
      });
    } else if (budget?.includes('5000') || budget?.includes('10000')) {
      recommendations.push({
        title: 'Application Web Progressive',
        description: 'Expérience utilisateur avancée avec fonctionnalités personnalisées',
        icon: Rocket,
      });
    } else {
      recommendations.push({
        title: 'Solution Entreprise Complète',
        description: 'Système sur mesure avec intégrations avancées',
        icon: Rocket,
      });
    }

    // Basé sur le timeline
    recommendations.push({
      title: 'Planning Proposé',
      description: `Développement sur ${timeline?.toLowerCase()} avec livrables réguliers`,
      icon: Calendar,
    });

    // Recommandation de budget
    recommendations.push({
      title: 'Investissement Optimal',
      description: `Budget estimé: ${budget} avec paiements échelonnés`,
      icon: CreditCard,
    });

    return recommendations;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto text-center"
    >
      <h2 className="text-3xl font-bold text-slate-900">
        Voici mes recommandations, {userName}
      </h2>
      <p className="mt-4 text-xl text-slate-600">
        Basées sur vos besoins et contraintes
      </p>

      <motion.div
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {getRecommendations().map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-900 mb-4">
              <rec.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {rec.title}
            </h3>
            <p className="text-slate-600">
              {rec.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-blue-900 font-medium hover:text-blue-800 transition-colors"
        >
          Discuter de ces recommandations
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
    </motion.div>
  );
}