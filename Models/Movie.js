// models/Movie.js
const connection = require('../config/database');
class Movie {
    constructor(id,title, description, release_year, duration, rating, trailer_url, poster_url, category_id, created_at) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.release_year = release_year;
      this.duration = duration;
      this.rating = rating;
      this.trailer_url = trailer_url;
      this.poster_url = poster_url;
      this.category_id = category_id;
      this.created_at = created_at;
    }
  
    
  }
  
  // Simulate a storage for movies (this could be replaced with a real database later)
  Movie.movies = [];
  
  module.exports = Movie;
  