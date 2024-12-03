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
    static async addMovieToWatchList(user_id,movie_id){
        try{
            const pool = await initDB();
            const [result] = pool.query('INSERT INTO user_watchlist (user_id,movie_id) VALUES(?,?)',[user_id,movie_id]);
            res.redirect('/');
            }catch(e){
             throw new Error(`Error creating a watchlist: ${e.message}`);
        }
    }
    
    
}
module.exports = UserWatchListServices;    