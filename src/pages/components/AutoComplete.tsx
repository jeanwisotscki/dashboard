import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { cidadesServices } from "../../shared/services/api/cidades/cidadesServices";
import { useDebounce } from "../../shared/hooks/useDebounce";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

export const AutoComplete: React.FC = () => {
  const { debounce } = useDebounce();

  const [options, setOptions] = React.useState<TAutoCompleteOption[]>([]);

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      cidadesServices.getAll(1).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        setOptions(res.data);
        console.log(res);
      });
    });
  }, []);

  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label="Cidade" />}
    />
  );
};
