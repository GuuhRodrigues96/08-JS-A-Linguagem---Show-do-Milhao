const readlineSync = require('readline-sync');
const fs = require('fs');

// - BANCO DE PERGUNTAS -
// Array de objetos, onde cada objeto representa uma pergunta do jogo
const PERGUNTAS = [
    {
        pergunta: "Qual a capital da Austrália?",
        opcoes: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        respostaCorreta: 2,
    },
    {
        pergunta: "Qual o maior planeta do nosso sistema solar?",
        opcoes: ["Terra", "Marte", "Júpiter", "Saturno"],
        respostaCorreta: 2,
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        opcoes: ["William Shakespeare", "Miguel de Cervantes", "Dante Alighieri", "Homero"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Qual elemento químico tem o símbolo 'O'?",
        opcoes: ["Ouro", "Oxigênio", "Ósmio", "Ozônio"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
        opcoes: ["1965", "1969", "1972", "1981"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Qual o nome do oceano que banha a costa leste do Brasil?",
        opcoes: ["Pacífico", "Índico", "Ártico", "Atlântico"],
        respostaCorreta: 3,
    },
    {
        pergunta: "Qual das seguintes obras não foi pintada por Leonardo da Vinci?",
        opcoes: ["Mona Lisa", "A Última Ceia", "O Nascimento de Vênus", "Homem Vitruviano"],
        respostaCorreta: 2,
    },
    {
        pergunta: "Quantos estados tem o Brasil?",
        opcoes: ["25", "26", "27", "28"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Qual a montanha mais alta do mundo?",
        opcoes: ["K2", "Monte Everest", "Kangchenjunga", "Lhotse"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Quem é conhecido como o pai da computação?",
        opcoes: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Bill Gates"],
        respostaCorreta: 0,
    },
    {
        pergunta: "Qual o livro mais vendido no mundo depois da Bíblia?",
        opcoes: ["O Senhor dos Anéis", "O Pequeno Príncipe", "Dom Quixote", "Harry Potter"],
        respostaCorreta: 2,
    },
    {
        pergunta: "Qual a nacionalidade de Che Guevara?",
        opcoes: ["Cubana", "Peruana", "Boliviana", "Argentina"],
        respostaCorreta: 3,
    },
    {
        pergunta: "Qual o nome do processo de conversão de luz solar em energia pelas plantas?",
        opcoes: ["Metabolismo", "Fotossíntese", "Respiração Celular", "Eletrossíntese"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Qual o plural de 'cidadão'?",
        opcoes: ["Cidadões", "Cidadãos", "Cidadães", "Cidades"],
        respostaCorreta: 1,
    },
    {
        pergunta: "Qual o resultado de 8 x (5 + 2)?",
        opcoes: ["42", "56", "60", "72"],
        respostaCorreta: 1,
    }
];

// -PREMIAÇÃO-
const PREMIACAO = [
    { rodada: 1, acertar: 1000, parar: 0, errar: 0 },
    { rodada: 2, acertar: 5000, parar: 1000, errar: 500 },
    { rodada: 3, acertar: 50000, parar: 5000, errar: 2500 },
    { rodada: 4, acertar: 100000, parar: 50000, errar: 25000 },
    { rodada: 5, acertar: 1000000, parar: 100000, errar: 0 },
];

const ARQUIVO_RANKING = 'ranking.json';

// Funções do jogo.

/**
 * Função para embaralhar um array (algoritmo de Fisher-Yates)
 * @param {Array} array O array a ser embaralhado
 * @returns {Array} O array embaralhado
 */
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Lê o ranking de um arquivo JSON.
 * @returns {Array} O ranking de jogadores.
 */
function lerRanking() {
    try {
        if (fs.existsSync(ARQUIVO_RANKING)) {
            const data = fs.readFileSync(ARQUIVO_RANKING, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Erro ao ler o ranking:", error);
    }
    return [];
}

/**
 * Salva o ranking em um arquivo JSON.
 * @param {Array} ranking O ranking de jogadores a ser salvo.
 */
function salvarRanking(ranking) {
    try {
        fs.writeFileSync(ARQUIVO_RANKING, JSON.stringify(ranking, null, 2));
    } catch (error) {
        console.error("Erro ao salvar o ranking:", error);
    }
}

/**
 * Atualiza o ranking com o resultado de um novo jogador.
 * @param {string} nome O nome do jogador.
 * @param {number} premio O prêmio final do jogador.
 */
function atualizarRanking(nome, premio) {
    const ranking = lerRanking();
    ranking.push({ nome, premio });
    // Ordena o ranking pelo prêmio em ordem decrescente
    ranking.sort((a, b) => b.premio - a.premio);
    // Mantém apenas os 10 melhores
    const rankingFinal = ranking.slice(0, 10);
    salvarRanking(rankingFinal);
}

/**
 * Exibe o ranking dos melhores jogadores.
 */
function exibirRanking() {
    console.log("\n- 🏆 RANKING DOS MELHORES JOGADORES 🏆 -");
    const ranking = lerRanking();
    if (ranking.length === 0) {
        console.log("Ainda não há jogadores no ranking. Seja o primeiro!");
    } else {
        ranking.forEach((jogador, index) => {
            console.log(`${index + 1}º - ${jogador.nome}: R$ ${jogador.premio.toLocaleString('pt-BR')}`);
        });
    }
    console.log("-------------------------------------------\n");
}


//Função principal que inicia e controla o fluxo do jogo.

function iniciarJogo() {
    console.clear();
    console.log("========================================");
    console.log("   💰BEM-VINDO AO SHOW DO MILHÃO!💰     ");
    console.log("========================================");

    const nomeJogador = readlineSync.question("Qual e o seu nome? ");
    console.log(`\nOk, ${nomeJogador}! Vamos começar.\n`);

    const perguntasSelecionadas = embaralharArray([...PERGUNTAS]).slice(0, PREMIACAO.length);
    let premioFinal = 0;
    let rodadaAtual = 0;
    let continuarJogando = true;
    let ajudas = { pular: 1, cartas: 1 }; // Bônus: Ajudas

    for (let i = 0; i < perguntasSelecionadas.length; i++) {
        rodadaAtual = i + 1;
        const pergunta = perguntasSelecionadas[i];
        const premiacaoRodada = PREMIACAO[i];

        const resultadoRodada = processarRodada(nomeJogador, rodadaAtual, pergunta, premiacaoRodada, ajudas);

        if (resultadoRodada.status === 'acertou') {
            premioFinal = premiacaoRodada.acertar;
            console.log(`\n✅ Resposta correta! Você ganhou R$ ${premioFinal.toLocaleString('pt-BR')}!\n`);
            if (rodadaAtual === PREMIACAO.length) {
                console.log(`🎉 PARABÉNS, ${nomeJogador}! Você ganhou o prêmio máximo de R$ 1.000.000!`);
                continuarJogando = false;
            } else {
                 readlineSync.question("Pressione ENTER para continuar para a proxima rodada...");
                 console.clear();
            }
        } else if (resultadoRodada.status === 'parou') {
            premioFinal = premiacaoRodada.parar;
            console.log(`\nOk! Você decidiu parar e levou para casa R$ ${premioFinal.toLocaleString('pt-BR')}.`);
            continuarJogando = false;
        } else { // Errou
            premioFinal = premiacaoRodada.errar;
            console.log(`\n❌ Que pena, você errou!`);
            if (premioFinal > 0) {
                 console.log(`Você ganhou um prêmio de consolação de R$ ${premioFinal.toLocaleString('pt-BR')}.`);
            } else {
                 console.log(`Infelizmente você não ganhou nada desta vez.`);
            }
            continuarJogando = false;
        }

        if (!continuarJogando) {
            mostrarResultadoFinal(nomeJogador, rodadaAtual, resultadoRodada.status, pergunta, premioFinal);
            break;
        }
    }

    atualizarRanking(nomeJogador, premioFinal);
    exibirRanking();
    jogarNovamente();
}

/**
 * Processa uma única rodada do jogo.
 * @param {string} nomeJogador - O nome do jogador.
 * @param {number} numRodada - O número da rodada atual.
 * @param {object} pergunta - O objeto da pergunta para a rodada.
 * @param {object} premiacao - O objeto de premiação para a rodada.
 * @param {object} ajudas - Objeto contendo as ajudas disponíveis.
 * @returns {object} - Um objeto com o status da rodada ('acertou', 'errou', 'parou').
 */
function processarRodada(nomeJogador, numRodada, pergunta, premiacao, ajudas) {
    let perguntaAtual = pergunta;

    while(true) { // Loop para permitir o uso de ajudas sem perder a vez
        console.log(`--- Rodada ${numRodada} | Jogador: ${nomeJogador} ---`);
        console.log(`Premiação: Acertar: R$ ${premiacao.acertar.toLocaleString('pt-BR')} | Parar: R$ ${premiacao.parar.toLocaleString('pt-BR')} | Errar: R$ ${premiacao.errar.toLocaleString('pt-BR')}`);
        console.log("\n--------------------------------------------------");
        console.log(`Pergunta: ${perguntaAtual.pergunta}`);
        console.log("--------------------------------------------------");

        let opcoesVisiveis = perguntaAtual.opcoes;
        opcoesVisiveis.forEach((opcao, index) => {
            console.log(`${index + 1}: ${opcao}`);
        });

        console.log("\nOpções de Jogo:");
        console.log("P: Parar o jogo e levar o prêmio atual.");
        if (ajudas.pular > 0) console.log(`J: Pular Pergunta (restante: ${ajudas.pular})`);
        if (ajudas.cartas > 0) console.log(`C: Ajuda das Cartas (restante: ${ajudas.cartas})`);


        const resposta = readlineSync.question("\nDigite o numero da resposta, (P)ara Parar ou uma letra de Ajuda: ").toUpperCase();

        if (resposta === 'P') {
            return { status: 'parou' };
        }

        if (resposta === 'J' && ajudas.pular > 0) {
            ajudas.pular--;
            console.log("\n>> AJUDA: Você pulou a pergunta! <<\n");
            
            const novasPerguntas = PERGUNTAS.filter(p => p.pergunta !== perguntaAtual.pergunta);
            perguntaAtual = embaralharArray(novasPerguntas)[0];
            continue; 
        }

        if (resposta === 'C' && ajudas.cartas > 0) {
            ajudas.cartas--;
            console.log("\n>> AJUDA: Eliminando duas alternativas incorretas... <<\n");
            let opcoesIncorretas = [];
            for (let i = 0; i < perguntaAtual.opcoes.length; i++) {
                if (i !== perguntaAtual.respostaCorreta) {
                    opcoesIncorretas.push(i);
                }
            }
            opcoesIncorretas = embaralharArray(opcoesIncorretas).slice(0, 2);
            
            let novasOpcoes = [];
            for(let i = 0; i < perguntaAtual.opcoes.length; i++){
                if(opcoesIncorretas.includes(i)){
                    novasOpcoes.push(`(${i + 1}) --------`);
                } else {
                    novasOpcoes.push(perguntaAtual.opcoes[i]);
                }
            }
            perguntaAtual = {...perguntaAtual, opcoes: novasOpcoes};
            continue; 
        }

        const respostaNum = parseInt(resposta, 10);
        if (!isNaN(respostaNum) && respostaNum > 0 && respostaNum <= perguntaAtual.opcoes.length) {
            if ((respostaNum - 1) === pergunta.respostaCorreta) { // Compara com a pergunta original
                return { status: 'acertou' };
            } else {
                return { status: 'errou' };
            }
        } else {
            console.log("\nOpção inválida! Por favor, digite um número correspondente a uma das respostas, ou 'P' para parar.\n");
        }
    }
}

/**
 * Exibe a tela de resultado final do jogo.
 * @param {string} nomeJogador -  nome do jogador.
 * @param {number} rodadaParou -  número da rodada em que o jogo terminou.
 * @param {string} statusFinal -  motivo do término ('acertou', 'errou', 'parou').
 * @param {object} ultimaPergunta -  objeto da última pergunta respondida.
 * @param {number} premioFinal -  valor final do prêmio.
 */
function mostrarResultadoFinal(nomeJogador, rodadaParou, statusFinal, ultimaPergunta, premioFinal) {
    console.log("\n--- FIM DE JOGO ---");
    console.log(`Jogador: ${nomeJogador}`);
    if (statusFinal !== 'acertou' || rodadaParou < PREMIACAO.length) {
        console.log(`Você parou na rodada ${rodadaParou} (faltavam ${PREMIACAO.length - rodadaParou} rodadas).`);
    }
    console.log(`A resposta correta para a última pergunta era: ${ultimaPergunta.opcoes[ultimaPergunta.respostaCorreta]}`);
    console.log(`\n💰 Premiação Final: R$ ${premioFinal.toLocaleString('pt-BR')} 💰`);
    console.log("-------------------\n");
}


 //* Pergunta ao jogador se ele deseja jogar novamente.
 
function jogarNovamente() {
    const resposta = readlineSync.question("Deseja jogar novamente? (S/N) ").toUpperCase();
    if (resposta === 'S') {
        iniciarJogo();
    } else {
        console.log("\nObrigado por jogar o Show do Milhão! Até a próxima!");
        process.exit();
    }
}

// -PONTO DE ENTRADA DO PROGRAMA-
function main() {
    exibirRanking();
    iniciarJogo();
}

main();