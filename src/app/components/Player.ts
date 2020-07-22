class Player {
  private id: number
  private name: string
  private kills: number

  constructor(id: number) {
    this.id = id
    this.name = 'Unknown'
    this.kills = 0
  }

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getKills(): number {
    return this.kills
  }

  setName(name: string): void {
    this.name = name
  }
}

export default Player
