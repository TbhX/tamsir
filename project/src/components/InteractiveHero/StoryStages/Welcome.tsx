import { motion } from 'framer-motion';
import { useStory } from '../StoryContext';
import { Bot, ArrowRight, Coffee } from 'lucide-react';

export default function Welcome() {
  const { setUserName, setStoryStage } = useStory();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    if (name) {
      setUserName(name);
      setStoryStage(1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-900 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Bot className="h-8 w-8" />
      </motion.div>

      <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
        Bonjour, je suis Mike
      </h1>
      <p className="mt-4 text-xl text-slate-600">
        L'assistant virtuel de Tamsir. Je suis là pour comprendre votre projet et vous guider vers les meilleures solutions.
      </p>
      
      <motion.div 
        className="mt-8 p-6 bg-white rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Coffee className="h-6 w-6 text-blue-900" />
          <p className="text-lg text-slate-700">Commençons par faire connaissance</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-left text-sm font-medium text-slate-700">
              Comment puis-je vous appeler ?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Votre nom"
              className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
          >
            Enchanté de vous rencontrer
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </form>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-sm text-slate-500"
      >
        🔒 Vos informations restent confidentielles et ne sont utilisées que pour personnaliser votre expérience
      </motion.p>
    </motion.div>
  );
}