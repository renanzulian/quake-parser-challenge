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
    expect(core.currentGame).toBeInstanceOf(Game)
    expect(core.currentGame).toBe(core.games[2])
    expect(core.currentGame.id).toBe(3)
    expect(core.currentGame.totalKills).toBe(0)
  })

  it('should add a player in the current game', () => {
    core.startNewGame()
    const randomIdOne = faker.random.number(10)
    const randomIdTwo = faker.random.number(10)
    core.addPlayerInCurrentGame(randomIdOne)
    core.addPlayerInCurrentGame(randomIdTwo)
    const allPlayers = core.currentGame.players
    allPlayers.forEach((player) => {
      expect(player.name).toBe('Unknown')
      expect(player.kills).toBe(0)
    })
    expect(core.currentGame.numberPlayers).toBe(2)
  })

  it('should update the player name', () => {
    core.startNewGame()
    const randomId = faker.random.number(10)
    const randomName = faker.name.firstName()
    core.addPlayerInCurrentGame(randomId)
    core.updatePlayerName(randomId, randomName)
    const player = core.currentGame.getPlayerById(randomId)
    expect(player.name).toBe(randomName)
  })
})
