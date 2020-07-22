import QuakeParse from './QuakeParser'

describe('QuakeParseCore', () => {
  const core = new QuakeParse()
  it('should be instantiated', () => {
    expect(core).toBeDefined()
  })

  it('should have a list of events (logs) to process', () => {
    expect(core).toHaveProperty('events')
    expect(core.events).toBeDefined()
    expect(core.events).toBeInstanceOf(Array)
  })
})
