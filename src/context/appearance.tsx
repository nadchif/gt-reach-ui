import React, { createContext, useState, useContext, ReactNode } from 'react';

type TAppearanceMode = 'light' | 'dark' | 'inherit';

type TAppearanceContextType = {
  appearance: TAppearanceMode;
  applyAppearance: (mode: TAppearanceMode) => void;
};

const AppearanceContext = createContext<TAppearanceContextType | undefined>(undefined);

interface AppearanceProviderProps {
  children: ReactNode;
}

const getLocalStorageAppearance = (): TAppearanceMode => {
  const savedAppearance = localStorage.getItem('appearance');
  if (savedAppearance === 'light' || savedAppearance === 'dark' || savedAppearance === 'inherit') {
    return savedAppearance;
  }
  return 'light';
};

export const AppearanceProvider: React.FC<AppearanceProviderProps> = ({ children }) => {
  // Retrieve the stored appearance from localStorage or default to light
  const savedAppearance = getLocalStorageAppearance();
  const [appearance, setAppearance] = useState(savedAppearance);

  const applyAppearance = (appearance: TAppearanceMode) => {
    setAppearance(appearance);
    localStorage.setItem('appearance', appearance); // Save the appearance to localStorage
  };

  return <AppearanceContext.Provider value={{ appearance, applyAppearance }}>{children}</AppearanceContext.Provider>;
};

export const useAppearance = (): TAppearanceContextType => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used within a AppearanceProvider');
  }
  return context;
};
