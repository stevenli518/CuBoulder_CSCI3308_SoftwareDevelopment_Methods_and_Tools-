-- 1.
SELECT* FROM movies ORDER BY imdb_rating DESC LIMIT1;
--  movie_id |     name     | duration | year_of_release | gross_revenue | country |  language  | imdb_rating | platform_id

-- ----------+--------------+----------+-----------------+---------------+---------+------------+-------------+------------
-- -
--         7 | Secret Honor |        4 |            1996 |        690973 | Poland  | Lithuanian |          10 |           1
-- (1 row)

--  movie_id |                             name                              | duration | year_of_release | gross_revenue |     country      |         language          | imdb_rating | platform
-- _id
-- ----------+---------------------------------------------------------------+----------+-----------------+---------------+------------------+---------------------------+-------------+---------
-- ----
--         7 | Secret Honor                                                  |        4 |            1996 |        690973 | Poland           | Lithuanian                |          10 |
--   1
--         2 | Saban, Son of Saban                                           |        3 |            2000 |        497138 | Portugal         | Indonesian                |         9.8 |
--   6
--        26 | Spiderman1                                                    |      120 |            2012 |          1000 | US               | English                   |         9.8 |
--   1
--        27 | Spiderman2                                                    |      120 |            2013 |          1000 | US               | English                   |         9.7 |
--   1
--        15 | Beneath                                                       |        2 |            2003 |        639454 | Portugal         | Māori                     |         9.4 |
--   3
--         1 | Shadow Riders, The                                            |        1 |            2002 |        614488 | Croatia          | Italian                   |         9.3 |
--   6
--        24 | I'm So Excited (Los amantes pasajeros)                        |        1 |            2002 |        426835 | Czech Republic   | English                   |         9.3 |
--   2
--         6 | American History X                                            |        3 |            1994 |        558888 | Armenia          | Bengali                   |           9 |
--   6
--        11 | Angus                                                         |        3 |            1991 |        439725 | China            | Estonian                  |         8.5 |
--   7
--         3 | Stand, The                                                    |        3 |            1998 |        357507 | Indonesia        | Afrikaans                 |         8.1 |
--   5
--        16 | Cabinet of Dr. Caligari, The (Cabinet des Dr. Caligari., Das) |        2 |            2010 |        562512 | Portugal         | Gujarati                  |         7.7 |
--   6
--        13 | Holy Flying Circus                                            |        2 |            2007 |        431889 | Peru             | Arabic                    |         7.6 |
--   1
--        14 | Weary River                                                   |        1 |            2012 |        617264 | China            | Dzongkha                  |         7.5 |
--   3
--        10 | Kid, The                                                      |        3 |            2001 |        524241 | China            | Northern Sotho            |         7.2 |
--   3
--        12 | Cover-Up                                                      |        3 |            2004 |        618728 | United States    | Bislama                   |           7 |
--   7
--        18 | So It Goes (Korsoteoria)                                      |        2 |            1997 |        274951 | Philippines      | Macedonian                |         6.7 |
--   3
--        19 | Backwood Philosopher (Havukka-ahon ajattelija)                |        2 |            2006 |        776793 | China            | West Frisian              |         6.7 |
--   1
--        22 | Midnight Movies: From the Margin to the Mainstream            |        2 |            1994 |        398190 | Falkland Islands | Swati                     |         6.6 |
--   1
--         5 | Miracle                                                       |        3 |            2011 |        411214 | Philippines      | Kyrgyz                    |         6.2 |
--   1
--        25 | Dawn Rider, The                                               |        3 |            1993 |        696567 | Indonesia        | Bislama                   |         6.1 |
--   6
--        23 | Our Fathers                                                   |        4 |            1992 |        455841 | Japan            | Dari                      |           5 |
--   4
--         8 | Satan's Tango (Sátántangó)                                    |        3 |            2004 |        524659 | United States    | Telugu                    |         4.9 |
--   1
--        20 | Ballad of a Soldier (Ballada o soldate)                       |        3 |            2008 |        843458 | Tanzania         | Amharic                   |         4.4 |
--   5
--         9 | Miguel and William (Miguel y William)                         |        2 |            1992 |        286501 | Poland           | Quechua                   |         3.9 |
--   3
--         4 | Smoke Signals                                                 |        2 |            2002 |        514212 | Japan            | Yiddish                   |         3.9 |
--   6
--        21 | Mammy                                                         |        1 |            1988 |        938708 | Peru             | New Zealand Sign Language |         2.9 |
--   7
--        17 | Midsummer Night's Sex Comedy, A                               |        1 |            2004 |        874906 | China            | Spanish                   |           1 |
--   3
-- (27 rows)


--2 
SELECT movies.movie_id, movies.name, actors.actor_id, actors.name
FROM movies
INNER JOIN movies_to_actors
ON movies.movie_id = movies_to_actors.movie_id
INNER JOIN actors
ON movies_to_actors.actor_id = actors.actor_id
WHERE actors.name = 'Leonardo di Caprio';
--  movie_id |                  name                   | actor_id |        name
-- ----------+-----------------------------------------+----------+--------------------
--        17 | Midsummer Night's Sex Comedy, A         |       17 | Leonardo di Caprio
--         7 | Secret Honor                            |       17 | Leonardo di Caprio
--        20 | Ballad of a Soldier (Ballada o soldate) |       17 | Leonardo di Caprio
--         8 | Satan's Tango (Sátántangó)              |       17 | Leonardo di Caprio
--         5 | Miracle                                 |       17 | Leonardo di Caprio
--         4 | Smoke Signals                           |       17 | Leonardo di Caprio
-- (6 rows)

-- 3
SELECT* FROM movies ORDER BY year_of_release ASC LIMIT 3;
--  movie_id |                 name                  | duration | year_of_release | gross_revenue | country |         language          | imdb_rating | platform_id
-- ----------+---------------------------------------+----------+-----------------+---------------+---------+---------------------------+-------------+-------------
--        21 | Mammy                                 |        1 |            1988 |        938708 | Peru    | New Zealand Sign Language |         2.9 |           7
--        11 | Angus                                 |        3 |            1991 |        439725 | China   | Estonian                  |         8.5 |           7
--         9 | Miguel and William (Miguel y William) |        2 |            1992 |        286501 | Poland  | Quechua                   |         3.9 |           3
-- (3 rows)


-- 4
SELECT movies.movie_id, movies.name, platforms.platform_id, platforms.name, platforms. viewership_cost
FROM movies, platforms
WHERE movies.platform_id = platforms.platform_id AND platforms.name = 'Hulu';
--  movie_id |                             name                              | platform_id | name | viewership_cost
-- ----------+---------------------------------------------------------------+-------------+------+-----------------
--         1 | Shadow Riders, The                                            |           6 | Hulu |          507.52
--         2 | Saban, Son of Saban                                           |           6 | Hulu |          507.52
--         4 | Smoke Signals                                                 |           6 | Hulu |          507.52
--         6 | American History X                                            |           6 | Hulu |          507.52
--        16 | Cabinet of Dr. Caligari, The (Cabinet des Dr. Caligari., Das) |           6 | Hulu |          507.52
--        25 | Dawn Rider, The                                               |           6 | Hulu |          507.52
-- (6 rows)

-- 5
SELECT actors.name, count(movies.movie_id)
FROM movies, movies_to_actors, actors
WHERE movies.movie_id = movies_to_actors.movie_id 
AND movies_to_actors.actor_id = actors.actor_id 
GROUP BY actors.name
ORDER BY count(movies.movie_id) DESC
LIMIT 1;
--         name        | count
-- --------------------+-------
--  Leonardo di Caprio |     6
-- (1 row)

--         name        | count
-- --------------------+-------
--  Leonardo di Caprio |     6
--  Oliver             |     5
--  Rockie             |     5
--  Bern               |     4
--  Malachi            |     4
--  Nicholle           |     4
--  Hildegaard         |     3
--  Andria             |     3
--  Adi                |     3
--  Orlan              |     3
--  Desiree            |     3
--  Nikolaus           |     3
--  Tiena              |     3
--  Kristos            |     3
--  Washington         |     2
--  Marco              |     2
--  Jethro             |     2
--  Truda              |     2
--  Camala             |     2
--  Marysa             |     1
-- (20 rows)

-- 6
CREATE VIEW filter1
AS SELECT movies.name AS "movie_name", actors.name, actors.location
FROM movies
INNER JOIN movies_to_actors
ON movies.movie_id = movies_to_actors.movie_id
INNER JOIN actors
ON movies_to_actors.actor_id = actors.actor_id
WHERE actors.location = 'Missouri';
--                    movie_name                   |  name   | location
-- ------------------------------------------------+---------+----------
--  Backwood Philosopher (Havukka-ahon ajattelija) | Malachi | Missouri
--  Miguel and William (Miguel y William)          | Malachi | Missouri
--  Our Fathers                                    | Malachi | Missouri
--  Midsummer Night's Sex Comedy, A                | Malachi | Missouri
-- (4 rows)

CREATE VIEW filter2
AS SELECT movies.name AS "movie_name", genres.name
FROM movies
INNER JOIN movies_to_genres
ON movies.movie_id = movies_to_genres.movie_id
INNER JOIN genres
ON movies_to_genres.genre_id = genres.genre_id
WHERE genres.name = 'Romcom';
--            movie_name            |  name
-- ---------------------------------+--------
--  Beneath                         | Romcom
--  Midsummer Night's Sex Comedy, A | Romcom
-- (2 rows)
SELECT filter1.movie_name, filter1.name, filter1.location, filter2.name FROM filter1
INNER JOIN filter2 on filter2.movie_name = filter1.movie_name;
--            movie_name            |  name   | location |  name
-- ---------------------------------+---------+----------+--------
--  Midsummer Night's Sex Comedy, A | Malachi | Missouri | Romcom
-- (1 row)

-- 7
SELECT movies.name, movies.gross_revenue, genres.name
FROM movies
INNER JOIN movies_to_genres
ON movies.movie_id = movies_to_genres.movie_id
INNER JOIN genres
ON movies_to_genres.genre_id = genres.genre_id
WHERE genres.name = 'Thriller'
ORDER BY movies.gross_revenue DESC
LIMIT 3;
--    name   | gross_revenue |   name
-- ----------+---------------+----------
--  Mammy    |        938708 | Thriller
--  Cover-Up |        618728 | Thriller
--  Angus    |        439725 | Thriller
-- (3 rows)

-- 8
SELECT  platforms.platform_id
FROM platforms
WHERE platforms.name = 'Netflix';
--  platform_id
-- -------------
--            1
-- (1 row)
UPDATE movies SET platform_id = (SELECT  platforms.platform_id
FROM platforms
WHERE platforms.name = 'Netflix')
WHERE movies.year_of_release = '2004';
--  year_of_release | platform_id
-- -----------------+-------------
--             2004 |           1
--             2004 |           1
--             2004 |           1
-- (3 rows)

-- 9
SELECT movies.platform_id,COUNT(movies.platform_id)
FROM movies, platforms
GROUP BY movies.platform_id
ORDER BY COUNT(movies.platform_id) DESC
LIMIT 1;
--  platform_id | count
-- -------------+-------
--            1 |    90

--  platform_id | count
-- -------------+-------
--            1 |    90
--            6 |    54
--            3 |    45
--            5 |    18
--            7 |    18
--            2 |     9
--            4 |     9
-- (7 rows)


-- 10
SELECT actors.actor_id, actors.name, SUM(movies.gross_revenue)
FROM movies
INNER JOIN movies_to_actors
ON movies.movie_id = movies_to_actors.movie_id
INNER JOIN actors
ON movies_to_actors.actor_id = actors.actor_id
GROUP BY actors.name, actors.actor_id
ORDER BY SUM(movies.gross_revenue) DESC
LIMIT 1;

--  actor_id |        name        |   sum
-- ----------+--------------------+---------
--        17 | Leonardo di Caprio | 3859422
-- (1 row)

--  actor_id |        name        |   sum
-- ----------+--------------------+---------
--        17 | Leonardo di Caprio | 3859422
--        20 | Oliver             | 3332764
--         9 | Nicholle           | 2552688
--        19 | Malachi            | 2394041
--        18 | Rockie             | 2322450
--         1 | Bern               | 2100218
--        11 | Kristos            | 1992921
--         6 | Orlan              | 1937321
--         4 | Nikolaus           | 1702219
--        16 | Desiree            | 1680288
--        10 | Adi                | 1640107
--         2 | Andria             | 1620540
--        12 | Tiena              | 1604451
--         7 | Camala             | 1565879
--        14 | Marco              | 1308237
--         5 | Hildegaard         | 1245053
--        15 | Jethro             | 1164113
--         8 | Truda              |  980500
--        13 | Washington         |  789396
--         3 | Marysa             |  357507
-- (20 rows)