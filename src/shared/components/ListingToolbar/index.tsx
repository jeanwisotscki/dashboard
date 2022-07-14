import React from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  useTheme,
  InputAdornment,
  Icon,
} from "@mui/material";

interface IListingToolbarProps {
  searchText?: string;
  showInputSearch?: boolean;
  whenChangeSearchText?: (newText: string) => void;
  addButtonText?: string;
  showAddButton?: boolean;
  whenClickOnButton?: () => void;
}

export const ListingToolbar: React.FC<IListingToolbarProps> = ({
  searchText = "",
  showInputSearch = false,
  whenChangeSearchText,
  addButtonText = "Novo",
  showAddButton = true,
  whenClickOnButton,
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
      {showInputSearch && (
        <TextField
          value={searchText}
          onChange={(e) => whenChangeSearchText?.(e.target.value)}
          size="small"
          placeholder="Pesquisar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box display="flex" justifyContent="end" flex={1}>
        {showAddButton && (
          <Button
            onClick={whenClickOnButton}
            variant="contained"
            color="primary"
            startIcon={<Icon>add</Icon>}
            disableElevation
          >
            {addButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
