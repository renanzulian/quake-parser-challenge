import * as faker from 'faker'
import Game from './Games'

describe('Game Entity', () => {
  let game: Game
  const randomId = faker.random.number(10)

  beforeEach(() => {
    game = new Game(randomId)
  })

  it('should be instantiated', () => {
    expect(game).toBeDefined()
  })
})
