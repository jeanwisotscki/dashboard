import { Box } from "@mui/system";
import React from "react";

interface ILayoutBasePageProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
  titulo,
}) => {
  return (
    <Box>
      <h1>{titulo}</h1>
      {children}{" "}
    </Box>
  );
};
