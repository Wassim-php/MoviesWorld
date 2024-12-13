const { initDB } = require('../config/database'); // Import the database initialization function

class categoryServices {
    // Method to find all categories
    static async findAllCategories(req, res) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [results] = await pool.query('SELECT * FROM category'); // Query to select all categories
            return results; // Return the results
        } catch (error) {
            console.error('Error fetching categories: ', error); // Log any errors that occur
        }
    }

    // Method to find a category by its ID
    static async findCategoryById(category_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT * FROM category WHERE category_id = ?', [category_id]); // Query to select a category by ID
            return [result]; // Return the result as an array
        } catch (error) {
            console.error('ERROR FETCHING CATEGORY', error); // Log any errors that occur
        }
    }

    // Method to find the name of a category for a specific movie
    static async findCategoryForMovie(movie_category_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT name FROM category WHERE category_id = ?', [movie_category_id]); // Query to select the category name by movie category ID
            return result[0].name; // Return the name of the category
        } catch (error) {
            console.error('Error fetching name for movie category', error); // Log any errors that occur
        }
    }
}

module.exports = categoryServices; // Export the categoryServices class for use in other parts of the application