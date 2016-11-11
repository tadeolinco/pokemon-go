DROP DATABASE IF EXISTS pokemongo;
CREATE DATABASE IF NOT EXISTS pokemongo;
USE pokemongo;

CREATE TABLE user (
	user_id INT AUTO_INCREMENT,
	name VARCHAR(25),
    gender VARCHAR(10),
    location VARCHAR(20),
    date_registered DATE,
    number_of_gyms_battled INT,
    team VARCHAR(10),
    level INT,
    username VARCHAR(10),
    password VARCHAR(12),
    CONSTRAINT user_userid_pk PRIMARY KEY(user_id)
);

CREATE TABLE gym (
    gym_id INT AUTO_INCREMENT,
    name VARCHAR(25),
    location VARCHAR(20),
    number_of_users_battled INT,
    team VARCHAR(10),
    prestige VARCHAR(10),
    CONSTRAINT user_gymid_pk PRIMARY KEY(gym_id)
);

CREATE TABLE pokemon (
    pokemon_id INT AUTO_INCREMENT,
    name VARCHAR(25),
    cp INT,
    type VARCHAR(10),
    level INT,
    date_caught DATE,
    user_id INT,
    gym_id INT,
    CONSTRAINT user_pokemonid_pk PRIMARY KEY(pokemon_id),
    CONSTRAINT user_userid_fk FOREIGN KEY(user_id) REFERENCES user(user_id),
    CONSTRAINT user_gymid_fk FOREIGN KEY(gym_id) REFERENCES gym(gym_id)
);

CREATE TABLE challenges (
    user_id INT,
    gym_id INT,
    CONSTRAINT user_id_gym_id_pk PRIMARY KEY(user_id, gym_id),
    CONSTRAINT challenges_userid_fk FOREIGN KEY(user_id) REFERENCES user(user_id),
    CONSTRAINT challenges_gymid_fk FOREIGN KEY(gym_id) REFERENCES gym(gym_id)
);