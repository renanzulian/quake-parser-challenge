import Game from './components/Games'

class QuakeParser {
  private _events: string[]
  private _games: Game[] = []

  constructor(data: string | string[]) {
    if (typeof data === 'string') {
      this._events = data.split('\n')
    } else {
      this._events = data
    }
  }

  get events(): string[] {
    return this._events
  }

  get games(): Game[] {
    return this._games
  }

  get currentGame(): Game {
    return this._games[this._games.length - 1]
  }

  get currentEvent(): string {
    return this._events[0]
  }

  get results(): any[] {
    return this._games.map((game) => game.resumeScore)
  }

  get ranking(): string {
    const allPlayers = this._games
      .map((game) => game.players)
      .reduce((prev, curr) => [...prev, ...curr], [])
    const playersScores = allPlayers.map((player) => ({
      [player.name]: player.kills,
    }))
    const rankingFormatted = playersScores.reduce((prev, curr) => {
      const currentName = Object.keys(curr)[0]
      const currentValue = Object.values(curr)[0]
      if (Object.keys(prev).includes(currentName)) {
        prev[currentName] += currentValue
      }
      return { ...prev, ...curr }
    }, {})
    const rankingSorted = Object.keys(rankingFormatted)
      .sort((a, b) => rankingFormatted[b] - rankingFormatted[a])
      .map((player) => ({ [player]: rankingFormatted[player] }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
    return JSON.stringify(rankingSorted, null, 4)
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
          this.clientDisconnectOperator(args)
          break
        case 'ClientUserinfoChanged':
          // TO FORMAT THE ARGS AND MOVE UPDATE PLAYER NAME
          this.clientUserinfoChangedOperator(args)
          break
        case 'Kill':
          // TO FORMAT THE ARGS AND ADD A KILL IN THE GAME
          this.killOperator(args)
          break
        default:
          break
      }
      this._events.shift()
    } while (this.currentEvent)
  }

  eventSplitter(event: string): Record<string, string> {
    const [, operation, args] = event.split(/([a-zA-Z]+): /)
    return { operation, args }
  }

  initGameOperator(): void {
    const gameId = this._games.length + 1
    this._games.push(new Game(gameId))
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
    const result = regex.exec(text)
    if (!result) {
      throw new Error(`Valid name not found in ${text}`)
    }
    return result[0]
  }

  clientDisconnectOperator(args: string): void {
    const id = this.findFirstIdValid(args)
    this.currentGame.removePlayer(id)
  }

  killOperator(args: string): void {
    const [whoKill, whoDied] = this.findTwoFirstsIdValid(args)
    if (whoKill === 1022) {
      this.currentGame.eventKill(whoDied)
    } else {
      this.currentGame.eventKill(whoDied, whoKill)
    }
  }

  findTwoFirstsIdValid(text: string): number[] {
    const regex = /\d+/g
    const result = text.match(regex)
    if (result === null) {
      throw new Error(`Two ids valid not found in ${text}`)
    }
    const [firstId, secondId] = result
    return [Number(firstId), Number(secondId)]
  }
}

export default QuakeParser
