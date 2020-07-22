import * as fs from 'fs'
import * as path from 'path'
import Game from './components/Games'

class QuakeParse {
  events: string[]
  games: Game[] = []
  get currentGame(): Game {
    return this.games[this.games.length - 1]
  }

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

  addPlayerInCurrentGame(id: number): void {
    this.currentGame.addPlayer(id)
  }

  updatePlayerName(id: number, name: string): void {
    this.currentGame.updatePlayerName(id, name)
  }
}

export default QuakeParse
