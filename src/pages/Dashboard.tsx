import { DetailsToolbar } from "../shared/components/DetailsToolbar";
import { ListingToolbar } from "../shared/components/ListingToolbar";
import { LayoutBasePage } from "../shared/layouts/LayoutBasePage";

export const Dashboard = () => {
  return (
    <LayoutBasePage titulo="Página inicial" toolbar={<DetailsToolbar />}>
      bacana
    </LayoutBasePage>
  );
};
