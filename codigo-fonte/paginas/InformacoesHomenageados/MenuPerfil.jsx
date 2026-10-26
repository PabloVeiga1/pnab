
import { Link, useLocation } from "react-router-dom";
import { FiCamera, FiMoreVertical, FiSearch, FiUser } from "react-icons/fi";
import "./MenuPerfil.css";

const opcoes = [
  { id: "biografia", nome: "Biografia", Icone: FiSearch },
  { id: "midias", nome: "Mídias", Icone: FiCamera },
  { id: "detalhes", nome: "Detalhes", Icone: FiMoreVertical },
  { id: "sobre", nome: "Sobre", Icone: FiUser },
];

export default function MenuPerfil({ perfil }) {
  const { pathname } = useLocation();
  const secaoAtiva = pathname.split("/").at(-1);
  const perfilNaPaginaInicial = pathname === `/rotasordenadas/${perfil}`;

  return (
    <nav className="menu-perfil" aria-label="Conteúdo do homenageado">
      {opcoes.map(({ id, nome, Icone }) => {
        const ativa =
          secaoAtiva === id ||
          (id === "biografia" && perfilNaPaginaInicial);

        const destino =
          id === "biografia"
            ? `/rotasordenadas/${perfil}`
            : `/rotasordenadas/${perfil}/${id}`;

        return (
          <Link
            key={id}
            className={`menu-perfil-opcao ${ativa ? "ativa" : ""}`}
            to={destino}
            aria-current={ativa ? "page" : undefined}
          >
            <Icone aria-hidden="true" />
            <span>{nome}</span>
          </Link>
        );
      })}
    </nav>
  );
}
