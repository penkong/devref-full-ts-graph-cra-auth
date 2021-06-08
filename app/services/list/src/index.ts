import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

import express, { Application, Request, Response } from 'express'

import { ApolloServer, ServerRegistration } from 'apollo-server-express'

import { config } from './config'
import { connectDB } from './database'
import { Database } from './@types/types'
import { RedisService } from './services'
import { typeDefs, resolvers } from './graphql'

// ---

const { DBURL, MONGOUSER, MONGOPASS, DBNAME, PORT, CORS } = config

const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

console.log(config)
console.log(url)

// ---

let db: Database
const bootstrap = async () => {
  //

  if (!PORT) throw new Error('Need Port!')

  const app = express() as Application // Application

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
      context: () => ({ db }),
      dataSources: () => {
        return {}
      }
    })
    await server.start()

    server.applyMiddleware({ app, path: '/__graphql' } as ServerRegistration)

    // catch all routes
    app.all('*', (_req: Request, _res: Response) => {
      throw new Error('NOT FOUND ROUTE!')
    })

    app.listen(PORT)

    console.log(`[app] : http://localhost:${PORT}`)

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
process.on('SIGINT', async () => await shutdown())
process.on('SIGTERM', async () => await shutdown())

// shut down server
async function shutdown() {
  await db.client.close()
  RedisService.quit()
  process.exitCode = 1
  process.exit()
}
