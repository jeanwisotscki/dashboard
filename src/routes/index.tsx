import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { useDrawerContext } from "../shared/contexts/DrawerContext";
import { Pessoas } from "../pages/Pessoas";
import { DetalhePessoa } from "../pages/DetalhePessoa";
import { Cidades } from "../pages/Cidades";
import { DetalheCidade } from "../pages/DetalheCidade";

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
      <Route path="/pessoas" element={<Pessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoa />} />
      <Route path="/cidades" element={<Cidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheCidade />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
