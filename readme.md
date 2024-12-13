# Movie World

> A movie review and management application that allows users to browse movies, write reviews, manage watchlists, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

This Node.js API allows users to explore a collection of movies, post reviews, add movies to a watchlist, and manage user accounts. Follow the guide below to set up, run, and deploy the API.

### Prerequisites

- **Node.js** version >= 14.x
- **npm** version >= 6.x
- **MySQL** with a database setup for movie and user data

### Installation

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Wassim-php/MoviesWorld
   cd movieworld
   npm install
   ```

### Usage

### API Endpoints

#### movieRoutes.js
Routes related to retrieving and managing movies.

- **Get All Movies (GET /movies)**: Retrieves a list of all movies in the database.
- **Get Movie by ID (GET /movies/:id)**: Fetches a specific movie by its ID.
- **Get Movies by Category (GET /category/:id)**: Retrieves movies within a specified category by category ID.
- **Search Movies by Title (GET /search/movie)**: Searches for movies based on a title query parameter.

#### userRoutes.js
Routes related to user management and authentication.

- **User Registration Page (GET /register)**: Renders the registration page for new users.
- **User Login Page (GET /login)**: Renders the login page for returning users.
- **Login User (POST /login)**: Authenticates a user and logs them in.
- **Register User (POST /create)**: Registers a new user in the system.
- **Logout User (GET /logout)**: Logs the user out of the application.
- **Get All Users (GET /users)**: Fetches a list of all registered users.
- **Get User by ID (GET /users/:id)**: Retrieves a specific user’s details by their ID.
- **Create User (POST /users)**: Adds a new user to the system.
- **Update User by ID (PUT /users/:id)**: Updates details of a specific user by their ID.
- **Delete User by ID (DELETE /users/:id)**: Deletes a user record from the system by ID.

#### watchlistRoutes.js
Routes related to managing user watchlists.

- **Get User Watchlist (GET /watchlist/:userId)**: Retrieves the watchlist for a specific user by user ID.
- **Add Movie to Watchlist (GET /watchlist/add/:userId/:movieId)**: Adds a specified movie to the watchlist for a given user.
- **Remove Movie from Watchlist (POST /watchlist/delete/:userId/:movieId)**: Removes a specified movie from the watchlist for a given user.

#### reviewRoutes.js
Routes related to movie reviews.

- **Write Review Page (GET /review/:movieId/:userId)**: Renders the review page for a specific movie and user.
- **Submit Review (POST /review/:movieId/:userId)**: Posts a review for a specific movie by a user.

### Error Handling
Basic error handling is implemented in `index.js` to manage both 404 errors and other unhandled exceptions.

### Testing

Tests on all endpoints have been developed using Postman and are provided in the project base.