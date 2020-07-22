import Player from './Player'

class Game {
  private gameId: number
  private total_kills: number
  private players: Player[] = []
  constructor(id: number) {
    this.gameId = id
    this.total_kills = 0
  }

  totalPlayers(): number {
    return this.players.length
  }

  addPlayer(player: Player): void {
    this.players.push(player)
  }

  getTotalKills(): number {
    return this.total_kills
  }

  getGameId(): number {
    return this.gameId
  }

  getPlayers(): Player[] {
    return this.players
  }
}

export default Game
