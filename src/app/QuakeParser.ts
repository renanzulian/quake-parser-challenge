import Game from './components/Games'

class QuakeParser {
  events: string[]
  games: Game[] = []

  constructor(data: string | string[]) {
    if (typeof data === 'string') {
      this.events = data.split('\n')
    } else {
      this.events = data
    }
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
          this.clientConnectOperator(args)
          break
        case 'ClientDisconnect':
          // TO FORMAT THE ARGS AND MOVE A PLAYER TO SOMETHING LIKE A HISTORIC
          break
        case 'ClientUserinfoChanged':
          // TO FORMAT THE ARGS AND MOVE UPDATE PLAYER NAME
          this.clientUserinfoChangedOperator(args)
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

  clientConnectOperator(args: string): void {
    const playerId = this.findFirstIdValid(args)
    this.currentGame.addPlayer(playerId)
  }

  findFirstIdValid(text: string): number {
    const regex = /(\d+)/
    const result = regex.exec(text)
    if (!result) {
      throw new Error(`Valid id not found in ${text}`)
    }
    return Number(result[0])
  }

  clientUserinfoChangedOperator(args: string): void {
    const id = this.findFirstIdValid(args)
    const name = this.findFirstNameValid(args)
    this.currentGame.updatePlayerName(id, name)
  }

  findFirstNameValid(text: string): string {
    const regex = /(?<=n\\)(.*?)(?=.t\\)/
    const name = regex.exec(text)
    if (!name) {
      throw new Error(`Valid name not found in ${text}`)
    }
    return name[0]
  }

  clientDisconnectOperator(args: string): void {
    const id = this.findFirstIdValid(args)
    this.currentGame.removePlayer(id)
  }
}

export default QuakeParser
