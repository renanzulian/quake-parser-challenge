class Player {
  private id: number
  private name: string
  private kills: number

  constructor(id: number) {
    this.id = id
    this.name = 'Unknown'
    this.kills = 0
  }

  getName(): string {
    return this.name
  }

  getKills(): number {
    return this.kills
  }
}

export default Player
