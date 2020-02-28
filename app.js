require('dotenv').config()
const express = require('express')
var cors = require('cors')
const Request = require('request')

const app = express()

app.use(cors())

const API_KEY = process.env.TMDB_API_KEY
// const MovieDB = require('moviedb')('your api key');

app.get('/', (req, res) => {
	res.send('MOVIE API')
})

// GET TEMPERATURE IN CELCIOUS
app.get('/get-movies', (req, res) => {
	Request.get(
		'https://api.themoviedb.org/3/discover/movie?api_key=' +
			API_KEY +
			'&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_year=2000',
		(error, response, body) => {
			if (error) {
				return console.dir(error)
			}
			res.send(response)
			return
		}
	)
	// res.status(200).send('Movie List')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Weather API listening on ${port}...`)
})
