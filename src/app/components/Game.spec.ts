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
})
