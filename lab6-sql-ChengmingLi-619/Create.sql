CREATE TABLE movies(movie_id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, duration SMALLINT, year_of_release SMALLINT, gross_revenue INT, country VARCHAR(50), language VARCHAR(50), IMDB_rating FLOAT, platform_id SMALLINT NOT NULL);
CREATE TABLE actors(actor_id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, agency VARCHAR(50), active_since SMALLINT, location VARCHAR(50));
CREATE TABLE platforms(platform_id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, viewership_cost FLOAT);
CREATE TABLE genres(genre_id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL);
CREATE TABLE movies_to_actors(movie_id SMALLINT NOT NULL, actor_id SMALLINT NOT NULL);
CREATE TABLE movies_to_genres(movie_id SMALLINT NOT NULL, genre_id SMALLINT NOT NULL);