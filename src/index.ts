import express from 'express'
import Cors from 'cors'
import Morgan from 'morgan'
import * as fs from 'fs'
import * as path from 'path'
import QuakeParser from './app/QuakeParser'

const gameLog = fs.readFileSync(path.join(__dirname + '/../games.log'), 'utf-8')

class App {
  server: express.Application
  quakeParser = new QuakeParser(gameLog)

  constructor() {
    this.server = express()
    this.quakeParser.run()
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
    this.server.get('/games', (req, res) => {
      res.status(200).send(this.quakeParser.results)
    })

    this.server.get('/games/historic', (req, res) => {
      res.status(200).send(this.quakeParser.resultsWithHistoric)
    })

    this.server.get('/games/:idGame', (req, res) => {
      const id = Number(req.params.idGame)
      if (Number.isNaN(id)) {
        res.status(400).send({ message: 'Id must to be a valid integer' })
      } else if (id > 21 || id < 1) {
        res.status(400).send({ message: 'Id must to be between 1 and 21' })
      } else {
        res.status(200).send(this.quakeParser.results[id - 1])
      }
    })

    this.server.get('/games/:idGame/historic', (req, res) => {
      const id = Number(req.params.idGame)
      if (Number.isNaN(id)) {
        res.status(400).send({ message: 'Id must to be a valid integer' })
      } else if (id > 21 || id < 1) {
        res.status(400).send({ message: 'Id must to be between 1 and 21' })
      } else {
        res.status(200).send(this.quakeParser.resultsWithHistoric[id - 1])
      }
    })

    this.server.get('/ranking', (req, res) => {
      res.status(200).send(this.quakeParser.ranking)
    })

    this.server.get('/ranking/historic', (req, res) => {
      res.status(200).send(this.quakeParser.historicRanking)
    })

    this.server.use('*', (req, res) => {
      res.status(400).send({ message: 'Method not found' })
    })
  }
}

export default new App().server
