import { motion } from 'framer-motion';
import { useStory } from '../StoryContext';
import { ArrowDown } from 'lucide-react';

const interestMessages = {
  web: "les sites web modernes et performants",
  mobile: "les applications mobiles innovantes",
  api: "les solutions d'intégration API",
  other: "les projets créatifs et sur mesure"
};

export default function Reveal() {
  const { userName, userInterest } = useStory();
  
  const message = interestMessages[userInterest as keyof typeof interestMessages];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto text-center"
    >
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Parfait {userName} !
      </h2>
      <motion.p 
        className="mt-6 text-xl text-slate-600 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Je suis Bah Tamsir, développeur full-stack spécialisé dans {message}.
        Découvrons ensemble comment je peux vous aider à concrétiser votre projet.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <a
          href="#services"
          className="inline-flex items-center gap-2 text-blue-900 font-medium hover:text-blue-800 transition-colors"
        >
          Découvrir mes services
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