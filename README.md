# Quake Parse Challenge

Principais tecnologias envolvidas:
- TypeScript (Super set da linguagem JavaScript)
- NodeJS
- Express
- Jest (Biblioteca para testes em JavaScript)
- Faker (Criação de testes dinâmicos)
- Docker (Rodando a aplicação com container)

------

## Entidades e relacionamentos

#### QuakeParser (main)
Através dela podemos processar um arquivo de logs. Para instância-la basta informar o texto do log ou um lista com as informações de um log. Rodando o método run ele irá processar todos os eventos (logs) informados quando a mesma foi instanciada.

#### Games
Responsável por administrar um jogo. Ela tem informações como jogadores, tanto os ativos no final do jogo quanto todos os outros que desconectaram e informação das mortes da partida.

### Player
Responsável por controlar as informações de um jogador.

-----

## Usando a aplicação com containers

Usando o comando `docker build -t {NomeDoSeuNovoContainer}` você irá gerar uma imagem local. Para instância-la rode o comando abaixo:

`docker run -d -p {PortaDesejada}:3333 {NomeDoSeuContainer}`

Coloque as informações desejadas corretamente dentro dos comandos e pronto. Só acessar a porta que você inseriu.


-----

## Instruções de uso



É necessário ter o NodeJS e o NPM instalado em versões recentes para utilizar todo o sistema. Instale as dependências através do comando `npm install` no diretório do projeto. Para utilizar o sistema utilize os seguintes comandos:

### `npm start`
Inicia uma api REST local na porta 3333. Rotas para uso:

- localhost:3333/games 

Retorna uma lista com o resultado de todos os jogos.


-  localhost:3333/games/historic

Retorna uma lista com o resultado de todos os jogos incluindo os usuários que foram desconectados ao longo das partidas.

- localhost:3333/games/{gameId} 

Retorna o resultado de um jogo específico.

-  localhost:3333/games/{gameId}/historic

Retorna uma o resultado de um jogo incluindo os usuários que foram desconectados ao longo da partida.


- localhost:3333/ranking 

Retorna o ranking de todos os jogos levando em consideração o resultado final deles.

- localhost:3333/ranking/historic

Retorna o ranking de todos os jogos levando em consideração o resultado final deles e isso inclui as informações de todos usuários (incluindo os que caíram durante a partida).

- localhost:3333/plus 

Retorna o ranking de modalidade de mortes.

### `npm run test`
Inicia todos os arquivos de testes.

### `npm run ranking`
Retorna no terminal o ranking de todos os jogos levando em consideração o resultado final deles.

### `npm run games`
Retorna no terminal uma lista com o resultado de todos os jogos.