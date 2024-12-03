const {initDB} = require('../config/database');
class movieServices{
    static async findAll(){
        try {
            const pool = await initDB();
            const [results] = await pool.query('SELECT * FROM movies');
            return results;
        } catch (error) {
            throw error;
        }
    }
    static async findMovieById(movie_id) {
        try {
            const pool = await initDB();
            const [result] = await pool.query('SELECT * FROM movies WHERE movie_id = ?', [movie_id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async findMovieByCategory(category_id){
        try{
            const pool = await initDB();
            const [result] = await pool.query('SELECT * FROM movies WHERE category_id = ?', [category_id]);
            return result;
        }catch(error){
            throw error;
        }
    }
    static async findMovieByTitle(title) {
          try {
            const pool = await initDB();
            const [result] = await pool.query('SELECT * FROM movies WHERE title LIKE ?', [`%${title}%`]);
            return result;
            } catch (error) {
                throw error;
            }
        }
    async save() {
        try {
            const pool = await initDB();
            const query = 'INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)';
            const [results] = await pool.query(query, [this.title, this.genre, this.rating]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = movieServices;