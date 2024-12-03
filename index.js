
const express= require('express');
var mysql= require('mysql');
const app= express();
var connection = require('./config/database');
const Movie = require('./Models/Movie');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//Creating a static port, khalas 3eb
const PORT= 3001;
//Middleware to push JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
app.use(session({
  secret: 'FLARL3Kw8lGtjmW', 
  resave: false,              
  saveUninitialized: false,   
  cookie: { secure: false }   
}));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
const appRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const movieController = require('./Controllers/movieController');
app.use('/api/users', appRoutes);
app.use('/api/movies', movieRoutes);



app.get('/', async(req,  res)=>{
    try {
        const movies = await movieController.findAll();
         
        res.render('index', {title: 'Movies World', movies });
      } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Internal Server Error');
      }
});



   

app.listen(PORT, () =>{
    console.log(`Your application is running on port ${PORT}`);
    
})