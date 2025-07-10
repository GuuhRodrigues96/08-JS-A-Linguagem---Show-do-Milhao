# Show do Milhão - Versão Terminal

Este é um projeto de um jogo "Show do Milhão" desenvolvido em JavaScript para ser executado no terminal, como parte de uma atividade de aprendizado em JavaScript.

## Autor

* **Nome Completo:** Gustavo Rodrigues de Oliveira

## Regras do Jogo

O objetivo do jogo é responder a 5 perguntas de conhecimentos gerais corretamente para ganhar o prêmio máximo de R$ 1.000.000.

1.  O jogo possui 5 rodadas, cada uma com um prêmio maior.
2.  A cada rodada, uma pergunta com quatro alternativas é apresentada.
3.  O jogador pode escolher uma das alternativas, parar e levar o prêmio acumulado, ou usar uma das ajudas disponíveis.
4.  Se o jogador acertar, ele avança para a próxima rodada.
5.  Se o jogador errar, ele perde parte do valor e o jogo acaba.
6.  O jogador tem direito a duas ajudas durante todo o jogo:
    * **Pular:** O jogador pode pular uma pergunta (1 uso).
    * **Cartas:** Duas alternativas incorretas são eliminadas da pergunta atual (1 uso).

### Estrutura de Premiação

| Rodada | Prêmio por Acertar | Prêmio por Parar | Prêmio por Errar |
| :----: | :----------------: | :---------------: | :---------------: |
|   1    |     R$ 1.000       |       R$ 0        |       R$ 0        |
|   2    |     R$ 5.000       |     R$ 1.000      |      R$ 500       |
|   3    |     R$ 50.000      |     R$ 5.000      |     R$ 2.500      |
|   4    |    R$ 100.000      |     R$ 50.000     |     R$ 25.000     |
|   5    |   R$ 1.000.000     |    R$ 100.000     |       R$ 0        |

## Como Jogar

Ao iniciar o jogo, você será solicitado a inserir seu nome. Em seguida, a cada rodada:

1.  Leia a pergunta e as alternativas.
2.  Para responder, digite o número da alternativa e pressione `Enter`.
3.  Para parar e levar o prêmio da rodada anterior, digite `P` e pressione `Enter`.
4.  Para usar uma ajuda, digite a letra correspondente (`J` para pular, `C` para cartas) e pressione `Enter`.

Ao final do jogo, seu resultado e o prêmio final serão exibidos.

## Como Executar

Você precisa ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/thorehusfeldt/git-paa-dansk](https://github.com/thorehusfeldt/git-paa-dansk)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd [nome-da-pasta-do-repositorio]
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o jogo:**
    ```bash
    npm start
    ```

## Funcionalidades Bônus Implementadas

Este projeto inclui as seguintes funcionalidades bônus:

* **Ajudas:** Foram implementadas as ajudas "Pular" e "Cartas" para auxiliar o jogador.
* **Ranking de Jogadores:** O jogo salva os 10 melhores placares em um arquivo `ranking.json`. O ranking é exibido no início do jogo e ao final de cada partida.

## Créditos e Fontes de Referência

* **Lógica do Jogo:** Baseada no jogo "Show do Milhão" original.
* **Perguntas:** Conhecimentos gerais, criadas para este projeto (Pesquisas no Google, ChatGPT, e Google Gemini).
* **Leitura de Input no Terminal:** [readline-sync](https://www.npmjs.com/package/readline-sync) - Biblioteca utilizada para capturar as respostas do jogador de forma síncrona no terminal.

## Licença

Este projeto está sob a licença [MIT](LICENSE).