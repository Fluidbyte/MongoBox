/**
 * Creates a blob from JSON data and auot-click button with ObjectURL
 * @param {Object} query Query for request
 * @param {Array} collections Array of collections to query
 */
const downloadConfig = async (query, collections) => {
  const blob = new Blob(
    [
      JSON.stringify({
        collections: JSON.parse(collections),
        query: JSON.parse(query),
        timestamp: Date.now(),
      }),
    ],
    { type: 'application/json' }
  )
  const href = await URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = `query_config_${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default downloadConfig
