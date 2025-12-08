// create a globalContext for the app
import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API_URL = "http://localhost:4000/api";
  const DIR_URL = "http://localhost:4000"

  return (
    <AppContext.Provider value={{ 
        user, setUser,
        API_URL, DIR_URL,
         }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;