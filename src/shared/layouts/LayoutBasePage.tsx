import React from "react";
import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts/DrawerContext";

interface ILayoutBasePageProps {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  titulo: string;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
  toolbar,
  titulo,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        padding={1}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {titulo}
        </Typography>
      </Box>
      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow="auto">
        <h1>{children}</h1>
      </Box>
    </Box>
  );
};
