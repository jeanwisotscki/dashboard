import {
  Box,
  Paper,
  useTheme,
  Button,
  Icon,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
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
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      height={theme.spacing(7)}
      display="flex"
      alignItems="center"
      justifyContent={!smDown && !mdDown ? "initial" : "space-around"}
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
          startIcon={smDown ? null : <Icon>save</Icon>}
          disableElevation
          onClick={onClickInSave}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {showSaveButtonLoading && <Skeleton width={110} height={50} />}

      {showSaveAndBackButton &&
        !showSaveAndBackButtonLoading &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Icon>save</Icon>}
            disableElevation
            onClick={onClickInSaveAndBack}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e voltar
            </Typography>
          </Button>
        )}
      {showSaveAndBackButtonLoading && !smDown && !mdDown && (
        <Skeleton width={180} height={50} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={smDown ? null : <Icon>delete</Icon>}
          disableElevation
          onClick={onClickInDelete}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && <Skeleton width={110} height={50} />}

      {showAddButton && !showAddButtonLoading && !smDown && !mdDown && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>add</Icon>}
          disableElevation
          onClick={onClickInAdd}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textAddButton}
          </Typography>
        </Button>
      )}
      {showAddButtonLoading && !smDown && !mdDown && (
        <Skeleton width={110} height={50} />
      )}

      {!smDown && !mdDown && (
        <Divider variant="middle" orientation="vertical" />
      )}
      {showBackButton && !showBackButtonLoading && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Icon>arrow_back</Icon>}
          disableElevation
          onClick={onClickInBack}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showBackButtonLoading && <Skeleton width={110} height={50} />}
    </Box>
  );
};
