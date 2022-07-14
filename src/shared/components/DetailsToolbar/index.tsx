import { Box, Paper, useTheme, Button, Icon, Divider } from "@mui/material";

export const DetailsToolbar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(7)}
      display="flex"
      alignItems="center"
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon>save</Icon>}
        disableElevation
      >
        Salvar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>save</Icon>}
        disableElevation
      >
        Salvar e voltar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>delete</Icon>}
        disableElevation
      >
        Apagar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>add</Icon>}
        disableElevation
      >
        Novo
      </Button>
      <Divider variant="middle" orientation="vertical" />
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>arrow_back</Icon>}
        disableElevation
      >
        Voltar
      </Button>
    </Box>
  );
};
