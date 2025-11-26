FROM node:18-alpine

# Install build tools
RUN apk add --no-cache python3 make gcc g++ sqlite

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Remove extra build deps (optional)
RUN apk del python3 make gcc g++

# Create database folder
RUN mkdir -p /app/database

# Copy SQL init script
COPY database/init.sql /app/database/init.sql

# Copy backend source code
COPY backend/. .

# Initialize SQLite database
RUN sqlite3 /app/database/mydb.sqlite < /app/database/init.sql

EXPOSE 3000
CMD ["npm", "start"]
