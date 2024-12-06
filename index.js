// Import required modules
const express = require('express');
const mysql = require('mysql'); 
const path = require('path'); 
const expressLayouts = require('express-ejs-layouts'); 
const session = require('express-session');
// Create an instance of Express
const app = express();

// Database connection configuration
var connection = require('./config/database'); 
const Movie = require('./Models/Movie'); 

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the port for the application
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));

// Session management configuration
app.use(session({
  secret: 'FLARL3Kw8lGtjmW', // Secret key for signing the session ID cookie
  resave: false, 
  saveUninitialized: false, 
  cookie: { secure: false } 
}));

// Middleware to make session data available in views
app.use((req, res, next) => {
  res.locals.session = req.session; // Make session data available in templates
  next(); // Proceed to the next middleware
});

// Set up view engine and layout
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.use(expressLayouts); // Use express-ejs-layouts for layout support
app.set('layout', 'layout'); // Specify the layout file to use
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Import route handlers
const appRoutes = require('./routes/userRoutes'); 
const movieRoutes = require('./routes/movieRoutes'); 
const watchListRoutes = require('./routes/watchListRoutes');
const movieController = require('./Controllers/movieController'); 

// Define API routes
app.use('/api/users', appRoutes);
app.use('/api/movies', movieRoutes); 
app.use('/api/watchList', watchListRoutes);

// Define the home route
app.get('/', async (req, res) => {
    try {
        const movies = await movieController.findAll(); // Fetch all movies from the database
        res.render('index', { title: 'Movies World', movies }); 
    } catch (error) {
        console.error('Error fetching movies:', error); 
        res.status(500).send('Internal Server Error'); // Send a 500 error response
    }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Your application is running on port ${PORT}`); 
});