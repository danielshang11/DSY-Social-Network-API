const express = require('express')
const db = require('./config/')
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}!\n http://localhost:3001/`)
  })
})