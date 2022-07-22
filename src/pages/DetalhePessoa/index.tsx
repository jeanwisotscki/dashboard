import { useNavigate, useParams } from "react-router-dom";
import { DetailsToolbar } from "../../shared/components/DetailsToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";

export const DetalhePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("salvar");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <LayoutBasePage
      titulo="Adicionar registro"
      toolbar={
        <DetailsToolbar
          textAddButton="Nova"
          showSaveAndBackButton
          showAddButton={id !== "nova"}
          showDeleteButton={id !== "nova"}
          onClickInAdd={() => navigate("/pessoas/detalhes/nova")}
          onClickInBack={() => navigate("/pessoas/detalhes")}
          onClickInSave={() => handleSave}
          onClickInDelete={() => handleDelete}
          onClickInSaveAndBack={() => handleSave}
        />
      }
    >
      <h1>detalhe pessoa {id}</h1>
    </LayoutBasePage>
  );
};
