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
    const nameGame = String(this.games.length + 1)
    this.games.push(new Game(nameGame))
  }
}

export default QuakeParse
