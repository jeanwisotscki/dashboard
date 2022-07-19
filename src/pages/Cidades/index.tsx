import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingToolbar } from "../../shared/components/ListingToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";

export const Cidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  return (
    <LayoutBasePage
      titulo="Listagem de cidades"
      toolbar={
        <ListingToolbar
          addButtonText="Nova"
          showInputSearch
          searchText={busca}
          onChangeSearchText={(text) =>
            setSearchParams({ busca: text }, { replace: true })
          }
        />
      }
    >
      topz3ra
    </LayoutBasePage>
  );
};
