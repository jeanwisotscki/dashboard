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
import { Environment } from "../../environment";

interface IListingToolbarProps {
  searchText?: string;
  showInputSearch?: boolean;
  onChangeSearchText?: (newText: string) => void;
  addButtonText?: string;
  showAddButton?: boolean;
  onClickAddButton?: () => void;
}

export const ListingToolbar: React.FC<IListingToolbarProps> = ({
  searchText = "",
  showInputSearch = false,
  onChangeSearchText,
  addButtonText = "Novo",
  showAddButton = true,
  onClickAddButton,
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
          onChange={(e) => onChangeSearchText?.(e.target.value)}
          size="small"
          placeholder={Environment.PLACEHOLDER_INP_DE_BUSCA}
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
            onClick={onClickAddButton}
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
