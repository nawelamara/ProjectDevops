// backend/server.js – version fonctionnelle avec quelques modifications cosmétiques
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------
// Middleware
// ----------------------------
const corsMiddleware = require('cors');
app.use(corsMiddleware());           // Permet toutes les requêtes
app.use(express.json());             // Parse automatiquement le JSON

// ----------------------------
// Connexion à la DB
// ----------------------------
const database = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// ----------------------------
// Initialisation
// ----------------------------
async function initializeDB() {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      )
    `);

    await database.query(`
      INSERT INTO members (name, email)
      VALUES 
        ('Nawel', 'Nawel@example.com'), 
        ('Mariem', 'Mariem@example.com')
      ON CONFLICT (email) DO NOTHING
    `);

    console.log('DB ready!');
  } catch (error) {
    console.error('DB Error:', error);
  }
}

// ----------------------------
// Routes
// ----------------------------
app.get('/', (req, res) => res.json({ status: 'Backend actif', platform: 'Render' }));

app.get('/api', (req, res) => {
  res.json({
    message: 'Salut depuis Render !',
    dev: ' Nawel Amara',
    timestamp: new Date().toISOString()
  });
});

app.get('/db', async (req, res) => {
  try {
    const { rows } = await database.query('SELECT * FROM members');
    res.json({ ok: true, data: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ----------------------------
// Start server
// ----------------------------
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
  initializeDB();  // Lance l'initialisation DB
});
