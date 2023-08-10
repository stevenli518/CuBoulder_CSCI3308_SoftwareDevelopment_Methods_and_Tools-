DROP TABLE IF EXISTS movies CASCADE;
CREATE TABLE movies(
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR(200) NOT NULL,
    review VARCHAR(5000),
    review_date VARCHAR(200)
);

