import micImage from '../../componentes/FluxoDeBoasVindas/IconesDeAvatar/microfone.png';
import cactusImage from '../../componentes/FluxoDeBoasVindas/IconesDeAvatar/mandacaru.png';
import writerImage from '../../componentes/FluxoDeBoasVindas/IconesDeAvatar/lampião.png';
import crabImage from '../../componentes/FluxoDeBoasVindas/IconesDeAvatar/caran.png';
import owlImage from '../../componentes/FluxoDeBoasVindas/IconesDeAvatar/coruja.png';
import jaguarImage from '../../componentes/FluxoDeBoasVindas/IconesDeAvatar/gato.png';

export const CHAVE_STORAGE_DESAFIOS = 'caminho_bronze_desafios_concluidos';

export const dadosDesafios = {
  paulo: {
    perfilSlug: 'paulo',
    recompensa: {
      titulo: 'Voz da Dramaturgia',
      icone: micImage,
      descricao: 'Recompensa ao concluir',
      conquista: 'Você conquistou a insígnia de Voz da Dramaturgia por dominar a história de Paulo Gracindo!',
    },
    perguntas: [
      {
        id: 1,
        enunciado: 'Qual era o nome de nascimento de Paulo Gracindo?',
        opcoes: [
          { letra: 'A', texto: 'Odorico Guimarães Brandão Gracindo' },
          { letra: 'B', texto: 'Pelópidas Guimarães Brandão Gracindo' },
          { letra: 'C', texto: 'Demócrito Guimarães Brandão Gracindo' },
          { letra: 'D', texto: 'Procópio Guimarães Brandão Gracindo' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 2,
        enunciado: 'Qual personagem tornou Paulo Gracindo mais conhecido na televisão?',
        opcoes: [
          { letra: 'A', texto: 'Odorico Paraguassu, em O Bem-Amado' },
          { letra: 'B', texto: 'Fabiano, em Vidas Secas' },
          { letra: 'C', texto: 'Brandão Filho, em Balança Mas Não Cai' },
          { letra: 'D', texto: 'Salomão, em Salomão e as Mulheres' },
        ],
        respostaCorreta: 'A',
      },
      {
        id: 3,
        enunciado: 'Em que cidade fictícia vivia Odorico Paraguassu?',
        opcoes: [
          { letra: 'A', texto: 'Palmeira dos Índios' },
          { letra: 'B', texto: 'Passo de Camaragibe' },
          { letra: 'C', texto: 'Sucupira' },
          { letra: 'D', texto: 'Quebrangulo' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 4,
        enunciado: 'Em que programa de rádio Paulo Gracindo fez sucesso ao lado de Brandão Filho?',
        opcoes: [
          { letra: 'A', texto: 'Balança Mas Não Cai' },
          { letra: 'B', texto: 'A Falecida' },
          { letra: 'C', texto: 'Terra em Transe' },
          { letra: 'D', texto: 'O Bem-Amado' },
        ],
        respostaCorreta: 'A',
      },
    ],
  },
  nise: {
    perfilSlug: 'nise',
    recompensa: {
      titulo: 'Pioneira do Inconsciente',
      icone: jaguarImage,
      descricao: 'Recompensa ao concluir',
      conquista: 'Você conquistou a insígnia da Pioneira do Inconsciente por honrar o legado revolucionário de Nise da Silveira!',
    },
    perguntas: [
      {
        id: 1,
        enunciado: 'Em que cidade Nise da Silveira nasceu?',
        opcoes: [
          { letra: 'A', texto: 'Maceió, Alagoas' },
          { letra: 'B', texto: 'Salvador, Bahia' },
          { letra: 'C', texto: 'Rio de Janeiro' },
          { letra: 'D', texto: 'Recife, Pernambuco' },
        ],
        respostaCorreta: 'A',
      },
      {
        id: 2,
        enunciado: 'Em que ano Nise da Silveira criou a Seção de Terapêutica Ocupacional?',
        opcoes: [
          { letra: 'A', texto: '1936' },
          { letra: 'B', texto: '1944' },
          { letra: 'C', texto: '1946' },
          { letra: 'D', texto: '1952' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 3,
        enunciado: 'Qual espaço Nise da Silveira criou em 1952?',
        opcoes: [
          { letra: 'A', texto: 'Casa das Palmeiras' },
          { letra: 'B', texto: 'Museu de Imagens do Inconsciente' },
          { letra: 'C', texto: 'Centro Psiquiátrico Nacional' },
          { letra: 'D', texto: 'Seção de Terapêutica Ocupacional' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 4,
        enunciado: 'Com quem Nise da Silveira dividiu a prisão durante o Estado Novo?',
        opcoes: [
          { letra: 'A', texto: 'Graciliano Ramos' },
          { letra: 'B', texto: 'Olga Benário' },
          { letra: 'C', texto: 'Carl Gustav Jung' },
          { letra: 'D', texto: 'Machado de Assis' },
        ],
        respostaCorreta: 'B',
      },
    ],
  },
  ledo: {
    perfilSlug: 'ledo',
    recompensa: {
      titulo: 'Poeta do Infinito',
      icone: writerImage,
      descricao: 'Recompensa ao concluir',
      conquista: 'Você conquistou a insígnia de Poeta do Infinito por dominar a poesia e a trajetória de Lêdo Ivo!',
    },
    perguntas: [
      {
        id: 1,
        enunciado: 'Em que cidade Lêdo Ivo nasceu?',
        opcoes: [
          { letra: 'A', texto: 'União dos Palmares' },
          { letra: 'B', texto: 'Maceió' },
          { letra: 'C', texto: 'Passo de Camaragibe' },
          { letra: 'D', texto: 'Quebrangulo' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 2,
        enunciado: 'Qual obra de Lêdo Ivo recebeu o Prêmio Olavo Bilac, da Academia Brasileira de Letras?',
        opcoes: [
          { letra: 'A', texto: 'As Imaginações' },
          { letra: 'B', texto: 'Ode e Elegia' },
          { letra: 'C', texto: 'Ninho de Cobras' },
          { letra: 'D', texto: 'Finisterra' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 3,
        enunciado: 'Qual romance de Lêdo Ivo apresenta personagens e situações ligadas à sua terra natal?',
        opcoes: [
          { letra: 'A', texto: 'A Cidade e os Dias' },
          { letra: 'B', texto: 'Confissões de um Poeta' },
          { letra: 'C', texto: 'Ninho de Cobras' },
          { letra: 'D', texto: 'O Aluno Relapso' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 4,
        enunciado: 'Qual cadeira da Academia Brasileira de Letras Lêdo Ivo ocupou a partir de 1986?',
        opcoes: [
          { letra: 'A', texto: 'Cadeira nº 10' },
          { letra: 'B', texto: 'Cadeira nº 20' },
          { letra: 'C', texto: 'Cadeira nº 30' },
          { letra: 'D', texto: 'Cadeira nº 40' },
        ],
        respostaCorreta: 'A',
      },
    ],
  },
  jorge: {
    perfilSlug: 'jorge',
    recompensa: {
      titulo: 'Príncipe dos Poetas',
      icone: crabImage,
      descricao: 'Recompensa ao concluir',
      conquista: 'Você conquistou a insígnia de Príncipe dos Poetas desbravando o universo lírico de Jorge de Lima!',
    },
    perguntas: [
      {
        id: 1,
        enunciado: 'Em que cidade Jorge de Lima nasceu?',
        opcoes: [
          { letra: 'A', texto: 'Maceió' },
          { letra: 'B', texto: 'União dos Palmares' },
          { letra: 'C', texto: 'Passo de Camaragibe' },
          { letra: 'D', texto: 'Quebrangulo' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 2,
        enunciado: 'Qual é considerada a obra-prima de Jorge de Lima?',
        opcoes: [
          { letra: 'A', texto: 'Poemas Negros' },
          { letra: 'B', texto: 'A Túnica Inconsútil' },
          { letra: 'C', texto: 'Invenção de Orfeu' },
          { letra: 'D', texto: 'Livro de Sonetos' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 3,
        enunciado: 'Qual poema de Jorge de Lima se tornou uma das obras mais lembradas de sua trajetória?',
        opcoes: [
          { letra: 'A', texto: 'Essa Negra Fulô' },
          { letra: 'B', texto: 'O Mundo do Menino Impossível' },
          { letra: 'C', texto: 'Tempo e Eternidade' },
          { letra: 'D', texto: 'A Mulher Obscura' },
        ],
        respostaCorreta: 'A',
      },
      {
        id: 4,
        enunciado: 'Com quem Jorge de Lima publicou, em 1935, a obra Tempo e Eternidade?',
        opcoes: [
          { letra: 'A', texto: 'Murilo Mendes' },
          { letra: 'B', texto: 'Graciliano Ramos' },
          { letra: 'C', texto: 'Lêdo Ivo' },
          { letra: 'D', texto: 'Aurélio Buarque de Holanda' },
        ],
        respostaCorreta: 'A',
      },
    ],
  },
  aurelio: {
    perfilSlug: 'aurelio',
    recompensa: {
      titulo: 'Mestre das Palavras',
      icone: owlImage,
      descricao: 'Recompensa ao concluir',
      conquista: 'Você conquistou a insígnia de Mestre das Palavras ao comprovar seu saber sobre Aurélio Buarque de Holanda!',
    },
    perguntas: [
      {
        id: 1,
        enunciado: 'Em que cidade Aurélio Buarque de Holanda nasceu?',
        opcoes: [
          { letra: 'A', texto: 'Maceió' },
          { letra: 'B', texto: 'Passo de Camaragibe' },
          { letra: 'C', texto: 'Porto de Pedras' },
          { letra: 'D', texto: 'União dos Palmares' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 2,
        enunciado: 'Qual obra tornou Aurélio Buarque de Holanda conhecido nacionalmente?',
        opcoes: [
          { letra: 'A', texto: 'Dois Mundos' },
          { letra: 'B', texto: 'Mar de Histórias' },
          { letra: 'C', texto: 'Novo Dicionário da Língua Portuguesa' },
          { letra: 'D', texto: 'Enriqueça o seu Vocabulário' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 3,
        enunciado: 'Qual cadeira da Academia Brasileira de Letras Aurélio ocupou?',
        opcoes: [
          { letra: 'A', texto: 'Cadeira nº 10' },
          { letra: 'B', texto: 'Cadeira nº 20' },
          { letra: 'C', texto: 'Cadeira nº 30' },
          { letra: 'D', texto: 'Cadeira nº 40' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 4,
        enunciado: 'Com quem Aurélio Buarque de Holanda organizou a coleção Mar de histórias?',
        opcoes: [
          { letra: 'A', texto: 'Paulo Rónai' },
          { letra: 'B', texto: 'Lêdo Ivo' },
          { letra: 'C', texto: 'Graciliano Ramos' },
          { letra: 'D', texto: 'Jorge de Lima' },
        ],
        respostaCorreta: 'A',
      },
    ],
  },
  graci: {
    perfilSlug: 'graci',
    recompensa: {
      titulo: 'Guardião das Secas',
      icone: cactusImage,
      descricao: 'Recompensa ao concluir',
      conquista: 'Você conquistou o título de Guardião das Secas provando todo seu conhecimento sobre Graciliano Ramos!',
    },
    perguntas: [
      {
        id: 1,
        enunciado: 'Em que cidade Graciliano Ramos nasceu?',
        opcoes: [
          { letra: 'A', texto: 'Palmeira dos Índios' },
          { letra: 'B', texto: 'Quebrangulo' },
          { letra: 'C', texto: 'Maceió' },
          { letra: 'D', texto: 'União dos Palmares' },
        ],
        respostaCorreta: 'B',
      },
      {
        id: 2,
        enunciado: 'Qual é o romance mais conhecido de Graciliano Ramos?',
        opcoes: [
          { letra: 'A', texto: 'Caetés' },
          { letra: 'B', texto: 'São Bernardo' },
          { letra: 'C', texto: 'Angústia' },
          { letra: 'D', texto: 'Vidas Secas' },
        ],
        respostaCorreta: 'D',
      },
      {
        id: 3,
        enunciado: 'De qual cidade Graciliano Ramos foi prefeito em 1927?',
        opcoes: [
          { letra: 'A', texto: 'Quebrangulo' },
          { letra: 'B', texto: 'Maceió' },
          { letra: 'C', texto: 'Palmeira dos Índios' },
          { letra: 'D', texto: 'Passo de Camaragibe' },
        ],
        respostaCorreta: 'C',
      },
      {
        id: 4,
        enunciado: 'Qual é o nome da cadela que aparece em Vidas Secas?',
        opcoes: [
          { letra: 'A', texto: 'Baleia' },
          { letra: 'B', texto: 'Fulô' },
          { letra: 'C', texto: 'Sinhá' },
          { letra: 'D', texto: 'Calunga' },
        ],
        respostaCorreta: 'A',
      },
    ],
  },
};

export function obterDesafio(slug) {
  return dadosDesafios[slug] || null;
}

export function isDesafioConcluido(slug) {
  try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE_STORAGE_DESAFIOS) || '[]');
    return Array.isArray(salvos) && salvos.includes(slug);
  } catch {
    return false;
  }
}

export function salvarDesafioConcluido(slug) {
  try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE_STORAGE_DESAFIOS) || '[]');
    const lista = Array.isArray(salvos) ? salvos : [];
    if (!lista.includes(slug)) {
      lista.push(slug);
      localStorage.setItem(CHAVE_STORAGE_DESAFIOS, JSON.stringify(lista));
    }
  } catch (error) {
    console.warn('Não foi possível salvar o desafio concluído:', error);
  }
}
