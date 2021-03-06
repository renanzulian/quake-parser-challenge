import QuakeParser from './QuakeParser'
import * as faker from 'faker'
import { quakeOperators, fileTest } from './utils/utils'
import Game from './components/Games'

describe('QuakeParserCore Entity', () => {
  let core: QuakeParser

  beforeEach(async () => {
    core = new QuakeParser(fileTest())
  })

  it('should be instantiated', () => {
    expect(core).toBeDefined()
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

  it('should start a new game at any time', () => {
    core.initGameOperator()
    const firstGame = core.currentGame
    core.initGameOperator()
    const secondGame = core.currentGame
    expect(firstGame).not.toEqual(secondGame)
    expect(core.games.length).toBe(2)
  })

  it('should return the current game', () => {
    expect(core.games.length).toBe(0)
    core.initGameOperator()
    core.initGameOperator()
    core.initGameOperator()
    expect(core.currentGame).toBeInstanceOf(Game)
    expect(core.currentGame).toBe(core.games[2])
    expect(core.currentGame.id).toBe(3)
    expect(core.currentGame.totalKills).toBe(0)
  })

  it('should find first valid id', () => {
    const eventExample = ' 11:04 ClientConnect: 6'
    const { args } = core.eventSplitter(eventExample)
    const id = core.findFirstIdValid(args)
    expect(id).toBe(6)
  })

  it('should add a player in the current game', () => {
    core.initGameOperator()
    const randomIdOne = faker.random.number(10)
    const randomIdTwo = faker.random.number(10)
    core.clientConnectOperator(`${randomIdOne}`)
    core.clientConnectOperator(`${randomIdTwo}`)
    const allPlayers = core.currentGame.players
    allPlayers.forEach((player) => {
      expect(player.name).toBe('Unknown')
      expect(player.kills).toBe(0)
    })
    expect(core.currentGame.numberPlayers).toBe(2)
  })

  it('should run a test file', () => {
    core.run()
    const scoreGame2TestFile = core.resultsWithHistoric[1]['game 2']
    const endScoreGame2 = core.results[1]['game 2']
    expect(core.games.length).toBe(6)
    expect(core.rankingKillByMean).toHaveProperty('MOD_TRIGGER_HURT')
    expect(core.rankingKillByMean['MOD_TRIGGER_HURT']).toBe(26)
    expect(core.killFromAllGames).toBe(163)
    expect(scoreGame2TestFile['players']).toEqual({
      Isgalamido: -5,
      Mocinha: 0,
    })
    expect(endScoreGame2['players']).toEqual({
      Isgalamido: -3,
    })
  })
})
