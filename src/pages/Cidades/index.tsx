import React from "react";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListingToolbar } from "../../shared/components/ListingToolbar";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import {
  IListagemCidade,
  cidadesServices,
} from "../../shared/services/api/cidades/cidadesServices";
import { Environment } from "../../shared/environment";

export const Cidades: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000, true);

  const [rows, setRows] = React.useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar o registro?")) {
      cidadesServices.deleteById(id).then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);

        return alert("Registro apagado com sucesso!");
      });
    }
  };

  const busca = React.useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = React.useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      cidadesServices.getAll(pagina, busca).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
          return;
        }

        setRows(res.data);
        setTotalCount(res.totalCount);
        console.log(res);
      });
    });
  }, [busca, pagina]);

  return (
    <LayoutBasePage
      titulo="Listagem de cidades"
      toolbar={
        <ListingToolbar
          addButtonText="Nova"
          showInputSearch
          searchText={busca}
          onChangeSearchText={(text) =>
            setSearchParams({ busca: text, pagina: "1" }, { replace: true })
          }
          onClickAddButton={() => navigate("/cidades/detalhe/nova")}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.id)} size="small">
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                    size="small"
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && <caption>{Environment.LISTAGEM_VAZIA}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(e, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: false }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
