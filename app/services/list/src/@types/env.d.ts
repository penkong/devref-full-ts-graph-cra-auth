/*
 ** Description :
 */

// ---

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    DBURL: string
    DBNAME: string
    NODE_ENV: string
    MONGOPASS: string
    MONGOUSER: string
    CORS: string // http://localhost:3000
  }
}
