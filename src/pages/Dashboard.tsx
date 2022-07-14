import { Toolbar } from "../shared/components/Toolbar";
import { LayoutBasePage } from "../shared/layouts/LayoutBasePage";

export const Dashboard = () => {
  return (
    <LayoutBasePage
      titulo="Página inicial"
      toolbar={<Toolbar showInputSearch />}
    >
      bacana
    </LayoutBasePage>
  );
};
