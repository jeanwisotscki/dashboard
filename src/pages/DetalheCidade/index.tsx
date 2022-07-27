import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";

import { DetailsToolbar } from "../../shared/components/DetailsToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import { cidadesServices } from "../../shared/services/api/cidades/cidadesServices";
import { VTextField } from "../../shared/forms/VTextField.tsx";
import { VForm } from "../../shared/forms/VForm";
import { useVForm } from "../../shared/forms/hooks/useVForm";
import { IVFormErrors } from "../../shared/forms/helpers/IVFormErrors";

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheCidade: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);

        if (id === "nova") {
          cidadesServices.create(validatedData).then((res) => {
            setIsLoading(false);

            if (res instanceof Error) {
              alert(res.message);
              return;
            }

            if (isSaveAndBack()) {
              alert("Registro criado com sucesso!");
              navigate("/cidades");
              return;
            }

            alert("Registro criado com sucesso!");
            navigate(`/cidades/detalhe/${res}`);
          });

          return;
        }

        cidadesServices
          .updateById(Number(id), { id: Number(id), ...validatedData })
          .then((res) => {
            setIsLoading(false);

            if (res instanceof Error) {
              alert(res.message);
              return;
            }

            if (isSaveAndBack()) {
              alert("Registro salvo com sucesso!");
              navigate("/cidades");
              return;
            }

            alert("Registro salvo com sucesso!");
          });

        return;
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar o registro?")) {
      cidadesServices.deleteById(id).then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        alert("Registro apagado com sucesso!");
        navigate("/cidades");
      });
    }
  };

  React.useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      cidadesServices.getById(Number(id)).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          navigate("/cidades");
          return;
        }

        setName(res.nome);
        formRef.current?.setData(res);
      });

      return;
    }

    formRef.current?.setData({
      nome: "",
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
          onClickInAdd={() => navigate("/cidades/detalhe/nova")}
          onClickInBack={() => navigate("/cidades")}
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
                  name="nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
