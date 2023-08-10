ALTER TABLE movies ADD CONSTRAINT platform_id FOREIGN KEY(platform_id) REFERENCES platforms(platform_id);
ALTER TABLE movies_to_genres ADD CONSTRAINT movie_id FOREIGN KEY(movie_id) REFERENCES movies(movie_id);
ALTER TABLE movies_to_genres ADD CONSTRAINT genre_id FOREIGN KEY(genre_id) REFERENCES genres(genre_id);
ALTER TABLE movies_to_actors ADD CONSTRAINT movie_id FOREIGN KEY(movie_id) REFERENCES movies(movie_id);
ALTER TABLE movies_to_actors ADD CONSTRAINT actor_id FOREIGN KEY(actor_id) REFERENCES actors(actor_id);