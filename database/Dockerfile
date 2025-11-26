# Utiliser une image SQLite de base
FROM nouchka/sqlite3:latest

# Créer un dossier pour la base de données dans le conteneur
RUN mkdir -p /app/database

# Copier le fichier SQL d'initialisation dans le conteneur
COPY init.sql /app/database/init.sql

# Définir le répertoire de travail
WORKDIR /app/database

# Exécuter le script SQL pour initialiser la base de données
RUN sqlite3 mydb.sqlite < init.sql

# Exposer le port si nécessaire (ici pour un usage futur, mais pas directement utile pour SQLite)
EXPOSE 3306
