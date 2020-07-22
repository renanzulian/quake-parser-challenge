import * as fs from 'fs'
import * as path from 'path'
import Game from './components/Games'

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

  getCurrentGame(): Game {
    return this.games[this.games.length - 1]
  }
}

export default QuakeParse
