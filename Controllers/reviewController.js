const Review = require('../Models/Review'); // Import the Review model
const connection = require('../config/database'); // Import the database connection
const { initDB } = require('../config/database'); // Import the database initialization function
const movieController = require('../Controllers/movieController'); // Import the movie controller
const userServices = require('../services/userServices'); // Import user services
const movieServices = require('../services/movieServices'); // Import movie services
const userController = require('./userController'); // Import the user controller
const reviewServices = require('../services/reviewServices'); // Import review services

class reviewController {
    // Method to find all reviews
    static async findAllReviews(req, res) {
        try {
            const results = await reviewServices.findAllReviews(req, res); // Call the service to get all reviews
            return results; // Return the results
        } catch (error) {
            throw new Error('Error fetching reviews'); // Throw an error if fetching fails
        }
    }

    // Method to find reviews for a specific movie
    static async findReviewForMovie(req, res) {
        try {
            const result = await reviewServices.findReviewForMovie(req, res); // Call the service to get reviews for a movie
            return result; // Return the result
        } catch (e) {
            console.error('Error finding review:', e); // Log any errors that occur
            throw new Error('Error finding review:', e); // Throw an error if fetching fails
        }
    }

    // Method to render the review page for a specific movie
    static async getToReview(req, res) {
        try {
            const { movieId, userId } = req.params; // Get movie ID and user ID from request parameters
            
            const movie = await movieServices.findMovieById(movieId); // Get movie details
            const user = await userServices.getUserById(userId); // Get user details
            
            res.render('users/review.ejs', { title: 'Movies World', movie, user }); // Render the review page with movie and user details
        } catch (error) {
            console.error(error); // Log any errors that occur
            res.status(500).send('Server error'); // Return 500 if fetching fails
        }
    }

    // Method to create a new review
    static async createReview(req, res) {
        try {
            const pool = await initDB(); // Initialize the database connection
            
            const user_id = req.session.userId; // Get the user ID from the session
            const movie_id = req.params.movieId; // Get the movie ID from request parameters
            
            const { rating, comment } = req.body; // Get rating and comment from request body
            const [result] = await pool.query(
                'INSERT INTO review (rating, comment, user_id, movie_id) VALUES (?, ?, ?, ?)', // SQL query to insert a new review
                [rating, comment, user_id, movie_id] // Values to insert
            );
            res.redirect('/'); // Redirect to the home page after creating the review
        } catch (error) {
            console.error(error); // Log any errors that occur
            res.status(500).json({ message: "Error creating review" }); // Return 500 if creating fails
        }
    }
}

module.exports = reviewController; // Export the reviewController class for use in other parts of the application