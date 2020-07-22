import Player from './Player'

class Game {
  private _id: number
  private _totalKills: number
  private _players: Player[] = []
  private _disconnectedPlayers: Player[] = []

  constructor(id: number) {
    this._id = id
    this._totalKills = 0
  }

  get id(): number {
    return this._id
  }

  get numberPlayers(): number {
    return this._players.length
  }

  get totalKills(): number {
    return this._totalKills
  }

  get players(): Player[] {
    return this._players
  }

  get disconnectedPlayers(): Player[] {
    return this._disconnectedPlayers
  }

  addPlayer(id: number): void {
    const player = new Player(id)
    this._players.push(player)
  }

  getPlayerById(id: number): Player {
    const player = this._players.find((p) => p.id === id)
    if (typeof player === 'undefined') {
      throw new Error(`Player ${id} not found`)
    }
    return player
  }

  updatePlayerName(id: number, name: string): void {
    const player = this.getPlayerById(id)
    player.name = name
  }

  removePlayer(id: number): void {
    const removedPlayer = this.getPlayerById(id)
    this._disconnectedPlayers.push(removedPlayer)
    this._players = this.players.filter((player) => {
      JSON.stringify(player) !== JSON.stringify(removedPlayer)
    })
  }
}

export default Game
