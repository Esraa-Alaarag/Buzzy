DROP TABLE IF EXISTS MyEvents;



CREATE TABLE MyEvents (
	id SERIAL PRIMARY KEY NOT NULL ,
  date VARCHAR NOT NULL,
  event VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  category VARCHAR 
);
