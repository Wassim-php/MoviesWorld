const {initDB} = require('../config/database');
const movieController = require('../Controllers/movieController');
const userServices = require('../services/userServices');
class reviewServices{
    static async findAllReviews(){
        try{
        const pool = await initDB();
       const [results] = await pool.query('SELECT * FROM review ');
       return results;
        }catch(error){
            throw new Error('Error fetching reviews');
        }
    }

    static async findReviewForMovie(movieId) {
    try {
        const pool = await initDB();
        const movie = await movieController.findMovieById(movieId);
        const [result] = await pool.query(`
            SELECT SUM(rating) AS total_rating, COUNT(rating) AS review_count
            FROM review
            WHERE movie_id = ?
        `, [movie.movie_id]);
            return result;

    } catch (e) {
        console.error('Error finding review:', e);
        throw new Error('Error finding review:', e);
    }
}
   
}
module.exports = reviewServices;
