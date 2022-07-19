import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Cidades } from "../pages/Cidades";
import { Dashboard } from "../pages/Dashboard";
import { useDrawerContext } from "../shared/contexts/DrawerContext";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        path: "/",
        icon: "home",
        label: "Página inicial",
      },
      {
        path: "/cidades",
        icon: "location_city",
        label: "Cidades",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cidades" element={<Cidades />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
