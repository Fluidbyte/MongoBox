/**
 * Sends POST request to data to be spun up and queried
 * @param {Object} data Collections and Query to run on the API
 */
const run = async (data) => {
  const res = await fetch(`http://${location.hostname}:8088/api/run`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export default run
