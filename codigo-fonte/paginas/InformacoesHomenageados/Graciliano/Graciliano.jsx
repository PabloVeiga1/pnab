import React from "react";
import { FaArrowLeft, FaLock,FaCheck } from "react-icons/fa";
import "./Graciliano.css";
import "../PerfilHomenageado.css";
import { useNavigate } from 'react-router-dom';
import { useMonumentos } from "../../../dados/usarMonumentos.js";
import fotoGraciliano from "../../../../identidade_visual/perfis/tipo-2-graciliano.png";
import bannerGraciliano from "../../../../identidade_visual/banners/banner_graciliano.png";
import MenuPerfil from "../MenuPerfil.jsx";

export default function GracilianoPage() {

  const { monumentos } = useMonumentos();
  const graci = monumentos.find(el => el.nome === "Graciliano Ramos")
  const navigate = useNavigate();

  function irRotas() {
    navigate("/rotasordenadas");
  }

  return (
    <div className="container-statue pagina-graciliano">
      <div className="profile-hero" style={{ "--profile-banner": `url(${bannerGraciliano})` }}>
        <header className="header-statue">
          <button className="btn-back" onClick={irRotas}>
            <FaArrowLeft size={16}/>
          </button>
          <div className="badge-status" aria-label={`Status: ${graci.status}`}>
            <span aria-hidden="true">{graci.status === "encontrado"? <FaCheck/>: <FaLock/>}{graci.status}</span>
          </div>
        </header>

        <section className="profile-section">
          <div className="avatar-placeholder">
            <div className="avatar-recorte">
              <img src={fotoGraciliano} alt="Retrato de Graciliano Ramos" />
            </div>
          </div>
          <div className="profile-info">
            <h2>{graci.nome}</h2>
            <p>Escritor</p>
          </div>
        </section>
      </div>

      <MenuPerfil perfil="graci" />
      <main className="content-area">
        <p className="biografia-resumo">
          O escritor alagoano que transformou a experiência humana e a
          realidade do Nordeste em uma das obras mais importantes da literatura brasileira.
        </p>
        <article className="biografia-content">
          <h1>Biografia</h1>
          <div className="biografia-texto">
            <p>
              Graciliano Ramos foi um dos maiores escritores da literatura brasileira. Nasceu em 27 de
              outubro de 1892, em Quebrangulo, Alagoas, e morreu em 30 de março de 1953, no Rio
              de Janeiro. Sua obra é marcada pela linguagem precisa, pela observação da realidade
              social e pela atenção à vida de pessoas comuns, especialmente do Nordeste brasileiro.
              Filho de Sebastião Ramos de Oliveira e Maria Amélia Ferro Ramos, Graciliano foi o
              primeiro de muitos ﬁlhos. Passou parte da infância em diferentes cidades do interior de
              Alagoas e de Pernambuco, experiências que contribuíram para sua relação com a
              paisagem e com a vida sertaneja que mais tarde apareceriam em sua literatura.
            </p>
            <p>
              Ainda jovem, interessou-se pela leitura e pela escrita. Em 1910, mudou-se para Palmeira
              dos Índios, em Alagoas, onde viveu por alguns anos. Depois, foi para o Rio de Janeiro, onde
              trabalhou como revisor nos jornais Correio da Manhã, A Tarde e O Século, entre 1914 e
              1915.
            </p>
            <p>
              Em 1915, retornou a Alagoas após a morte de familiares e passou a se dedicar a atividades
              comerciais e à vida pública. Em 1927, foi eleito prefeito de Palmeira dos Índios. Durante
              seu mandato, destacou-se pela forma rigorosa como administrava os recursos públicos.
              Seus relatórios administrativos chamaram a atenção de pessoas ligadas ao meio literário
              e contribuíram para que seu talento como escritor fosse reconhecido.
            </p>
            <p>
              Depois de deixar a prefeitura, Graciliano passou a trabalhar como diretor da Imprensa
              Oﬁcial de Alagoas e, posteriormente, como diretor da Instrução Pública de Alagoas. Foi
              nesse período que começou a escrever seu primeiro romance, Caetés, publicado em 1933.
              Depois vieram São Bernardo, em 1934, e Angústia, em 1936. Nessas obras, Graciliano
              desenvolveu uma literatura marcada pela análise psicológica dos personagens, pela crítica
              social e por uma linguagem econômica e precisa.
            </p>
            <p>
              Em 1936, foi preso durante o governo de Getúlio Vargas, acusado de envolvimento com
              atividades políticas. Permaneceu preso por vários meses, sem ter sido formalmente
              condenado. A experiência da prisão seria posteriormente narrada em Memórias do
              Cárcere, publicado após sua morte.
            </p>
            <p>
              A experiência vivida na prisão também aparece como uma importante parte de sua
              trajetória intelectual. Em Memórias do Cárcere, Graciliano não apresenta apenas suas
              próprias lembranças, mas registra as condições enfrentadas por diferentes presos e reﬂete
              sobre autoritarismo, injustiça, violência e dignidade humana.
            </p>
            <p>
              Em 1938, publicou Vidas Secas, seu romance mais conhecido e uma das obras
              fundamentais da literatura brasileira. O livro acompanha a trajetória de uma família de
              retirantes que atravessa o sertão em busca de melhores condições de vida. Fabiano, Sinhá
              Vitória, os dois ﬁlhos e a cadela Baleia tornaram-se personagens marcantes da literatura
              brasileira.
            </p>
            <p>
              Em Vidas Secas, a seca não aparece apenas como um fenômeno natural. Ela está
              relacionada à pobreza, à desigualdade e às diﬁculdades enfrentadas pelas populações
              sertanejas. A obra apresenta, com uma linguagem enxuta e forte, a luta de uma família pela
              sobrevivência e por uma vida mais digna.
            </p>
            <p>
              Graciliano também escreveu Infância, livro de memórias publicado em 1945, e Insônia,
              reunião de contos publicada em 1947. Sua produção literária, embora não seja extensa,
              possui grande importância pela qualidade da escrita e pela profundidade com que trata
              seus personagens e a realidade brasileira.
            </p>
            <p>
              Seu estilo é conhecido pela economia de palavras. Graciliano escrevia de maneira direta,
              evitando excessos e escolhendo cuidadosamente cada termo. Sua literatura mostra que
              uma linguagem simples pode produzir textos de grande força estética e social.
            </p>
            <p>
              O escritor também teve atuação política. Em 1945, ﬁliou-se ao Partido Comunista
              Brasileiro e participou da vida intelectual e política do país. Viajou para a União Soviética
              e outros países do bloco socialista, experiência que registrou posteriormente em textos
              publicados.
            </p>
            <p>
              Conhecido carinhosamente como “Mestre Graça”, Graciliano Ramos morreu em 30 de
              março de 1953, no Rio de Janeiro, aos 60 anos. Deixou uma obra que ultrapassou as
              fronteiras de Alagoas e do Brasil e se tornou referência da literatura brasileira.
            </p>
            <p>
              Sua relação com Alagoas, porém, permanece especialmente forte. Quebrangulo,
              Palmeira dos Índios e outras paisagens alagoanas fazem parte da memória e da
              experiência que atravessam sua obra. Por meio de seus livros, Graciliano levou para
              diferentes lugares do mundo personagens, paisagens e questões sociais que conheceu de
              perto.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
