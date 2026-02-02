import React, { createContext } from 'react';

interface AppAuthContextType {
  sessionReady: boolean;
}

export const AppAuthContext = createContext<AppAuthContextType>({ sessionReady: true });

export const AppAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppAuthContext.Provider value={{ sessionReady: true }}>
      {children}
    </AppAuthContext.Provider>
  );
};
