import React from "react";
import { LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsToolbar } from "../../shared/components/DetailsToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import { pessoasServices } from "../../shared/services/api/pessoas/pessoasServices";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms/VTextField.tsx";

export const DetalhePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleSave = () => {
    console.log("salvar");
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
      });
    }
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
          onClickInSave={() => handleSave()}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInSaveAndBack={() => handleSave()}
        />
      }
    >
      <Form onSubmit={(dados) => console.log(dados)}>
        <VTextField name="nomeCompleto" />

        <button type="submit">submit</button>
      </Form>

      {isLoading && <LinearProgress variant="indeterminate" />}
      <div>
        <h1>detalhe pessoa</h1>
        <p>{id}</p>
      </div>
    </LayoutBasePage>
  );
};
