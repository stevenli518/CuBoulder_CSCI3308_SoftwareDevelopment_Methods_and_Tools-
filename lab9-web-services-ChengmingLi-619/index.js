const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');

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

  app.get('/', (req, res) =>{
    res.redirect('/login'); //this will call the /anotherRoute route in the API
  });
  
  app.get('/register', (req, res) => {
    res.render("pages/register");
  });

  // Register submission
app.post('/register', async (req, res) => {
    //the logic goes here
    var username = req.body.username
    const hash = await bcrypt.hash(req.body.password, 10);
    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
    db.any(query, [username, hash])
    .then((data) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/register");
    });  
});

app.get('/login', (req, res) => {
    res.render("pages/login");
    
  });

  // Register submission
app.post('/login', async (req, res) => {
    //the logic goes here
    var username = req.body.username
    const query = "SELECT * FROM users where users.username = $1";

    db.one(query, [username])
    .then(async(data) => {

      const match = await bcrypt.compare(req.body.password, data.password); //await is explained in #8  
      if(match === true){
          req.session.user = {
              api_key: process.env.API_KEY,
            };
            req.session.save();
            res.redirect("/discover");
      }
      else{
        res.redirect("/register");
      }

    })
    .catch((err) => {
      console.log(err);
      
      res.render("pages/login",{ error: true, message:"Request Fail"});
    });  
});

// Authentication Middleware.
const auth = (req, res, next) => {
    if (!req.session.user) {
      // Default to register page.
      return res.redirect('/register');
    }
    next();
  };
  
  // Authentication Required
  app.use(auth);

  app.get('/discover', (req, res) => {
    axios({
        url: `https://app.ticketmaster.com/discovery/v2/events.json`,
            method: 'GET',
            dataType:'json',
            params: {
                "apikey": req.session.user.api_key,
                "keyword": "Drake", //you can choose any artist/event here
                "size": 10,
            }
        })
        .then(results => {
            console.log(results.data._embedded.events[0]); // the results will be displayed on the terminal if the docker containers are running
         // Send some parameters
         res.render("pages/discover", {
          results: results.data._embedded.events,
         });

        })
        .catch(error => {
        // Handle errors
        res.render("pages/discover", {
          results: [],
        });
        throw new Error(`Request error.`);
        })
  });


  app.get("/logout", (req, res) => {
    req.session.destroy();
    
    
    res.render("pages/login",{
      message: "Logged out Successfully",
      // redirect: "/login"
    });

  });

  app.listen(3000);
console.log("Server is listening on port 3000");