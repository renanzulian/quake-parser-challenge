import * as fs from 'fs'
import * as path from 'path'
import QuakeParser from '../src/app/QuakeParser'

const gameLog = fs.readFileSync(path.join(__dirname + '/../games.log'), 'utf-8')

const quake = new QuakeParser(gameLog)

quake.run()
console.log(JSON.stringify(quake.results, null, 4))
