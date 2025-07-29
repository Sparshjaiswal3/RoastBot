import React, { createContext, useContext, useState } from 'react';

export type SavedRoast = {
  roast: string;
  name: string;
  interests: string;
};

const SavedRoastsContext = createContext<{
  savedRoasts: SavedRoast[];
  addRoast: (roast: string, name: string, interests: string) => void;
  removeRoast: (index: number) => void;
}>({
  savedRoasts: [],
  addRoast: () => {},
  removeRoast: () => {},
});

export const SavedRoastsProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedRoasts, setSavedRoasts] = useState<SavedRoast[]>([]);

  const addRoast = (roast: string, name: string, interests: string) =>
    setSavedRoasts(prev => [...prev, { roast, name, interests }]);
  const removeRoast = (index: number) =>
    setSavedRoasts(current => current.filter((_, i) => i !== index));

  return (
    <SavedRoastsContext.Provider value={{ savedRoasts, addRoast, removeRoast }}>
      {children}
    </SavedRoastsContext.Provider>
  );
};

export const useSavedRoasts = () => useContext(SavedRoastsContext);