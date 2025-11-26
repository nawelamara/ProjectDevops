# Utiliser une image SQLite légère
FROM nouchka/sqlite3:latest

# Créer le dossier pour la base de données
RUN mkdir -p /app/database

# Copier le fichier SQL d'initialisation dans le conteneur
COPY init.sql /app/database/init.sql

# Définir le répertoire de travail
WORKDIR /app/database

# Exécuter le script SQL pour créer la base et les tables
RUN sqlite3 mydb.sqlite < init.sql
