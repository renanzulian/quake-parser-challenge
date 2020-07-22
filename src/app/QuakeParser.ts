import * as fs from 'fs'
import * as path from 'path'

class QuakeParse {
  events: string[]

  constructor() {
    const dataFile = fs.readFileSync(
      path.join(__dirname + '/../../games.log'),
      'utf-8'
    )
    this.events = dataFile.split('\n')
  }

  eventSplitter(event: string): Record<string, string> {
    const [, operation, args] = event.split(/([a-zA-Z]+): /)
    return { operation, args }
  }
}

export default QuakeParse
