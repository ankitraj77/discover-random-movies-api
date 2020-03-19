require('dotenv').config()
const express = require('express')
// https://expressjs.com/en/resources/middleware/cors.html
var cors = require('cors')
const Request = require('request')

const app = express()

app.use(cors())

const API_KEY = process.env.TMDB_API_KEY
// const MovieDB = require('moviedb')('your api key');

app.get('/', (req, res) => {
	res.send('MOVIE API')
})

// GET RANDOM MOVIES
app.get('/get-movies', (req, res) => {
	const minYear = 1920
	const maxYear = new Date().getFullYear()
	let randomYear = Math.floor(Math.random() * (maxYear - minYear) + minYear)
	Request.get(
		'https://api.themoviedb.org/3/discover/movie?api_key=' +
			API_KEY +
			'&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_year=' +
			randomYear,
		(error, response, body) => {
			if (error) {
				return console.dir(error)
			}
			res.send(response)
			return
		}
	)
})

// GET GENRES
app.get('/genres', (req, res) => {
	Request.get(
		'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
			API_KEY +
			'&language=en-US',
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
	console.log(`MOVIE API listening on ${port}...`)
})
