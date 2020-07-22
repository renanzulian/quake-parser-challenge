import * as fs from 'fs'
import * as path from 'path'
import Game from './components/Games'

class QuakeParser {
  events: string[]
  games: Game[] = []

  constructor() {
    const dataFile = fs.readFileSync(
      path.join(__dirname + '/../../games.log'),
      'utf-8'
    )
    this.events = dataFile.split('\n')
  }

  get currentGame(): Game {
    return this.games[this.games.length - 1]
  }

  get currentEvent(): string {
    return this.events[this.events.length - 1]
  }

  run(): void {
    do {
      const { operation, args } = this.eventSplitter(this.currentEvent)
      switch (operation) {
        case 'InitGame':
          // TO FORMAT THE ARGS AND START A NEW GAME
          this.initGameOperator()
          break
        case 'ClientConnect':
          // TO FORMAT THE ARGS AND ADD A NEW PLAYER
          break
        case 'ClientDisconnect':
          // TO FORMAT THE ARGS AND MOVE A PLAYER TO SOMETHING LIKE A HISTORIC
          break
        case 'ClientUserinfoChanged':
          // TO FORMAT THE ARGS AND MOVE UPDATE PLAYER NAME
          break
        case 'Kill':
          // TO FORMAT THE ARGS AND ADD A KILL IN THE GAME
          break
        default:
          break
      }
      this.events.pop()
    } while (this.currentEvent)
  }

  eventSplitter(event: string): Record<string, string> {
    const [, operation, args] = event.split(/([a-zA-Z]+): /)
    return { operation, args }
  }

  initGameOperator(): void {
    const gameId = this.games.length + 1
    this.games.push(new Game(gameId))
  }

  clientConnectOperator(id: number): void {
    this.currentGame.addPlayer(id)
  }

  clientUserinfoChangedOperator(id: number, name: string): void {
    this.currentGame.updatePlayerName(id, name)
  }
}

export default QuakeParser
