// backend/server.js – Version personnalisée par Nawel Amara
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS solide
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Connexion PostgreSQL
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
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
      VALUES ('Alice', 'alice@example.com'), ('Bob', 'bob@example.com')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('Base prête à l’emploi !');
  } catch (err) {
    console.error('Erreur DB:', err.message);
  }
}

// Routes
app.get('/', (req, res) => res.json({ status: "OK", environment: "Vercel" }));

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
