const express = require('express')
const path = require('path')


// check deploy product

const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'test.html'))
})

app.listen(3000)
