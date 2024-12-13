const express = require('express'); // Import the express framework
const Router = express.Router(); // Create a new router object
const movieController = require('../Controllers/movieController.js'); // Import the movie controller

// Route to get all movies
Router.get('/movies', movieController.findAll);

// Route to get a movie by its ID
Router.get('/:id', async (req, res) => {
    movieController.findMovieById(req, res); // Call the controller method to find a movie by ID
});

// Route to get movies by category ID
Router.get('/category/:id', async (req, res) => {
    movieController.findMovieByCategory(req, res); // Call the controller method to find movies by category
});

// Route to search for a movie by title
Router.get('/search/movie', async (req, res) => {
    movieController.findMovieByTitle(req, res); // Call the controller method to search for a movie by title
});

module.exports = Router; // Export the router for use in other parts of the application