import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Pessoas } from "../pages/Pessoas";
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
        path: "/pessoas",
        icon: "person",
        label: "Pessoas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pessoas" element={<Pessoas />} />
      <Route
        path="/pessoas/detalhe/:id"
        element={<h1>pessoa com id edição</h1>}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
