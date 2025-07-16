import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { storage, StorageKeys } from '../utils/storage';

export interface FunnelAnswers {
  gender?: string;
  ageGroup?: string;
  dailyHairConfidence?: number;
  commonHairHurdles?: string[];
  stylingFrustrations?: string;
  badHairDayTriggers?: string[];
  barberSalonRegrets?: string;
  productOverwhelm?: number;
  lifestyleHairClashes?: string;
  emotionalHairImpact?: string[];
  hairGoalsDreaming?: string[];
  pastAttempts?: string;
  readinessForChange?: number;
  unlockCustomFix?: string;
  hairScanImage?: string;
  topViewImage?: string;
  sideViewImage?: string;
  backViewImage?: string;
  frontViewImage?: string;
  faceShapeImage?: string;
}

interface FunnelContextType {
  answers: FunnelAnswers;
  updateAnswer: (key: keyof FunnelAnswers, value: any) => void;
  resetAnswers: () => void;
  saveAnswers: () => Promise<void>;
  loadAnswers: () => Promise<void>;
  getProgress: () => number;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};

interface FunnelProviderProps {
  children: ReactNode;
}

const initialAnswers: FunnelAnswers = {};

export const FunnelProvider: React.FC<FunnelProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<FunnelAnswers>(initialAnswers);

  const updateAnswer = (key: keyof FunnelAnswers, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetAnswers = () => {
    setAnswers(initialAnswers);
  };

  const saveAnswers = async () => {
    try {
      await storage.setObject(StorageKeys.FUNNEL_ANSWERS, answers);
    } catch (error) {
      console.error('Error saving funnel answers:', error);
    }
  };

  const loadAnswers = async () => {
    try {
      const savedAnswers = await storage.getObject(StorageKeys.FUNNEL_ANSWERS);
      if (savedAnswers) {
        setAnswers(savedAnswers);
      }
    } catch (error) {
      console.error('Error loading funnel answers:', error);
    }
  };

  const getProgress = (): number => {
    const totalQuestions = Object.keys(initialAnswers).filter(k => k !== 'hairScanImage').length;
    const answeredQuestions = Object.keys(answers).filter(key => 
      key !== 'hairScanImage' && answers[key as keyof FunnelAnswers] !== undefined
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  useEffect(() => {
    loadAnswers();
  }, []);

  useEffect(() => {
    saveAnswers();
  }, [answers]);

  const value: FunnelContextType = {
    answers,
    updateAnswer,
    resetAnswers,
    saveAnswers,
    loadAnswers,
    getProgress,
  };

  return (
    <FunnelContext.Provider value={value}>
      {children}
    </FunnelContext.Provider>
  );
};