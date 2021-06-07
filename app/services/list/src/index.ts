import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

import { ApolloServer } from 'apollo-server-express'
import express, { Request, Response } from 'express'

import { config } from './config'
import { connectDB } from './database'
import { Database } from './@types/types'
import { RedisService } from './services'
import { typeDefs, resolvers } from './graphql'

// ---

const { PORT, CORS } = config
let db: Database
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

const bootstrap = async () => {
  //

  if (!PORT) throw new Error('Need Port!')

  const app = express() // Application

  app.set('trust proxy', 1)
  app.use(express.json({ limit: '2kb' }))
  app.use(express.urlencoded({ extended: true, limit: '5kb' }))
  app.use(
    cors({
      origin: CORS,
      credentials: true
    })
  )
  app.use(compression())
  app.use('/__grqphql', limiter)
  app.use(helmet())

  try {
    db = await connectDB()

    RedisService.on('ready', () => {
      console.log('RedisService connected and ready to use ...')
    })

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ db: { listings: db.listings } }),
      dataSources: () => {
        return {}
      }
    })

    server.applyMiddleware({ app, path: '/__graphql' })

    // catch all routes
    app.all('*', (_req: Request, _res: Response) => {
      throw new Error('NOT FOUND ROUTE!')
    })

    app.listen(5002)

    console.log(`[app] : http://localhost:${5002}`)

    //
  } catch (error) {
    //

    console.log(error)
    await db.client.close()
    await RedisService.quit()
    process.exit(1)
  }
}

bootstrap()

process.on('warning', e => console.warn(e.stack))
process.on('SIGINT', () => shutdown())
process.on('SIGTERM', () => shutdown())

// shut down server
function shutdown() {
  db.client.close()
  RedisService.quit()
  process.exitCode = 1
  process.exit()
}
