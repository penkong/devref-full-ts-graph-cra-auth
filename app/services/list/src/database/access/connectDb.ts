import { MongoClient } from 'mongodb'
import { Database } from '../../@types/types'
import { config } from '../../config'

// ---
const { DBURL, MONGOUSER, MONGOPASS, DBNAME } = config

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

let client: MongoClient

export const connectDatabase = async (): Promise<Database> => {
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
      listings: db.collection('listing')
    }

    //
  } catch (error) {
    //

    console.log(error)
    await client.close()
    throw new Error('DB ERROR!')
  }
}
