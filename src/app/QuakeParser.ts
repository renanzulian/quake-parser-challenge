import * as fs from 'fs'
import * as path from 'path'
import Game from './components/Games'
import Player from './components/Player'

class QuakeParse {
  events: string[]
  games: Game[] = []

  constructor() {
    const dataFile = fs.readFileSync(
      path.join(__dirname + '/../../games.log'),
      'utf-8'
    )
    this.events = dataFile.split('\n')
  }

  eventSplitter(event: string): Record<string, string> {
    const [, operation, args] = event.split(/([a-zA-Z]+): /)
    return { operation, args }
  }

  startNewGame(): void {
    const gameId = this.games.length + 1
    this.games.push(new Game(gameId))
  }

  currentGame(): Game {
    return this.games[this.games.length - 1]
  }

  addPlayerInCurrentGame(id: number): void {
    const player = new Player(id)
    const currentGame = this.currentGame()
    currentGame.addPlayer(player)
  }

  updatePlayerName(id: number, name: string): void {
    const currentGame = this.currentGame()
    currentGame.getPlayerById(id)
    currentGame.setNamePlayer(id, name)
  }
}

export default QuakeParse
