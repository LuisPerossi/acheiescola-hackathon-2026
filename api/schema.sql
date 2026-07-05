DROP TABLE IF EXISTS users;
CREATE TABLE users(
    cpf TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS waitlist;
CREATE TABLE waitlist(
    cpf TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    points INTEGER NOT NULL
);

INSERT INTO waitlist(cpf, name, points) 
    VALUES  ("12332478901", "Felipe Leandro", 12), 
            ("12332478903", "Rafael Leandro", 3), 
            ("12332478921", "Luis Leandro", 4),
            ("00000000000", "Lucas Sabugosa", 5)