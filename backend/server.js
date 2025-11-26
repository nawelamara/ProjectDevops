const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST || 'db', 
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'mydb',
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false
});

async function setupDatabase() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      )
    `);

    await db.query(`
      INSERT INTO users (name, email) VALUES
      ('Mariem', 'Mariem@example.com'),
      ('Malek', 'Malek@example.com'),
      ('Nawel', 'Nawel@example.com')
      ON CONFLICT (email) DO NOTHING
    `);

    console.log('Base prête à l’emploi !');
  } catch (err) {
    console.error('Erreur DB:', err.message);
  }
}

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
