const express = require('express'); // Import the express framework
const Router = express.Router(); // Create a new router object
const userController = require('../Controllers/userController'); // Import the user controller
const movieController = require('../Controllers/movieController'); // Import the movie controller
const { validateUser, validateUserId } = require('../validators/userDTO'); // Import validation middleware
const reviewController = require('../Controllers/reviewController'); // Import the review controller
const UserServices = require('../services/userServices'); // Import user services (not used in this file)
const watchListController = require('../Controllers/watchListController'); // Import the watchlist controller (not used in this file)

// Route to render the registration page
Router.get('/register', (req, res) => {
    res.render('users/register', { title: 'Movies World' }); // Render the registration view
});

// Route to render the login page
Router.get('/login', (req, res) => {
    res.render('users/login.ejs', { title: 'Movies World' }); // Render the login view
});

// Route to handle user login
Router.post('/login', (req, res) => {
    userController.login(req, res); // Call the login method from the user controller
});

// Route to create a new user with validation
Router.post('/create', validateUser, (req, res) => {
    userController.createUser(req, res); // Call the createUser method from the user controller
});

// Route to handle user logout
Router.get('/logout', (req, res) => {
    userController.logout(req, res); // Call the logout method from the user controller
});

// Route to get reviews for a specific movie by user ID
Router.get('/review/:movieId/:userId', async (req, res) => {
    reviewController.getToReview(req, res); // Call the method to get reviews for a movie
});

// Route to create a review for a specific movie by user ID
Router.post('/review/:movieId/:userId', (req, res) => {
    reviewController.createReview(req, res); // Call the method to create a review
});

// Route to get all users (note: the route is incorrectly named 'userss')
Router.get('/userss', (req, res) => {
    userController.getAllUser(req, res); // Call the method to get all users
});

// Route to get a user by ID with validation
Router.get('/users/:id', validateUserId, (req, res) => {
    userController.getUserById(req, res); // Call the method to get a user by ID
});

// Route to create a user with validation
Router.post('/users', validateUser, (req, res) => {
    userController.createUser(req, res); // Call the method to create a user
});

// Route to update a user by ID with validation
Router.put('/users/:id', validateUser, validateUserId, (req, res) => {
    userController.updateUser(req, res); // Call the method to update a user
});

// Route to delete a user by ID with validation
Router.delete('/users/:id', validateUser, validateUserId, (req, res) => {
    userController.deleteUser(req, res); // Call the method to delete a user
});

module.exports = Router; 