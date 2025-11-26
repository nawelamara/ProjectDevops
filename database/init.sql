-- Créer la table users
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Insérer des utilisateurs
INSERT INTO users (name, email) VALUES
('Nawel ', 'nawel.amara@example.com'),
('Monia', 'monia@example.com'),
('Melek ', 'melek@example.com');
