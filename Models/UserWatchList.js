const connection = require('../config/database');
class UserWatchList{
    constructor(watchlist_id,movie_id,user_id,added_at){
        this.watchlist_id = watchlist_id;
        this.movie_id = movie_id;
        this.user_id = user_id;
        this.added_at = added_at;
    }
}
module.exports = UserWatchList;