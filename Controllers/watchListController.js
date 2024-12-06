const { initDB } = require('../config/database');
const UserWatchListServices = require('../services/userWatchListServices');
const movieController = require('./movieController');
const movieServices = require('../services/movieServices');
class watchListController{
    async getAllWatchLists(){
        try{
            const watchlists = await UserWatchListServices.getAllWatchLists();
            res.json(watchlists);
        }catch(e){
            console.error('Error fetching user'+e);
            res.status(500).json({message: e});
        }
    }
    async getUserWatchList(req, res) {
        try {
            const user_id = req.params.userId;
            
            
            const watchlistData = await UserWatchListServices.getUserWatchList(user_id);
            const watchlist = watchlistData[0];
            

            let movies = [];

            for (const item of watchlist) {
                const movieId = item.movie_id;

                
                if (!movieId) {
                    console.error('Movie ID is undefined for item:', item);
                    continue;
                }
                
                
                const movie = await movieServices.findMovieById(movieId);
                if (movie[0]) {
                    movies.push(movie[0]);
                } else {
                    console.error(`Movie with ID ${movieId} not found.`);
                }
            }

            res.render('watchlist/watchlist.ejs', { watchlist, movies , title: 'Movies World'});
        } catch (e) {
            console.error('Error fetching user watchlist:', e.message);
            res.status(500).json({ message: e.message });
        }
    }
    async addMovieToWatchList(req,res){
        try{
            const user_id = req.params.userId;
            const movie_id = req.params.movieId;
            
            await UserWatchListServices.addMovieToWatchList(user_id,movie_id);
            res.redirect('/');
        }catch(e){
            res.status(500).json({message: e});
        }

    }
   async removeFromWatchList(req,res){
        try{
        const user_id = req.params.userId;
        const movie_id = req.params.movieId;
        await UserWatchListServices.removeFromWatchList(user_id,movie_id);
        res.redirect(`/api/watchList/${user_id}`);
        }catch(e){
            res.status(500).json({message: e});
        }
   }
}


module.exports = new watchListController();