const { PORT } = process.env
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const run = require('./controllers/run')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(cors({ origin: '*' }))

app.get('/api', (req, res) => {
  res.status(200).send('Ok')
})

app.post('/api/run', run)

// Static service
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})

app.listen(PORT || 8088, () => {
  console.log(`Service started on ${PORT || 8088}`)
})
