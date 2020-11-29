const { MongoClient } = require('mongodb')
const { MONGO_URL, MONGO_DB } = process.env

let db

// Establish connection
const getConnection = async () => {
  if (db) return db // cache connection
  try {
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      poolSize: 10,
      reconnectTries: 10,
      reconnectInterval: 1000,
    })
    db = await client.db(MONGO_DB)
    return db
  } catch (e) {
    throw new Error('CANNOT CONNECT TO DATABASE', e)
  }
}

module.exports = getConnection
