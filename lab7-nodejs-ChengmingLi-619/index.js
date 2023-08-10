// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');

// defining the Express app
const app = express();

// using bodyParser to parse JSON in the request body into JS objects
app.use(bodyParser.json());


// Connect to the db
const pgp = require('pg-promise')();
require('dotenv').config();

const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConfig);

const message = 'Hey there!';

//TODO: GET(checked)
app.get('/blinking', (req, res) => {
  res.send(message);
});

app.get('/trails', function (req, res) {
  var query = `SELECT * FROM trails WHERE trails.location = 'California' ORDER BY trails.avg_rating DESC LIMIT 3;`;
  db.any(query)
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      // handle an error
      console.log(err);
    });
});
/*--------------------------------------------------------------------------------------------------------------*/
//TODO: POST(checked)
app.post('/post', function (req, res) {
  var query = `insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ($1, $2, $3, $4, $5, $6) returning *`;
  var query2 = `SELECT * from trails where trails.name = $1;`;
  db.task('get-everything', task => {
    task.any(query,[req.body.name,
      req.body.location,
      req.body.length,
      req.body.elevation_gain,
      req.body.difficulty,
      req.body.avg_rating])
    return task.any(query2, [req.body.name]);
  })
    .then(function (data) {
      res.status(201).json({
        data:data,
        message: 'Data added successfully',
      });
    })
    .catch(function (err) {
      // handle an error
      console.log(err);
    });
});

/*--------------------------------------------------------------------------------------------------------------*/
//TODO: PUT(checked)
app.put('/put', function (req, res) {
  var query_review = `update reviews
                set review = $2
                WHERE reviews.review_id = $1;`;
  
  var get_review_data =`SELECT * FROM reviews WHERE reviews.review_id = $1;`;

  var set_image = `update images
                  set image_url = $2
                  where image_id = $1;`;
  var set_caption = `update images
                  set image_caption = $2
                  where image_id = $1;`;
  var get_image_data = `select* from images where image_id = $1;`;

  console.log(req.body);
  db.task('get-everything', task => {
    if (req.body.review != '' && req.body.image_url != ''){
      task.any(query_review, [req.body.review_id,req.body.review]);
      task.any(get_review_data, [req.body.review_id]);
      task.any(set_image,[req.body.image_id,req.body.image_url]);
      task.any(set_caption,[req.body.image_id, req.body.caption]);
      return task.any(get_image_data,[req.body.image_id]);
    }
    else if (req.body.image_url == '' && req.body.review){
      task.any(query_review, [req.body.review_id,req.body.review]);
      return task.any(get_review_data, [req.body.review_id]);
    }
    else if (req.body.image_url && req.body.review == ''){
      task.any(set_caption,[req.body.image_id, req.body.set_caption]);
      task.any(set_image,[req.body.image_id,req.body.image_url]);
      return task.any(get_image_data,[req.body.image_id]);
    }
    
  })
    .then(function (data) {
      res.status(201).json({
        data:data,
        message: 'Data updated successfully'
      });
    })
    .catch(function (err) {
      // handle an error
      console.log(err);
    });
});
/*--------------------------------------------------------------------------------------------------------------*/
// TODO: DELETE(checked)
app.delete('/delete', function (req, res) {
  const query = `delete from reviews where username = $1;`;
  const query2 = `delete from trails_to_reviews where review_id = (SELECT review_id from reviews where username = $1);`;
  const query3 = `delete from reviews_to_images where review_id = (SELECT review_id from reviews where username = $1);`;
  const query4 = `SELECT* from reviews;`;
  console.log("Req", req.body)
  db.task('get-everything', task => {
    task.any(query2, [req.body.user_name]);
    task.any(query3, [req.body.user_name]);
    task.any(query,[req.body.user_name])
    return task.any(query4,[req.body.user_name]);
  })
    .then(function (data) {
      res.status(201).json({
        data: data,
        message: 'Data deleted successfully',
      });
    })
    .catch(function (err) {
      return console.log(err);
    });
});

/*--------------------------------------------------------------------------------------------------------------*/
// TODO: PartB API route that allows users to search for different trails based on filters like difficulty, rating, location, elevation gain
app.get('/filter', function (req, res) {
  var query_default = `SELECT * from trails;`;

  var query_difficulty = `SELECT * from trails WHERE 
  trails.difficulty = $1;`;

  var query_avg_rating = `SELECT * from trails WHERE 
  trails.avg_rating >= $1;`;

  var query_location = `SELECT * from trails WHERE 
  trails.location = $1;`;

  var query_elevation_gain = `SELECT * from trails WHERE 
  trails.elevation_gain >= $1;`;

  db.task('get-everything', task => {
    console.log(req.query);
    switch(req.query.selection){
      case 'difficulty':
        return task.any(query_difficulty,[req.query.difficulty]);

      case 'avg_rating':
        return task.any(query_avg_rating,[req.query.avg_rating]);

      case 'location':
        return task.any(query_location,[req.query.location]);

      case 'elevation_gain':
        return task.any(query_elevation_gain,[req.query.elevation_gain]);

      default:
        return task.any(query_default);
    }
    
  })
    .then(function (data) {
      res.status(201).json({
        data: data,
        message: 'Data get successfully',
      });
    })
    .catch(function (err) {
      // handle an error
      console.log(err);
    });
});

/*--------------------------------------------------------------------------------------------------------------*/
// TODO: PartB  API route that shows reviews for a selected trail(checked)
app.get('/trail_review', function (req, res) {


  var query1 = `SELECT review, trails.name FROM reviews
                INNER JOIN trails_to_reviews
                ON trails_to_reviews.review_id = reviews.review_id
                INNER JOIN trails
                ON trails_to_reviews.trail_id = trails.trail_id 
                WHERE trails.name = $1;`;
  db.task('get-everything', task => {
    return task.any(query1, [req.query.trail_name]);
  })
    .then(function (data) {
      res.status(201).json({
        data: data,
        message: 'Data get successfully',
      });
    })
    .catch(function (err) {
      // handle an error
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

