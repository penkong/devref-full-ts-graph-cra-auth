import { MongoClient } from 'mongodb'

import { config } from '../../config'
import { Database } from '../../@types/types'

// ---

const { DBURL, MONGOUSER, MONGOPASS, DBNAME } = config

const url = DBURL.replace('<MONGOUSER>', MONGOUSER).replace(
  '<MONGOPASS>',
  MONGOPASS
)

let client: MongoClient

// ---

export const connectDB = async (): Promise<Database> => {
  try {
    //

    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const con = await client.connect()

    if (!con.isConnected()) throw new Error('DATABASE IS NOT connected!')

    const db = client.db(DBNAME)

    return {
      listings: db.collection('listing'),
      client
    }

    //
  } catch (error) {
    //

    console.log(error)
    await client.close()
    throw new Error('DB ERROR!')
  }
}
