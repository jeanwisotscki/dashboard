import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsToolbar } from "../../shared/components/DetailsToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import { pessoasServices } from "../../shared/services/api/pessoas/pessoasServices";
import { VTextField } from "../../shared/forms/VTextField.tsx";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalhePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = React.useRef<FormHandles>(null);

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

        alert("Registro editado com sucesso!");
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
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInSave={() => formRef.current?.submitForm()}
          onClickInSaveAndBack={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade ID" name="cidadeId" />
      </Form>
    </LayoutBasePage>
  );
};
