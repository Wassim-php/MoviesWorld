const connection = require('../config/database');
class Review{
    constructor(review_id, user_id, movie_id, rating, comment, review_date){
        this.review_id = review_id;
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.rating = rating;
        this.comment = comment;
        this.review_date = review_date;
    }
}
module.exports = Review;