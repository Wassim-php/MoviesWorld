const Review = require ('../Models/Review');
const connection = require('../config/database');
const {initDB} = require('../config/database');
const movieController = require('../Controllers/movieController');
const userServices = require('../services/userServices');
const userController = require('./userController');
const reviewServices = require('../services/reviewServices');
const movieServices = require('../services/movieServices');

class reviewController{
    static async findAllReviews(req,res){
        try{
        const results = await reviewServices.findAllReviews(req,res);
        return results;
        }catch(error){
            throw new Error('Error fetching reviews');
        }
    }

static async findReviewForMovie(req, res) {
    try {
            const result = await reviewServices.findReviewForMovie(req,res);
            return result;

    } catch (e) {
        console.error('Error finding review:', e);
        throw new Error('Error finding review:', e);
    }
}

    static async getToReview(req,res){
        try {
           
            const { movieId, userId } = req.params;
            
            
            const movie = await movieServices.findMovieById(movieId); 
            const user = await userServices.getUserById(userId);   
    
            
            res.render('users/review.ejs', {title: 'Movies World', movie, user });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
    static async createReview(req,res){
        try {
            const pool = await initDB();
            
            
            const user_id = req.session.userId; 
            const movie_id = req.params.movieId; 
    
            
            const { rating, comment } = req.body;
            const [result] = await pool.query(
                'INSERT INTO review (rating, comment, user_id, movie_id) VALUES (?, ?, ?, ?)',
                [rating, comment, user_id, movie_id]
            );
            res.redirect('/');
           
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating review" });
        }
    }




   
        
    }


module.exports =  reviewController;
