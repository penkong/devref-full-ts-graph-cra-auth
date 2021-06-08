/*
 ** Description :
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

// ---

export const config = {
  REDIS: process.env.REDIS,
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  DBNAME: process.env.DBNAME,
  __prod__: process.env.NODE_ENV === 'production',
  MONGOPASS: process.env.MONGOPASS,
  MONGOUSER: process.env.MONGOUSER,
  CORS: process.env.CORS
}
