DROP DATABASE IF EXISTS pokemongo;
CREATE DATABASE IF NOT EXISTS pokemongo;
USE pokemongo;

CREATE TABLE user (
    username VARCHAR(25) NOT NULL,
    password VARCHAR(72) NOT NULL,
	name VARCHAR(25) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    country VARCHAR(20) NOT NULL,
    date_registered DATE NOT NULL ,
    number_of_gyms_battled INT NOT NULL,
    team VARCHAR(10),
    level INT NOT NULL,
    CONSTRAINT user_username_pk PRIMARY KEY(username)
);

CREATE TABLE gym (
    gym_id INT AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    country VARCHAR(20) NOT NULL,
    number_of_users_battled INT NOT NULL,
    team VARCHAR(10),
    prestige INT NOT NULL,
    CONSTRAINT gym_gymid_pk PRIMARY KEY(gym_id)
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
    trainer VARCHAR(25) NOT NULL,
    gym_id INT,
    CONSTRAINT pokemon_pokemonid_pk PRIMARY KEY(pokemon_id),
    CONSTRAINT pokemon_trainer_fk FOREIGN KEY(trainer) REFERENCES user(username) ON DELETE CASCADE,
    CONSTRAINT pokemon_gymid_fk FOREIGN KEY(gym_id) REFERENCES gym(gym_id) ON DELETE SET NULL
);

CREATE TABLE challenges (
    username VARCHAR(25) NOT NULL,
    gym_id INT,
    CONSTRAINT challenges_username_gymid_pk PRIMARY KEY(username, gym_id),
    CONSTRAINT challenges_username_fk FOREIGN KEY(username) REFERENCES user(username) ON DELETE CASCADE,
    CONSTRAINT challenges_gymid_fk FOREIGN KEY(gym_id) REFERENCES gym(gym_id) ON DELETE CASCADE
);