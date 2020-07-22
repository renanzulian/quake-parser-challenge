class Game {
  id: number
  total_kills: number
  players = []
  constructor(id: number) {
    this.id = id
    this.total_kills = 0
  }
}

export default Game
