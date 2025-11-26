CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES
    ('Mariem', 'Mariem@example.com'),
  ('Malek', 'Malek@example.com'),
    ('Nawel', 'Nawel@example.com');
