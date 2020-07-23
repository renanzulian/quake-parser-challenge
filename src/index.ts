import * as fs from 'fs'
import * as path from 'path'
import QuakeParser from './app/QuakeParser'

const data = fs.readFileSync(path.join(__dirname + '/../games.log'), 'utf-8')

const app = new QuakeParser(data)

app.run()
