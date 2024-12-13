const { initDB } = require('../config/database'); // Import the database initialization function

class movieServices {
    // Method to find all movies
    static async findAll() {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [results] = await pool.query('SELECT * FROM movies'); // Query to select all movies
            return results; // Return the results
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }

    // Method to find a movie by its ID
    static async findMovieById(movie_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT * FROM movies WHERE movie_id = ?', [movie_id]); // Query to select a movie by ID
            return result; // Return the result
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }

    // Method to find movies by category ID
    static async findMovieByCategory(category_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT * FROM movies WHERE category_id = ?', [category_id]); // Query to select movies by category ID
            return result; // Return the result
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }

    // Method to find movies by title (partial match)
    static async findMovieByTitle(title) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT * FROM movies WHERE title LIKE ?', [`%${title}%`]); // Query to select movies by title
            return result; // Return the result
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }

    // Method to save a new movie
    async save() {
        try {
            const pool = await initDB(); // Initialize the database connection
            const query = 'INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)'; // Query to insert a new movie
            const [results] = await pool.query(query, [this.title, this.genre, this.rating]); // Execute the insert query
            return results; // Return the results of the insert operation
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    }
}

module.exports = movieServices; 