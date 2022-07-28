import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "../../contexts/AuthContext";

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={350}>
            <Typography variant="h6" align="center">
              Identifique-se
            </Typography>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button variant="contained" onClick={() => login("", "")}>
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
