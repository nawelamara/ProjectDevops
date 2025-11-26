# Utilisation d'une image Node.js officielle
FROM node:18-alpine

# Mettre à jour et installer les outils de construction (build-essentials) nécessaires 
# pour compiler les dépendances natives comme 'sqlite3'.
RUN apk update && apk add --no-cache python3 make gcc g++

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et installer les dépendances
# IMPORTANT : J'utilise ici les chemins corrigés lors de l'étape précédente.
COPY backend/package*.json ./ 
# L'installation se fait AVEC les outils de compilation
RUN npm install

# Nettoyage : Suppression des outils de construction pour alléger l'image finale.
RUN apk del python3 make gcc g++

# Créer le dossier pour la base de données
RUN mkdir -p /app/database

# Copier le fichier init.sql dans le dossier de la base de données dans le conteneur
COPY database/init.sql /app/database/

# Copier le reste du code de l'application (comme server.js)
COPY backend/. .

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
