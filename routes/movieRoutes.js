const express= require('express');
const Router = express.Router();
const movieController = require('../Controllers/movieController.js');
Router.get('/movies', movieController.findAll);
Router.get('/:id', async (req, res) => {
    movieController.findMovieById(req,res);
});
Router.get('/category/:id', async(req, res)=>{
    movieController.findMovieByCategory(req,res);
});
Router.get('/search/movie', async (req, res) => {
    movieController.findMovieByTitle(req,res);
});

module.exports = Router;