import * as fs from 'fs'
import * as path from 'path'

export const quakeOperators = [
  'InitGame',
  'ClientConnect',
  'ClientDisconnect',
  'ClientUserinfoChanged',
  'Kill',
  'Item',
  'Shutdown',
  'ClientBegin',
  'score',
  'Exit',
]

export const fileTest = (): string => {
  const data = fs.readFileSync(path.join(__dirname + '/test.log'), 'utf-8')
  return data
}
