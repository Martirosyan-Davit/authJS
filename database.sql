CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create TABLE users(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   name text NOT NULL,   
   email text NOT NULL unique,
   password text NOT NULL,
    admin boolean NOT NULL 
);

-- GET ALL USERS IN 
SELECT * FROM users;
-- 

-- FOR EXAMPLE
INSERT INTO users (name, password, email, admin) VALUES ('test1','test1234','test1@gmail.com',false);
INSERT INTO users (name, password, email, admin) VALUES ('admin','admin1234','admin@gmail.com',true);
-- 