import { BrowserRouter } from "react-router-dom";

import "./shared/forms/helpers/traducoesYup";

import { AppRoutes } from "./routes";
import { Sidebar } from "./shared/components/Sidebar";
import { DrawerProvider } from "./shared/contexts/DrawerContext";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { Login } from "./shared/components/Login";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
