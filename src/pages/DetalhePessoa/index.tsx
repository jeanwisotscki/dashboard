import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { DetailsToolbar } from "../../shared/components/DetailsToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import { pessoasServices } from "../../shared/services/api/pessoas/pessoasServices";
import { VTextField } from "../../shared/forms/VTextField.tsx";
import { VForm } from "../../shared/forms/VForm";
import { useVForm } from "../../shared/forms/hooks/useVForm";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalhePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    if (id === "nova") {
      pessoasServices.create(data).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        if (isSaveAndBack()) {
          alert("Registro criado com sucesso!");
          navigate("/pessoas");
          return;
        }

        alert("Registro criado com sucesso!");
        navigate(`/pessoas/detalhe/${res}`);
      });

      return;
    }

    pessoasServices
      .updateById(Number(id), { id: Number(id), ...data })
      .then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        if (isSaveAndBack()) {
          alert("Registro salvo com sucesso!");
          navigate("/pessoas");
          return;
        }

        alert("Registro salvo com sucesso!");
      });

    return;
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar o registro?")) {
      pessoasServices.deleteById(id).then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        alert("Registro apagado com sucesso!");
        navigate("/pessoas");
      });
    }
  };

  React.useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      pessoasServices.getById(Number(id)).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          navigate("/pessoas");
          return;
        }

        setName(res.nomeCompleto);
        formRef.current?.setData(res);
      });

      return;
    }

    formRef.current?.setData({
      email: "",
      cidadeId: "",
      nomeCompleto: "",
    });
  }, [id]);

  return (
    <LayoutBasePage
      titulo={id === "nova" ? "Adicionar registro" : name.toUpperCase()}
      toolbar={
        <DetailsToolbar
          textAddButton="Nova"
          showSaveAndBackButton
          showAddButton={id !== "nova"}
          showDeleteButton={id !== "nova"}
          onClickInAdd={() => navigate("/pessoas/detalhe/nova")}
          onClickInBack={() => navigate("/pessoas")}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInSave={save}
          onClickInSaveAndBack={saveAndBack}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          display="flex"
          flexDirection="column"
          margin={1}
          variant="outlined"
          component={Paper}
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Detalhes</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="Nome"
                  name="nomeCompleto"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="Email"
                  name="email"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="Cidade"
                  name="cidadeId"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
