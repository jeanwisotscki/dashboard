import { Box, Paper, useTheme, Button, Icon, Divider } from "@mui/material";

interface IDetailsToolbarProps {
  textAddButton?: string;
  showAddButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  onClickInAdd?: () => void;
  onClickInBack?: () => void;
  onClickInDelete?: () => void;
  onClickInSave?: () => void;
  onClickInSaveAndBack?: () => void;
}

export const DetailsToolbar: React.FC<IDetailsToolbarProps> = ({
  textAddButton = "Novo",
  showAddButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,
  onClickInAdd,
  onClickInBack,
  onClickInDelete,
  onClickInSave,
  onClickInSaveAndBack,
}) => {
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
      {showSaveButton && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon>save</Icon>}
          disableElevation
          onClick={onClickInSave}
        >
          Salvar
        </Button>
      )}
      {showSaveAndBackButton && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>save</Icon>}
          disableElevation
          onClick={onClickInSaveAndBack}
        >
          Salvar e voltar
        </Button>
      )}
      {showDeleteButton && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>delete</Icon>}
          disableElevation
          onClick={onClickInDelete}
        >
          Apagar
        </Button>
      )}
      {showAddButton && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>add</Icon>}
          disableElevation
          onClick={onClickInAdd}
        >
          {textAddButton}
        </Button>
      )}
      <Divider variant="middle" orientation="vertical" />
      {showBackButton && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>arrow_back</Icon>}
          disableElevation
          onClick={onClickInBack}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
