import { DetailsToolbar } from "../shared/components/DetailsToolbar";
import { LayoutBasePage } from "../shared/layouts/LayoutBasePage";

export const Dashboard = () => {
  return (
    <LayoutBasePage
      titulo="Página inicial"
      toolbar={<DetailsToolbar showSaveAndBackButton showAddButtonLoading />}
    >
      bacana
    </LayoutBasePage>
  );
};
