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
}

export default QuakeParse
