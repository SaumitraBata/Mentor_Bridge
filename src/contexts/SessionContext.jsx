import { createContext, useContext, useState } from 'react';

const SessionContext = createContext({});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <SessionContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </SessionContext.Provider>
  );
};
