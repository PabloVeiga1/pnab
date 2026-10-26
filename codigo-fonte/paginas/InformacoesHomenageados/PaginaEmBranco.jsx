import { Navigate, useParams } from "react-router-dom";
import ApenasEncontrado from "../../componentes/ApenasEncontrado.jsx";
import AurelioPage from "./Aurelio/Aurelio.jsx";
import GracilianoPage from "./Graciliano/Graciliano.jsx";
import JorgePage from "./Jorge/Jorge.jsx";
import LedoPage from "./Ledo/Ledo.jsx";
import NisePage from "./Nise/Nise.jsx";
import PauloPage from "./Paulo/Paulo.jsx";

const perfis = {
  aurelio: { monumentoId: 2, Pagina: AurelioPage },
  graci: { monumentoId: 1, Pagina: GracilianoPage },
  jorge: { monumentoId: 3, Pagina: JorgePage },
  ledo: { monumentoId: 6, Pagina: LedoPage },
  nise: { monumentoId: 5, Pagina: NisePage },
  paulo: { monumentoId: 4, Pagina: PauloPage },
};

export default function PaginaEmBranco() {
  const { perfil } = useParams();
  const config = perfis[perfil];

  if (!config) {
    return <Navigate to="/rotasordenadas" replace />;
  }

  const { monumentoId, Pagina } = config;

  return (
    <ApenasEncontrado monumentoId={monumentoId}>
      <Pagina />
    </ApenasEncontrado>
  );
}
