DROP DATABASE IF EXISTS pokemongo;
CREATE DATABASE IF NOT EXISTS pokemongo;
USE pokemongo;

CREATE TABLE user (
	user_id INT AUTO_INCREMENT,
    username VARCHAR(10) NOT NULL,
    password VARCHAR(72) NOT NULL,
	name VARCHAR(25) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    country VARCHAR(20) NOT NULL,
    date_registered DATE NOT NULL ,
    number_of_gyms_battled INT NOT NULL,
    team VARCHAR(10),
    level INT NOT NULL,
    CONSTRAINT user_userid_pk PRIMARY KEY(user_id),
    CONSTRAINT user_username_uk UNIQUE (username)
);

CREATE TABLE gym (
    gym_id INT AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    country VARCHAR(20) NOT NULL,
    number_of_users_battled INT NOT NULL,
    team VARCHAR(10),
    prestige VARCHAR(10) NOT NULL,
    CONSTRAINT user_gymid_pk PRIMARY KEY(gym_id)
);

CREATE TABLE pokemon (
    pokemon_id INT AUTO_INCREMENT,
    entity VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    cp INT NOT NULL,
    type1 VARCHAR(10) NOT NULL,
    type2 VARCHAR(10),
    level INT NOT NULL,
    date_caught DATE NOT NULL,
    user_id INT NOT NULL,
    gym_id INT,
    CONSTRAINT user_pokemonid_pk PRIMARY KEY(pokemon_id),
    CONSTRAINT user_userid_fk FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    CONSTRAINT user_gymid_fk FOREIGN KEY(gym_id) REFERENCES gym(gym_id) ON DELETE SET NULL
);

CREATE TABLE challenges (
    user_id INT,
    gym_id INT,
    CONSTRAINT user_id_gym_id_pk PRIMARY KEY(user_id, gym_id),
    CONSTRAINT challenges_userid_fk FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    CONSTRAINT challenges_gymid_fk FOREIGN KEY(gym_id) REFERENCES gym(gym_id) ON DELETE CASCADE
);