const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const path = require('path');
// database configuration
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"))
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



// Redirect to main
app.get('/', (req, res) =>{
  res.redirect('/main'); 
});

//GET main Page
app.get('/main', (req, res) => {
  res.render("pages/main", {
    results: [],
   });
  req.session.API_KEY = process.env.API_KEY;
});


app.post('/main', (req, res) =>{
  
  var key = "";
  if(req.body.t != ""){
    key = req.body.t;
    axios({
      url: `http://www.omdbapi.com/`,
      method: 'GET',
      dataType:'json',
      
      headers: {
      
      'Accept-Encoding': 'identity',
      
      },
      params: {
      "apikey": process.env.API_KEY,
      "t": key ,//you can choose any artist/event here
      "size": 1,
      }
      })
      .then(result =>{
        console.log(result.data);
        res.render("pages/main_result", {
          results: result.data,
         });
      })
      .catch(error => {
        // Handle errors
        res.render("partials/message", {
          results: [],
          error: true,
          message: "No data received"
        });
        })
  }

  else{
    key = "";
    axios({
      url: `http://www.omdbapi.com/`,
      method: 'GET',
      dataType:'json',
      
      headers: {
      
      'Accept-Encoding': 'identity',
      
      },
      params: {
      "apikey": process.env.API_KEY,
      "t": key ,//you can choose any artist/event here
      "size": 1,
      }
      })
      .then(result =>{
        // console.log(results.data._embedded.events);
        console.log(result.data);
        res.render("pages/main_result", {
          results: result.data,
         });
      })
      .catch(error => {
        // Handle errors
        res.render("partials/message", {
          error: true,
          results: [],
          message: "No data received"
        });
        })
  }

});

app.post('/main_result', async (req, res) =>{
  var movie = req.body.Movie;
  var review = req.body.Review;
  var date = req.body.date;

  const query = "insert into movies (movie_name, review, review_date) VALUES ($1, $2, $3)";
  db.any(query, [movie, review, date])
  .then((data) => {
    res.redirect("/review");
  })
  .catch((err) => {
    console.log(err);
    res.render("partials/message", {
      error : true,
      message: "No data submitted",
    });

  });  
});


app.get('/review', (req, res) => {
  const query = "select * from movies ORDER BY review_date DESC LIMIT 10";
  db.any(query )
  .then((data) => {
    console.log(data)
    res.render("pages/review", {
      results: data,
    });
  })
  .catch((err) => {
    console.log(err);
    res.render("partials/message", {
      error : true,
      message: "No data received",
    });

  });
});


app.listen(3000);
console.log("Server is listening on port 3000");