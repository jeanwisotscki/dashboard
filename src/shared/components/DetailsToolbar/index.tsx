import {
  Box,
  Paper,
  useTheme,
  Button,
  Icon,
  Divider,
  Skeleton,
} from "@mui/material";

interface IDetailsToolbarProps {
  textAddButton?: string;
  showAddButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showAddButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

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

  showAddButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

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
      {showSaveButton && !showSaveButtonLoading && (
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
      {showSaveButtonLoading && <Skeleton width={110} height={50} />}

      {showSaveAndBackButton && !showSaveAndBackButtonLoading && (
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
      {showSaveAndBackButtonLoading && <Skeleton width={180} height={50} />}

      {showDeleteButton && !showDeleteButtonLoading && (
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
      {showDeleteButtonLoading && <Skeleton width={110} height={50} />}

      {showAddButton && !showAddButtonLoading && (
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
      {showAddButtonLoading && <Skeleton width={110} height={50} />}

      <Divider variant="middle" orientation="vertical" />
      {showBackButton && !showBackButtonLoading && (
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
      {showBackButtonLoading && <Skeleton width={110} height={50} />}
    </Box>
  );
};
