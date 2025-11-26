const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données SQLite
const dbPath = path.join(__dirname, 'database', 'mydb.sqlite');
const db = new sqlite3.Database(dbPath);

// Middleware pour gérer CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: [
    "http://localhost:8080", // Frontend local
    "http://127.0.0.1:8080", // Frontend local
    "http://tp-frontend:8080", // Frontend dans Docker
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// Exemple de route pour récupérer tous les utilisateurs depuis la base de données SQLite
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      // Si erreur de base de données, retourner une erreur 500
      res.status(500).json({ message: "Database error", error: err });
      return;
    }
    // Si tout va bien, renvoyer les utilisateurs sous forme de JSON
    res.json({ users: rows });
  });
});

// Exemple de route pour ajouter un utilisateur (facultatif)
app.post("/api/users", express.json(), (req, res) => {
  const { name, email } = req.body;
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");

  stmt.run(name, email, function (err) {
    if (err) {
      return res.status(500).json({ message: "Failed to insert user", error: err });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });

  stmt.finalize();
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
