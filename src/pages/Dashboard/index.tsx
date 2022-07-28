import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ListingToolbar } from "../../shared/components/ListingToolbar";
import { LayoutBasePage } from "../../shared/layouts/LayoutBasePage";
import { cidadesServices } from "../../shared/services/api/cidades/cidadesServices";
import { pessoasServices } from "../../shared/services/api/pessoas/pessoasServices";

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = React.useState(true);
  const [totalCountCidades, setTotalCountCidades] = React.useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = React.useState(0);
  const [isLoadingPessoas, setIsLoadingPessoas] = React.useState(true);

  React.useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    cidadesServices.getAll(1).then((res) => {
      setIsLoadingCidades(false);

      if (res instanceof Error) {
        alert(res.message);
        return;
      }
      setTotalCountCidades(res.totalCount);
    });

    pessoasServices.getAll(1).then((res) => {
      setIsLoadingPessoas(false);

      if (res instanceof Error) {
        alert(res.message);
        return;
      }
      setTotalCountPessoas(res.totalCount);
    });
  }, []);

  return (
    <LayoutBasePage
      titulo="Página inicial"
      toolbar={<ListingToolbar showAddButton={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>

                  <Box padding={6}>
                    {!isLoadingPessoas && (
                      <Typography variant="h1" align="center">
                        {totalCountPessoas}
                      </Typography>
                    )}

                    {isLoadingPessoas && (
                      <Typography variant="h5" align="center">
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>

                  <Box padding={6}>
                    {!isLoadingCidades && (
                      <Typography variant="h1" align="center">
                        {totalCountCidades}
                      </Typography>
                    )}

                    {isLoadingCidades && (
                      <Typography variant="h5" align="center">
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
