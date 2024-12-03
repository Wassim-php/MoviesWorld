const express= require('express');
const Router = express.Router();
const userController = require('../Controllers/userController');
const movieController = require('../Controllers/movieController');
const { validateUser, validateUserId } = require('../validators/userDTO');
const reviewController = require('../Controllers/reviewController');
const UserServices = require('../services/userServices');
const watchListController = require('../Controllers/watchListController');

Router.get('/register', (req,res)=>{
    res.render('users/register', {title: 'Movies World'});
});
Router.get('/login',(req,res)=>{
    res.render('users/login.ejs',{title: 'Movies World'});
});
Router.post('/login',(req,res)=>{
    userController.login(req,res);
});
Router.post('/create',validateUser,(req,res)=>{
    userController.createUser(req,res);
    
});
Router.get('/logout', (req,res)=> {
    userController.logout(req,res);
});
Router.get('/add/watchlist/:userId/:movieId',(req,res)=>{
    watchListController.addMovieToWatchList(req,res);
});
Router.get('/review/:movieId/:userId', async (req, res) => {
  reviewController.getToReview(req,res);
});
Router.post('/review/:movieId/:userId',(req,res)=>{
    reviewController.createReview(req,res);
});
Router.get('/userss',(req,res)=>{
    userController.getAllUser(req,res);
});
Router.get('/users/:id',validateUserId, (req,res)=>{
    userController.getUserById(req, res);
});

Router.post('/users',validateUser, (req,res)=>{
    userController.createUser(req, res);
});
Router.put('/users/:id',validateUser,validateUserId ,(req,res)=>{
    userController.updateUser(req, res);
});
Router.delete('/users/:id',validateUser,validateUserId, (req,res)=>{
    userController.deleteUser(req, res);
});
module.exports = Router;