import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { LightTheme, DarkTheme } from "../themes";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = React.createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return React.useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = React.useState<"light" | "dark">("dark");
  const toggleTheme = React.useCallback(() => {
    setThemeName((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
  }, []);
  const theme = React.useMemo(() => {
    if (themeName === "light") return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
