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

export enum ModKill {
  MOD_UNKNOWN,
  MOD_SHOTGUN,
  MOD_GAUNTLET,
  MOD_MACHINEGUN,
  MOD_GRENADE,
  MOD_GRENADE_SPLASH,
  MOD_ROCKET,
  MOD_ROCKET_SPLASH,
  MOD_PLASMA,
  MOD_PLASMA_SPLASH,
  MOD_RAILGUN,
  MOD_LIGHTNING,
  MOD_BFG,
  MOD_BFG_SPLASH,
  MOD_WATER,
  MOD_SLIME,
  MOD_LAVA,
  MOD_CRUSH,
  MOD_TELEFRAG,
  MOD_FALLING,
  MOD_SUICIDE,
  MOD_TARGET_LASER,
  MOD_TRIGGER_HURT,
}
