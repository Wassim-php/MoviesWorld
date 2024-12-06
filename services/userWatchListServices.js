const {initDB} = require('../config/database');
class UserWatchListServices{
    static async getAllWatchLists(){
        try{
        const pool = await initDB();
        const results = pool.query('SELECT * from user_watchlist');
        return results
        }catch(error){
            throw new Error;
        }

    }
    static async getUserWatchList(user_id){
        try{
            const pool = await initDB();
            const results = await pool.query('SELECT * FROM user_watchlist WHERE user_id = ?', [user_id]);
            return results
        }catch(error){
            throw new Error(`Error fetching user watchlist: ${error.message}`);        }
    }
    static async addMovieToWatchList(user_id,movie_id){
        try{
            const pool = await initDB();
           
            const [existing] = await pool.query('SELECT * FROM user_watchlist WHERE user_id = ? AND movie_id = ?', [user_id,movie_id]);
            
            if (!(existing.length > 0)) {
            await pool.query('INSERT INTO user_watchlist (user_id,movie_id) VALUES(?,?)',[user_id,movie_id]);
            }
        }catch(e){
             throw new Error(`Error creating a watchlist: ${e.message}`);
        }
    }
    static async removeFromWatchList(user_id,movie_id){
        try{
            const pool = await initDB();
            await pool.query('DELETE  FROM user_watchlist WHERE user_id = ? AND movie_id =?',
                [user_id,movie_id]);

        }catch(e){
            throw new Error(`Error removing movie from watchlist: ${e.message}`);
        }
    }
    
    
    
}
module.exports = UserWatchListServices;    