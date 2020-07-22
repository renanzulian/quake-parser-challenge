class Player {
  private _id: number
  private _name: string
  private _kills: number

  constructor(id: number) {
    this._id = id
    this._name = 'Unknown'
    this._kills = 0
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
}

export default Player
