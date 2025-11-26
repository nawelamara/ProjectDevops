# Utilisation d'une image Node.js officielle
FROM node:18-alpine

# Installer les outils de compilation pour sqlite3, etc.
RUN apk update && apk add --no-cache python3 make gcc g++

# Répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Nettoyer les outils de build pour alléger l'image
RUN apk del python3 make gcc g++

# Créer le dossier pour la base de données
RUN mkdir -p /app/database

# Copier le fichier init.sql depuis le dossier database à la racine du projet
COPY ../database/init.sql /app/database/

# Copier le reste du code de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
