const {initDB} = require('../config/database');
class categoryServices{
    static async findAllCategories(req, res){
        try{
       const pool = await initDB();
       const [results] = pool.query('SELECT * FROM category');
       return results;
        }catch(error){
            console.error('Error fetching movies: ',error);
        }
    }


    static async findCategoryById(category_id){
        try{
            const pool = await initDB();
           const [result] = await pool.query('SELECT * FROM category WHERE category_id = ?',[category_id]);
            return [result];
        }catch(error){
            console.error('ERROR FETCHING USER', error);
        }
        
    }

    static async findCategoryForMovie(movie_category_id){
        try{
            const pool = await initDB();
            const [result] = await pool.query('SELECT name FROM category WHERE category_id = ?', [movie_category_id]);
            return result[0].name   ;
        }catch(error){
            console.error('Error fetching name for movie');
        }
    }


}
module.exports = categoryServices;