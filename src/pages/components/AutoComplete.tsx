import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { cidadesServices } from "../../shared/services/api/cidades/cidadesServices";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoComplete: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const { debounce } = useDebounce();
  const { fieldName, error, clearError, defaultValue, registerField } =
    useField("cidadeId");

  const [selectedId, setSelectedId] = React.useState<number | undefined>(
    defaultValue
  );
  const [options, setOptions] = React.useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [busca, setBusca] = React.useState("");

  const autoCompleteSelectedOption = React.useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find((option) => option.id === selectedId);

    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      cidadesServices.getAll(1, busca).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        setOptions(
          res.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
        );
        console.log(res);
      });
    });
  }, [busca]);

  return (
    <Autocomplete
      disablePortal
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      value={autoCompleteSelectedOption}
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
        clearError();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
