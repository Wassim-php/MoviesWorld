const { movies } = require("../Models/Movie"); // Import the movies model
const { initDB } = require("../config/database"); // Import the database initialization function
const categoryController = require('../Controllers/categoryController'); // Import the category controller
const movieServices = require('../services/movieServices'); // Import the movie services

class movieController {
    // Method to find all movies
    static async findAll() {
        try {
            const movies = await movieServices.findAll(); // Call the service to get all movies
            return movies; // Return the results
        } catch (e) {
            throw Error('Error finding all movies: ', e); // Throw an error if fetching fails
        }
    }

    // Method to find a movie by its ID
    static async findMovieById(req, res) {
        try {
            const movie_id = req.params.id; // Get the movie ID from the request parameters

            const movie = await movieServices.findMovieById(movie_id); // Call the service to get the movie by ID
            const id = req.session.userId; // Get the user ID from the session

            if (movie.length === 0) { // Check if the movie was found
                return res.status(404).send('Movie not found'); // Return 404 if not found
            }

            const category = await categoryController.findCategoryForMovie(movie[0].category_id); // Get the category for the movie
            
            res.render('show', { movie: movie[0], category, id, title: 'Movies World' }); // Render the movie details page
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }

    // Method to find movies by category
    static async findMovieByCategory(req, res) {
        try {
            const category_id = req.params.id; // Get the category ID from the request parameters
            const movies = await movieServices.findMovieByCategory(category_id); // Call the service to get movies by category
            res.render('index', { title: 'Movies World', movies }); // Render the index page with the movies
        } catch (error) {
            console.error('Error fetching movies: ', error); // Log any errors that occur
            res.status(500).send('Internal Server Error'); // Return 500 if fetching fails
        }
    }

    // Method to find movies by title
    static async findMovieByTitle(req, res) {
        try {
            const searchedItem = req.query.query; // Get the search query from the request
            const movies = await movieServices.findMovieByTitle(searchedItem); // Call the service to search for movies
            res.render('index', { title: 'Movies World', movies }); // Render the index page with the search results
        } catch (error) {
            console.error('Error fetching movies: ', error); // Log any errors that occur
            res.status(500).send('Internal Server Error'); // Return 500 if fetching fails
        }
    }

    // Method to save a movie
    async save() {
        try {
            const results = await movieServices.save(); // Call the service to save the movie
            return results; // Return the results
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }
}

module.exports = movieController; // Export the movieController class for use in other parts of the application