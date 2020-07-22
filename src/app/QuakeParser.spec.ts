import QuakeParse from './QuakeParser'
import * as faker from 'faker'
import { quakeOperators } from './utils/utils'
import Game from './components/Games'

describe('QuakeParseCore', () => {
  let core: QuakeParse
  it('should be instantiated', () => {
    expect(core).toBeDefined()
  })

  beforeEach(() => {
    core = new QuakeParse()
  })

  it('should have a list of events (logs) to process', () => {
    expect(core).toHaveProperty('events')
    expect(core.events).toBeDefined()
    expect(core.events).toBeInstanceOf(Array)
  })

  it('should return an operation and its arguments', () => {
    const event = core.events[faker.random.number(core.events.length)]
    const result = core.eventSplitter(event)
    expect(result).toHaveProperty('operation')
    expect(result).toHaveProperty('args')
    if (typeof result.operation !== 'undefined') {
      expect(quakeOperators).toContain(result.operation)
      expect(result.args).toBeTruthy()
    } else {
      expect(result.operation).toBeFalsy()
      expect(result.args).toBeFalsy()
    }
  })

  it('should start a new game', () => {
    const totalGameOnInit = core.games.length
    core.startNewGame()
    expect(core.games.length).toBe(totalGameOnInit + 1)
  })

  it('should return the current game', () => {
    expect(core.games.length).toBe(0)
    core.startNewGame()
    core.startNewGame()
    core.startNewGame()
    const currentGame = core.getCurrentGame()
    expect(currentGame).toBeInstanceOf(Game)
    expect(currentGame).toBe(core.games[2])
    expect(currentGame.id).toBe(3)
    expect(currentGame.total_kills).toBe(0)
  })
})
