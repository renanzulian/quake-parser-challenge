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

  get resumeScore(): any {
    const allPlayers = this._players.concat(this._disconnectedPlayers)
    const playerScores = allPlayers
      .map((player) => ({
        [player.name]: player.kills,
      }))
      .reduce((prev, curr) => {
        const currentName = Object.keys(curr)[0]
        const currentValue = Object.values(curr)[0]
        if (Object.keys(prev).includes(currentName)) {
          prev[currentName] += currentValue
        }
        return { ...prev, ...curr }
      }, {})
    return {
      [`game ${this._id}`]: {
        totalKills: this._totalKills,
        players: playerScores,
      },
    }
  }

  get endScore(): any {
    return {
      [`game ${this._id}`]: {
        totalKills: this._totalKills,
        players: this._players
          .map((player) => player.score)
          .reduce((prev, curr) => ({ ...prev, ...curr }), {}),
      },
    }
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
      return JSON.stringify(player) !== JSON.stringify(removedPlayer)
    })
  }

  eventKill(whoDiedId: number, whoKillId?: number): void {
    const whoDied = this.getPlayerById(whoDiedId)
    // whoDied.addDeath() // DEATH FEATURE NOT IMPLEMENTED YET
    if (typeof whoKillId !== 'undefined') {
      const whoKill = this.getPlayerById(whoKillId)
      whoKill.addKill()
    } else {
      whoDied.subtractKill()
    }
    this._totalKills += 1
  }
}

export default Game
