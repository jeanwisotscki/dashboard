import React from "react";
import { authService } from "../services/api/auth/authServices";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

const AuthContext = React.createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = React.useState<string>();

  const handleLogin = React.useCallback(
    async (email: string, password: string) => {
      const result = await authService.auth(email, password);

      if (result instanceof Error) return result.message;

      localStorage.setItem(
        LOCAL_STORAGE_KEY__ACCESS_TOKEN,
        JSON.stringify(result.accessToken)
      );
      setAccessToken(result.accessToken);
    },
    []
  );

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = React.useMemo(() => !!accessToken, [accessToken]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) return setAccessToken(JSON.parse(accessToken));

    setAccessToken(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
