import { motion } from 'framer-motion';
import { useStory } from '../StoryContext';
import { Code2, Smartphone, Server, Sparkles, Bot } from 'lucide-react';

const interests = [
  { id: 'web', icon: Code2, label: 'Site Web', description: 'Applications web modernes et réactives' },
  { id: 'mobile', icon: Smartphone, label: 'App Mobile', description: 'Applications iOS et Android performantes' },
  { id: 'api', icon: Server, label: 'API', description: 'Intégrations et services web robustes' },
  { id: 'other', icon: Sparkles, label: 'Autre', description: 'Solutions sur mesure pour vos besoins' },
];

export default function Interest() {
  const { userName, setUserInterest, setStoryStage } = useStory();

  const handleInterestClick = (interest: string) => {
    setUserInterest(interest);
    setStoryStage(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto text-center"
    >
      <motion.div className="flex items-center justify-center gap-3 mb-6">
        <Bot className="h-6 w-6 text-blue-900" />
        <span className="text-sm font-medium text-blue-900">Assistant Mike</span>
      </motion.div>

      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Excellent, {userName} !
      </h2>
      <p className="mt-4 text-xl text-slate-600">
        Quel domaine d'expertise de Tamsir vous intéresse le plus ?
      </p>

      <motion.div 
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {interests.map((interest) => (
          <motion.button
            key={interest.id}
            onClick={() => handleInterestClick(interest.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <interest.icon className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{interest.label}</h3>
                <p className="mt-1 text-sm text-slate-600">{interest.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-sm text-slate-500"
      >
        Chaque solution est personnalisée selon vos besoins spécifiques
      </motion.p>
    </motion.div>
  );
}