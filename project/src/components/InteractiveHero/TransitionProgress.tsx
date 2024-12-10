import { motion } from 'framer-motion';

interface TransitionProgressProps {
  currentStage: number;
  totalStages: number;
}

export default function TransitionProgress({ currentStage, totalStages }: TransitionProgressProps) {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2">
        {Array.from({ length: totalStages }).map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-blue-200"
            initial={false}
            animate={{
              scale: currentStage === index ? 1.5 : 1,
              backgroundColor: currentStage >= index ? '#1a365d' : '#bfdbfe'
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          />
        ))}
      </div>
    </div>
  );
}