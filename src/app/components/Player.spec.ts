import Player from './Player'
import * as faker from 'faker'

describe('Player Entity', () => {
  let player: Player
  const randomId = faker.random.number(10)

  beforeEach(() => {
    player = new Player(randomId)
  })

  it('should be instantiated', () => {
    expect(player).toBeDefined()
  })
})
