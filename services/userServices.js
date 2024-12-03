const bcrypt = require('bcryptjs');
const { initDB } = require("../config/database");
const User = require('../Models/User');
class UserServices{
    static async getAllUsers(req, res){
       try{
        const pool = await initDB();
       const [results] = await pool.query('SELECT * FROM users');
        return results;
    }catch(error){
        console.error('Error fetching users: ',error);
        throw new Error('Error fetching user')    }
    }
    static async getUserById(user_id){
        try{
        const pool = await initDB();
        const [result] = await pool.query('SELECT * FROM users WHERE user_id = ? ', [user_id]);
        return result.length ? result[0] : null;
        }catch(error){
            console.error('Error fetching user: ', error);
            throw new Error('Error fetching user');
        }
    }
    static async getUserByEmail(email){
        try{
            const pool = await initDB();
            const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return result.length ? result[0] : null;
        }catch(error){
            console.error('Error fetching user by email: ',error);
            throw new Error('Error fetching user')
        }
    }
    static async createUser(user){
        try{
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const pool = await initDB();
        const [result] = await pool.query('INSERT INTO users (username,email,password) VALUES (?,?,?)',
             [user.username, user.email, hashedPassword]);
             return {message: 'User created successfully!', user_id: result.insertId};
    }catch(error){
        console.error('Error creating user:', error);
        throw new Error('Error hashing password: '+error.message);
    }
    }

    static async updateUser(user_id,userData){
       try{
        const {username,email,password} = userData;
        
        const pool = await initDB();
        await pool.query('UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?',
             [username,email,password,user_id]);
             return {message: 'User updated successfully!'};
       }catch(error){
        console.error('Error updating user: ', error);
        
       }
    }

    static async deleteUser(user_id){
        try{
        const pool = await initDB();
         const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
         if(result.affectedRows == 0){
            throw new Error('User not found');
            
         }
         return { success: true, message: 'User deleted successfully!' };
        }catch(error){
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }

    static async authenticateUser(email,password){
        const user = await UserServices.getUserByEmail(email);
        if(!user){
            console.log("code is here null");
            return null;
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(isPasswordValid){
            console.log('password is valid');
        }
        return isPasswordValid ? user : null;
    }

    
}
module.exports = UserServices;    