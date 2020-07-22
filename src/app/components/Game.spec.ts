import * as faker from 'faker'
import Game from './Games'
import Player from './Player'

describe('Game Entity', () => {
  let game: Game
  const randomId = faker.random.number(10)

  beforeEach(() => {
    game = new Game(randomId)
  })

  it('should be defined', () => {
    expect(game).toBeDefined()
  })

  it('should add many players', () => {
    const randomRangeId = Array.from(Array(faker.random.number(20)).keys())
    randomRangeId.forEach((id) => {
      game.addPlayer(id)
    })
    expect(game.players.length).toBe(randomRangeId.length)
    game.players.forEach((player) => {
      expect(player).toBeInstanceOf(Player)
    })
  })

  it('should update the name of any player', () => {
    const randomId = faker.random.number(100)
    const randomName = faker.name.firstName()
    game.addPlayer(randomId)
    const player = game.getPlayerById(randomId)
    expect(player.id).toBe(randomId)
    expect(player.name).toBe('Unknown')
    game.updatePlayerName(randomId, randomName)
    expect(player.name).toBe(randomName)
  })

  it('should move any player to disconnected players', () => {
    const randomId = faker.random.number(100)
    game.addPlayer(randomId)
    expect(game.players.length).toBe(1)
    game.removePlayer(randomId)
    expect(game.players.length).toBe(0)
    expect(game.disconnectedPlayers.length).toBe(1)
  })

  it('should save a event kill', () => {
    const randomRangeId = Array.from(
      Array(faker.random.number({ max: 10, min: 5 })).keys()
    )
    randomRangeId.forEach((id) => {
      game.addPlayer(id)
    })
    game.eventKill(2, 3)
    expect(game.totalKills).toBe(1)
  })
})
