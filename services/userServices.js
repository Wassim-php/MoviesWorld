const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const { initDB } = require("../config/database"); // Import the database initialization function
const User = require('../Models/User'); // Import the User model

class UserServices {
    // Method to get all users
    static async getAllUsers(req, res) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [results] = await pool.query('SELECT * FROM users'); // Query to select all users
            return results; // Return the results
        } catch (error) {
            console.error('Error fetching users: ', error); // Log any errors that occur
            throw new Error('Error fetching user'); // Throw an error if fetching fails
        }
    }

    // Method to get a user by their ID
    static async getUserById(user_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]); // Query to select a user by ID
            return result.length ? result[0] : null; // Return the user if found, otherwise return null
        } catch (error) {
            console.error('Error fetching user: ', error); // Log any errors that occur
            throw new Error('Error fetching user'); // Throw an error if fetching fails
        }
    }

    // Method to get a user by their email
    static async getUserByEmail(email) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]); // Query to select a user by email
            return result.length ? result[0] : null; // Return the user if found, otherwise return null
        } catch (error) {
            console.error('Error fetching user by email: ', error); // Log any errors that occur
            throw new Error('Error fetching user'); // Throw an error if fetching fails
        }
    }

    // Method to create a new user
    static async createUser(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the user's password
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
                [user.username, user.email, hashedPassword]); // Query to insert a new user
            return { message: 'User created successfully!', user_id: result.insertId }; // Return success message and new user ID
        } catch (error) {
            console.error('Error creating user:', error); // Log any errors that occur
            throw new Error('Error hashing password: ' + error.message); // Throw an error if hashing fails
        }
    }

    // Method to update a user's information
    static async updateUser(user_id, userData) {
        try {
            const { username, email, password } = userData; // Destructure user data
            const pool = await initDB(); // Initialize the database connection
            await pool.query('UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?', 
                [username, email, password, user_id]); // Query to update user information
            return { message: 'User updated successfully!' }; // Return success message
        } catch (error) {
            console.error('Error updating user: ', error); // Log any errors that occur
            throw new Error('Error updating user'); // Throw an error if updating fails
        }
    }

    // Method to delete a user by their ID
    static async deleteUser(user_id) {
        try {
            const pool = await initDB(); // Initialize the database connection
            const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]); // Query to delete a user
            if (result.affectedRows == 0) {
                throw new Error('User not found'); // Throw an error if no user was deleted
            }
            return { success: true, message: 'User deleted successfully!' }; // Return success message
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`); // Throw an error if deleting fails
        }
    }

    // Method to authenticate a user by email and password
    static async authenticateUser(email, password) {
        const user = await UserServices.getUserByEmail(email); // Get the user by email
        if (!user) {
            console.log("User not found"); // Log if user is not found
            return null; // Return null if user is not found
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password

        if (isPasswordValid) {
            console.log('Password is valid'); // Log if the password is valid
        }
        return isPasswordValid ? user : null; // Return the user if the password is valid, otherwise return null
    }
}

module.exports = UserServices; // Export the UserServices class for use in other parts of the application