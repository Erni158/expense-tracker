import React, { useContext, useEffect, useState } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = React.createContext<AuthContextType>({
  isAuthenticated: true,
  setIsAuthenticated: (): void => undefined,
});

const useAuthContext = (): AuthContextType => {
  const context = useContext(Context);

  if (context === undefined) throw new Error("ProfileContext has no context");
  return context;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </Context.Provider>
  );
};

export { AuthProvider, useAuthContext };