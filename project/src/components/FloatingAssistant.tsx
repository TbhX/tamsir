import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Stars, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingAssistant() {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, 
    [0, 200], 
    [20, 100]
  );

  const rotate = useTransform(scrollY,
    [0, 1000],
    [0, 360]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      style={{ y }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div 
        className="relative"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Cosmic effects */}
        <motion.div
          className="absolute -inset-4"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Stars className="h-6 w-6 text-blue-400 absolute -top-6 left-0" />
          <Sparkles className="h-5 w-5 text-blue-300 absolute -bottom-4 right-0" />
        </motion.div>

        {/* Assistant avatar */}
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center shadow-lg"
          style={{ rotate }}
        >
          <Bot className="h-8 w-8 text-white" />
        </motion.div>

        {/* Message bubble */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg"
          >
            <p className="text-sm text-slate-700 whitespace-nowrap">
              Je suis là pour vous aider ! 👋
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}