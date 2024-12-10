import { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectDetails {
  type: string;
  budget?: string;
  timeline?: string;
  description?: string;
  features: string[];
}

interface StoryContextType {
  userName: string;
  setUserName: (name: string) => void;
  userInterest: string;
  setUserInterest: (interest: string) => void;
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
  storyStage: number;
  setStoryStage: (stage: number) => void;
  direction: number;
  setDirection: (direction: number) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('');
  const [userInterest, setUserInterest] = useState('');
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    type: '',
    features: [],
  });
  const [storyStage, setStoryStage] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleStageChange = (newStage: number) => {
    setDirection(newStage > storyStage ? 1 : -1);
    setStoryStage(newStage);
  };

  return (
    <StoryContext.Provider value={{
      userName,
      setUserName,
      userInterest,
      setUserInterest,
      projectDetails,
      setProjectDetails,
      storyStage,
      setStoryStage: handleStageChange,
      direction,
      setDirection,
    }}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
}