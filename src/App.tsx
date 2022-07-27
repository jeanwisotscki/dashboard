import { BrowserRouter } from "react-router-dom";

import "./shared/forms/helpers/traducoesYup";

import { AppRoutes } from "./routes";
import { Sidebar } from "./shared/components/Sidebar";
import { DrawerProvider } from "./shared/contexts/DrawerContext";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
