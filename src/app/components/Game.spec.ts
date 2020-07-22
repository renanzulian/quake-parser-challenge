import * as faker from 'faker'
import Game from './Games'
import Player from './Player'

describe('Game Entity', () => {
  let game: Game
  let range: number[]

  beforeEach(() => {
    const randomInt = faker.random.number(10)
    range = Array.from(Array(faker.random.number({ max: 20, min: 5 })).keys())
    game = new Game(randomInt)
    range.forEach((id) => {
      game.addPlayer(id)
    })
  })

  it('should be defined', () => {
    expect(game).toBeDefined()
  })

  it('should add many players', () => {
    game.addPlayer(range.length + 1)
    const randomInt = faker.random.number(range.length)
    const player = game.getPlayerById(randomInt)
    expect(player.id).toBe(randomInt)
    expect(player.name).toBe('Unknown')
    expect(game.players.length).toBe(range.length + 1)
    game.players.forEach((player) => {
      expect(player).toBeInstanceOf(Player)
    })
  })

  it('should update the name of any player', () => {
    const randomId = faker.random.number(range.length)
    const randomName = faker.name.firstName()
    game.updatePlayerName(randomId, randomName)
    const player = game.getPlayerById(randomId)
    expect(player.name).toBe(randomName)
  })

  it('should move any player to disconnected players', () => {
    const randomId = faker.random.number(range.length)
    game.removePlayer(randomId)
    expect(game.players.length).toBe(range.length - 1)
    expect(game.disconnectedPlayers.length).toBe(1)
  })

  it('should save a event kill', () => {
    game.eventKill(2, 3)
    expect(game.totalKills).toBe(1)
  })
})
