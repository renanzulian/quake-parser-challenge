class Game {
  name: string
  total_kills: number
  players = []
  constructor(name: string) {
    this.name = name
    this.total_kills = 0
  }
}

export default Game
