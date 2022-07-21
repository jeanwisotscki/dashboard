import React from "react";
import {
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
import { useSearchParams } from "react-router-dom";
import { ListingToolbar } from "../../shared/components/ListingToolbar";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import {
  IListagemPessoa,
  pessoasServices,
} from "../../shared/services/api/pessoas/pessoasServices";
import { Environment } from "../../shared/environment";

export const Pessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000, true);

  const [rows, setRows] = React.useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const busca = React.useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = React.useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      pessoasServices.getAll(pagina, busca).then((res) => {
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
      titulo="Listagem de pessoas"
      toolbar={
        <ListingToolbar
          addButtonText="Nova"
          showInputSearch
          searchText={busca}
          onChangeSearchText={(text) =>
            setSearchParams({ busca: text, pagina: "1" }, { replace: true })
          }
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
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
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
