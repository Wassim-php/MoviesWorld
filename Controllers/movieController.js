const { movies } = require("../Models/Movie");
const { initDB } = require("../config/database");
const categoryController = require('../Controllers/categoryController');
const movieServices = require('../services/movieServices');
const Movie = require=('Models/Movies');
class movieController{

static async findAll() {
    try{
    const movies = await movieServices.findAll();
    return movies;
    }catch(e){
        throw Error('Error finding all movies: ',e);
    }
}

static async findMovieById(req,res) {
    try {
        const movie_id = req.params.id;

        const movie = await movieServices.findMovieById(movie_id);
        const id = req.session.userId;
        console.log('The user id is: ',id);
        if (movie.length === 0) {
            return res.status(404).send('wassim');
        }
        const category = await categoryController.findCategoryForMovie(movie[0].category_id);
        
        res.render('show', { movie: movie[0], category,id, title: 'Movies World' }); 
    } catch (error) {
        throw error;
    }
}
static async findMovieByCategory(req,res){
    try{
        const category_id = req.params.id;
        const movies = await movieServices.findMovieByCategory(category_id);
        res.render('index', {title: 'Movies World', movies});
    }catch(error){
        console.error('Error fetching movies: ', error);
        res.status(500).send('Internal Server Error');
    }
}
static async findMovieByTitle(req,res) {
      try {
        
        const searchedItem = req.query.query;
        const movies = await movieServices.findMovieByTitle(searchedItem);
        res.render('index', { title: 'Movies World', movies });
        } catch (error) {
            console.error('Error fetching movies: ', error);
            res.status(500).send('Internal Server Error');
        }
    }
async save() {
    try {
        const results = await movieServices.save();
        return results;
    } catch (error) {
        throw error;
    }
}
}
module.exports = movieController;