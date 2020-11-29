const db = require('../adapters/mongodb')

const cleanDbCollections = async (conn) => {
  const allCollections = await conn.listCollections().toArray()
  return allCollections && allCollections.length > 0
    ? await Promise.all(
        allCollections
          .filter((c) => c.name.indexOf('system_') === -1)
          .map(async (c) => await conn.collection(c.name).drop())
      )
    : true
}

const createNewCollections = async (conn, collections) => {
  const collectionNames = Object.keys(collections)
  return await Promise.all(
    collectionNames.map(async (name) => {
      return conn.collection(name).insertMany(collections[name])
    })
  )
}

const executeQuery = async (conn, query) => {
  return await conn
    .collection(query.collection)
    [query.command](query.query)
    .toArray()
}

const run = async (req, res) => {
  const conn = await db()
  try {
    // Clear database
    await cleanDbCollections(conn)
    // Insert new data
    await createNewCollections(conn, req.body.collections)
    // Execute
    const response = await executeQuery(conn, req.body.query)
    res.status(200).send(response)
  } catch (e) {
    res.status(200).send({ error: e.message })
  }
}

module.exports = run
