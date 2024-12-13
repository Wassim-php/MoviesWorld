const { initDB } = require('../config/database'); // Import the database initialization function
const movieController = require('../Controllers/movieController'); // Import the movie controller
const userServices = require('../services/userServices'); // Import user services (not used in this file)

class reviewServices {
    // Method to find all reviews
    static async findAllReviews() {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [results] = await pool.query('SELECT * FROM review'); // Query to select all reviews
            return results; // Return the results
        } catch (error) {
            throw new Error('Error fetching reviews'); // Throw an error if fetching fails
        }
    }

    // Method to find reviews for a specific movie by its ID
    static async findReviewForMovie(movieId) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const movie = await movieController.findMovieById(movieId); // Get the movie details using the movie controller
            const [result] = await pool.query(`
                SELECT SUM(rating) AS total_rating, COUNT(rating) AS review_count
                FROM review
                WHERE movie_id = ?
            `, [movie.movie_id]); // Query to get the total rating and review count for the movie
            return result; // Return the result
        } catch (e) {
            console.error('Error finding review:', e); // Log the error
            throw new Error('Error finding review:', e); // Throw an error if fetching fails
        }
    }
}

module.exports = reviewServices; 