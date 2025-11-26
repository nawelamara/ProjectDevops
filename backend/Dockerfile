FROM node:18-alpine

# Install build tools + sqlite
RUN apk add --no-cache python3 make gcc g++ sqlite

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Create database folder
RUN mkdir -p /app/database

# Copy init.sql from database folder at root
COPY ../database/init.sql /app/database/init.sql

# Copy backend source code
COPY . .

# Initialize SQLite database
RUN sqlite3 /app/database/mydb.sqlite < /app/database/init.sql

EXPOSE 3000
CMD ["node", "server.js"]
