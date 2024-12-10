import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StoryProvider, useStory } from './StoryContext';
import Welcome from './StoryStages/Welcome';
import Interest from './StoryStages/Interest';
import ProjectDetails from './StoryStages/ProjectDetails';
import Recommendations from './StoryStages/Recommendations';
import Reveal from './StoryStages/Reveal';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function StoryContent() {
  const { storyStage } = useStory();

  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    setPage([storyStage, storyStage > page ? 1 : -1]);
  }, [storyStage]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative overflow-hidden w-full">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {storyStage === 0 && (
          <Welcome
            key="welcome"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        )}
        {storyStage === 1 && (
          <Interest
            key="interest"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          />
        )}
        {storyStage === 2 && (
          <ProjectDetails
            key="details"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          />
        )}
        {storyStage === 3 && (
          <Recommendations
            key="recommendations"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InteractiveHero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50/30 px-4">
      <StoryProvider>
        <StoryContent />
      </StoryProvider>
    </div>
  );
}