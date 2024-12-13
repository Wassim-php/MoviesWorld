const userServices = require('../services/userServices'); // Import user services
const connection = require('../config/database'); // Import database connection

class UserController {
    // Method to get all users
    async getAllUser(req, res) {
        try {
            const users = await userServices.getAllUsers(); // Call the service to get all users
            res.json(users); // Return the users as JSON
        } catch (e) {
            console.error('Error fetching users: ' + e); // Log any errors that occur
            res.status(500).json({ message: e }); // Return 500 if fetching fails
        }
    }

    // Method to get a user by their ID
    async getUserById(req, res) {
        try {
            const user_id = parseInt(req.params.id); // Parse the user ID from the request parameters
            const user = await userServices.getUserById(user_id); // Call the service to get the user by ID
            res.json(user); // Return the user as JSON
        } catch (e) {
            console.log('Error fetching user: ', e); // Log any errors that occur
            res.status(500).send({ message: e }); // Return 500 if fetching fails
        }
    }

    // Method to create a new user
    async createUser(req, res) {
        try {
            const { username, email, password, confirm_password } = req.body; // Get user details from the request body
            // Validate user input
            if (!username || !email || !password || password !== confirm_password) {
                return res.status(400).json({ message: 'Please fill all fields correctly.' }); // Return 400 if validation fails
            }
            const newUser = await userServices.createUser({ username, email, password }); // Call the service to create a new user
            req.session.userId = newUser.user_id; // Store the user ID in the session
            res.redirect('/'); // Redirect to the home page
        } catch (e) {
            console.error('Error creating user: ' + e); // Log any errors that occur
            res.status(500).send({ message: e }); // Return 500 if creating fails
        }
    }

    // Method to update an existing user
    async updateUser(req, res) {
        try {
            const id = req.query.id; // Get the user ID from the query parameters
            const { name, email, password } = req.body; // Get updated user details from the request body
            const updateUser = await userServices.updateUser(id, { name, email, password }); // Call the service to update the user
            res.status(201).json(updateUser); // Return the updated user as JSON
        } catch (e) {
            console.error('Error updating user: ' + e); // Log any errors that occur
            res.status(500).send({ message: e }); // Return 500 if updating fails
        }
    }

    // Method to log in a user
    async login(req, res) {
        const { email, password } = req.body; // Get email and password from the request body
        try {
            const user = await userServices.authenticateUser(email, password); // Call the service to authenticate the user
            if (user) {
                req.session.userId = user.user_id; // Store the user ID in the session
                res.redirect('/'); // Redirect to the home page
            } else {
                return res.status(401).render('users/login.ejs', { title: 'Movies World', errorMessage: 'Invalid email or password' }); // Return 401 if authentication fails
            }
        } catch (error) {
            console.error("Error logging in: ", error); // Log any errors that occur
            res.render('login', { error: 'An error occurred, please try again.' }); // Render the login page with an error message
        }
    }

    // Method to log out a user
    async logout(req, res) {
        req.session.destroy((err) => { // Destroy the session
            if (err) {
                console.error('Error logging out'); // Log any errors that occur
            }
            res.redirect('/'); // Redirect to the home page
        });
    }
}

module.exports = new UserController(); // Export an instance of UserController for use in other parts of the application