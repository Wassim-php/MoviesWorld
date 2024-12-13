const express = require('express'); // Import the express framework
const Router = express.Router(); // Create a new router object
const watchListController = require('../Controllers/watchListController'); // Import the watchlist controller

// Route to get the watchlist for a specific user by user ID
Router.get('/:userId', (req, res) => {
    watchListController.getUserWatchList(req, res); // Call the method to get the user's watchlist
});

// Route to add a movie to a user's watchlist
Router.get('/add/:userId/:movieId', (req, res) => {
    watchListController.addMovieToWatchList(req, res); // Call the method to add a movie to the watchlist
});

// Route to remove a movie from a user's watchlist
Router.post('/delete/:userId/:movieId', (req, res) => {
    watchListController.removeFromWatchList(req, res); // Call the method to remove a movie from the watchlist
});

module.exports = Router; 