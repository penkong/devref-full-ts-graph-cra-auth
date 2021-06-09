// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { connectDB } from '../src/database'
import { listings } from './listing.data'

// ---

const seed = async () => {
  try {
    console.log('[seed] : running...')

    const db = await connectDB()

    for (const listing of listings) {
      await db.listings.insertOne(listing)
    }

    console.log('[seed] : success')
    process.exit(1)
  } catch {
    throw new Error('failed to seed database')
  }
}

seed()
