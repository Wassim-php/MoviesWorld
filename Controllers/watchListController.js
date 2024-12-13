const { initDB } = require('../config/database'); // Import the database initialization function
const UserWatchListServices = require('../services/userWatchListServices'); // Import user watchlist services
const movieController = require('./movieController'); // Import the movie controller
const movieServices = require('../services/movieServices'); // Import movie services

class watchListController {
    // Method to get all watchlists
    async getAllWatchLists(req, res) {
        try {
            const watchlists = await UserWatchListServices.getAllWatchLists(); // Call the service to get all watchlists
            res.json(watchlists); // Return the watchlists as JSON
        } catch (e) {
            console.error('Error fetching user watchlists: ' + e); // Log any errors that occur
            res.status(500).json({ message: e }); // Return 500 if fetching fails
        }
    }

    // Method to get a user's watchlist by user ID
    async getUserWatchList(req, res) {
        try {
            const user_id = req.params.userId; // Get the user ID from the request parameters
            
            const watchlistData = await UserWatchListServices.getUserWatchList(user_id); // Call the service to get the user's watchlist
            const watchlist = watchlistData[0]; // Extract the watchlist from the response
            
            let movies = []; // Initialize an array to hold movie details

            // Iterate over each item in the watchlist
            for (const item of watchlist) {
                const movieId = item.movie_id; // Get the movie ID from the watchlist item
                
                if (!movieId) { // Check if the movie ID is defined
                    console.error('Movie ID is undefined for item:', item); // Log an error if undefined
                    continue; // Skip to the next item
                }
                
                const movie = await movieServices.findMovieById(movieId); // Call the service to find the movie by ID
                if (movie[0]) {
                    movies.push(movie[0]); // Add the movie to the movies array if found
                } else {
                    console.error(`Movie with ID ${movieId} not found.`); // Log an error if the movie is not found
                }
            }

            res.render('watchlist/watchlist.ejs', { watchlist, movies, title: 'Movies World' }); // Render the watchlist view with the movies
        } catch (e) {
            console.error('Error fetching user watchlist:', e.message); // Log any errors that occur
            res.status(500).json({ message: e.message }); // Return 500 if fetching fails
        }
    }

    // Method to add a movie to a user's watchlist
    async addMovieToWatchList(req, res) {
        try {
            const user_id = req.params.userId; // Get the user ID from the request parameters
            const movie_id = req.params.movieId; // Get the movie ID from the request parameters
            
            await UserWatchListServices.addMovieToWatchList(user_id, movie_id); // Call the service to add the movie to the watchlist
            res.redirect('/'); // Redirect to the home page after adding
        } catch (e) {
            res.status(500).json({ message: e }); // Return 500 if adding fails
        }
    }

    // Method to remove a movie from a user's watchlist
    async removeFromWatchList(req, res) {
        try {
            const user_id = req.params.userId; // Get the user ID from the request parameters
            const movie_id = req.params.movieId; // Get the movie ID from the request parameters
            await UserWatchListServices.removeFromWatchList(user_id, movie_id); // Call the service to remove the movie from the watchlist
            res.redirect(`/api/watchList/${user_id}`); // Redirect to the user's watchlist after removing
        } catch (e) {
            res.status(500).json({ message: e }); // Return 500 if removing fails
        }
    }
}

module.exports = new watchListController(); 