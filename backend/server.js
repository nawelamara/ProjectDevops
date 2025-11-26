// backend/server.js – Version personnalisée par Nawel Amara
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS solide
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Connexion PostgreSQL via Render environment variables
const db = new Pool({
  host: process.env.DB_HOST,         // ex: dpg-d4jli5euk2gs73bo2kog-a
  port: process.env.DB_PORT || 5432, // 5432
  user: process.env.DB_USER,         // ex: tpdevops_86i2_user
  password: process.env.DB_PASSWORD, // Render DB password
  database: process.env.DB_NAME,     // ex: tpdevops_86i2
  ssl: { rejectUnauthorized: false } // required for Render DB
});

// Initialisation de la base
async function setupDatabase() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      )
    `);
    await db.query(`
      INSERT INTO users (name, email)
      VALUES ('Mariem', 'Mariem@example.com'), ('Nawel', 'Nawel@example.com')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('Base prête à l’emploi !');
  } catch (err) {
    console.error('Erreur DB:', err.message);
  }
}

// Routes
app.get('/', (req, res) => res.json({ status: "OK", environment: "Render" }));

app.get('/api', (req, res) => res.json({
  note: "API fonctionnelle !",
  developer: "Nawel Amara",
  timestamp: new Date().toISOString()
}));

app.get('/db', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.json({ success: true, users: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur actif sur le port ${PORT}`);
  setupDatabase();
});
