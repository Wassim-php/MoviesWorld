const express = require('express');
const Router = express.Router();
const watchListController = require('../Controllers/watchListController');
Router.get('/:userId',(req,res)=>{
    watchListController.getUserWatchList(req,res);
});


Router.get('/add/:userId/:movieId',(req,res)=>{
    watchListController.addMovieToWatchList(req,res);
});
Router.post('/delete/:userId/:movieId', (req,res)=>{
    watchListController.removeFromWatchList(req,res);
});

module.exports = Router;