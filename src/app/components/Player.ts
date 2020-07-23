class Player {
  private _id: number
  private _name: string
  private _kills: number
  private _deaths: number

  constructor(id: number) {
    this._id = id
    this._name = 'Unknown'
    this._kills = 0
    this._deaths = 0
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get kills(): number {
    return this._kills
  }

  get score(): Record<string, number> {
    return {
      [this._name]: this._kills,
    }
  }

  addKill(): void {
    this._kills += 1
  }

  subtractKill(): void {
    this._kills -= 1
  }

  addDeath(): void {
    this._deaths += 1
  }
}

export default Player
