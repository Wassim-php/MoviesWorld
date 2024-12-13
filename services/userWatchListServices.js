const { initDB } = require('../config/database'); // Import the database initialization function

class UserWatchListServices {
    // Method to get all watchlists
    static async getAllWatchLists() {
        try {
            const pool = await initDB(); // Initialize the database connection
            const results = await pool.query('SELECT * from user_watchlist'); // Query to select all watchlists
            return results; // Return the results
        } catch (error) {
            throw new Error('Error fetching watchlists: ' + error.message); // Throw an error if fetching fails
        }
    }

    // Method to get a user's watchlist by user ID
    static async getUserWatchList(user_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const results = await pool.query('SELECT * FROM user_watchlist WHERE user_id = ?', [user_id]); // Query to select a user's watchlist
            return results; // Return the results
        } catch (error) {
            throw new Error(`Error fetching user watchlist: ${error.message}`); // Throw an error if fetching fails
        }
    }

    // Method to add a movie to a user's watchlist
    static async addMovieToWatchList(user_id, movie_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            
            // Check if the movie already exists in the user's watchlist
            const [existing] = await pool.query('SELECT * FROM user_watchlist WHERE user_id = ? AND movie_id = ?', [user_id, movie_id]);
            
            // If the movie does not exist, insert it into the watchlist
            if (!(existing.length > 0)) {
                await pool.query('INSERT INTO user_watchlist (user_id, movie_id) VALUES(?, ?)', [user_id, movie_id]); // Insert the movie
            }
        } catch (e) {
            throw new Error(`Error creating a watchlist: ${e.message}`); // Throw an error if adding fails
        }
    }

    // Method to remove a movie from a user's watchlist
    static async removeFromWatchList(user_id, movie_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            await pool.query('DELETE FROM user_watchlist WHERE user_id = ? AND movie_id = ?', [user_id, movie_id]); // Query to delete the movie from the watchlist
        } catch (e) {
            throw new Error(`Error removing movie from watchlist: ${e.message}`); // Throw an error if removing fails
        }
    }
}

module.exports = UserWatchListServices; 