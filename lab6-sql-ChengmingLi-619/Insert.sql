INSERT INTO platforms(platform_id, name, viewership_cost) VALUES (8, 'HULU', 10), (9, 'YouTube', 5);
INSERT INTO movies(movie_id, name, duration, year_of_release, gross_revenue, country, language, IMDB_rating, platform_id) VALUES(26, 'Spiderman1', 120, 2012, 1000, 'US', 'English', 9.8, 1), (27, 'Spiderman2', 120, 2013, 1000, 'US', 'English', 9.7, 1);
INSERT INTO actors(actor_id, name, agency, active_since, location) VALUES (21, 'Steven', 'A', 2012, 'CA'),(22, 'Doria', 'B', 2012, 'CA');
INSERT INTO genres(genre_id, name) VALUES (9, 'Scientific'), (10, 'Horrible');
INSERT INTO movies_to_actors(movie_id, actor_id) VALUES (25,1), (25, 2);
INSERT INTO movies_to_genres(movie_id, genre_id) VALUES (26,1), (27, 2);