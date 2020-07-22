import * as fs from 'fs';
import * as path from 'path';

const data = fs.readFileSync(path.join(__dirname + '/../games.log'), 'utf-8')

console.log(data);
