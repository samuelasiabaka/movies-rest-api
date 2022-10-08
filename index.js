// importing the dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const http = require('http')

// importing modules
const movieRouter = require('./routes/movieRouter')

const hostname = 'localhost'
const port = 3000

// defining the Express app
const app = express()

// adding Helmet to enhance your Rest API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// using movieRounter
app.use('/movies', movieRouter)

// moviesId endpoints
app.get('/movies/:movieId', (req, res, next) => {
  res.end('Will send details of the movie: ' + req.params.movieId + ' to you!')
})

app.post('/movies/:movieId', (req, res, next) => {
  res.statusCode = 403
  res.end('POST operation not supported on /movies/' + req.params.movieId)
})

app.put('/movies/:movieId', (req, res, next) => {
  res.write('Updating the movie: ' + req.params.movieId + '\n')
  res.end(
    'Will update the movie: ' +
      req.body.name +
      ' with details: ' +
      req.body.description,
  )
})

app.delete('/movies/:movieId', (req, res, next) => {
  res.end('Deleting movie: ' + req.params.movieId)
})

// starting the server
const server = http.createServer(app)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
