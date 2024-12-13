const Category = require('../Models/Category'); // Import the Category model
const { initDB } = require('../config/database'); // Import the database initialization function
const categoryServices = require('../services/categoryServices'); // Import the category services

class categoryController {
    // Method to find all categories
    static async findAllCategories(req, res) {
        try {
            const results = await categoryServices.findAllCategories(); // Call the service to get all categories
            return results; // Return the results
        } catch (error) {
            console.error('Error fetching categories: ', error); // Log any errors that occur
        }
    }

    // Method to find a category by its ID
    static async findCategoryById(req, res) {
        try {
            const result = await categoryServices.findCategoryById(req.params.category_id); // Call the service to get a category by ID
            return result; // Return the result
        } catch (error) {
            console.error('ERROR FETCHING CATEGORY', error); // Log any errors that occur
        }
    }

    // Method to find the category for a specific movie
    static async findCategoryForMovie(req, res) {
        try {
            const result = await categoryServices.findCategoryForMovie(req.params.movie_category_id); // Call the service to get the category for a movie
            return result; // Return the result
        } catch (error) {
            console.error('Error fetching name for movie category', error); // Log any errors that occur
        }
    }
}

module.exports = categoryController; // Export the categoryController class for use in other parts of the application