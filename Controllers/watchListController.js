const { initDB } = require('../config/database');
const UserWatchListServices = require('../services/userWatchListServices');
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
    async addMovieToWatchList(req,res){
        try{
            const user_id = req.params.userId;
            const movie_id = req.params.movieId;
            await UserWatchListServices.addMovieToWatchList(user_id,movie_id);
        }catch(e){
            res.status(500).json({message: e});
        }

    }
}


module.exports = new watchListController();