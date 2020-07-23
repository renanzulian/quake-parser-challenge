import express from 'express'
import Cors from 'cors'
import Morgan from 'morgan'

class App {
  server: express.Application
  constructor() {
    this.server = express()
    this.middleware()
    this.routes()
  }

  middleware() {
    this.server.use(Cors())
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: false }))
    this.server.use(Morgan('dev'))
  }

  routes() {
    this.server.get('/', (req, res) => {
      res.send({ message: 'working' })
    })

    this.server.use('*', (req, res) => {
      res.status(400).send({ message: 'Method not found' })
    })
  }
}

export default new App().server
// import * as fs from 'fs'
// import * as path from 'path'
// import QuakeParser from './app/QuakeParser'

// const data = fs.readFileSync(path.join(__dirname + '/../games.log'), 'utf-8')

// const app = new QuakeParser(data)

// app.run()
// console.log(app.ranking)
