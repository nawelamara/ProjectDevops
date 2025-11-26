# Install build tools
RUN apk add --no-cache python3 make gcc g++

# Install sqlite3 (VERY IMPORTANT)
RUN apk add --no-cache sqlite

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

RUN apk del python3 make gcc g++

RUN mkdir -p /app/database
COPY database/init.sql /app/database/init.sql
COPY backend/. .

# Initialize SQLite database
RUN sqlite3 /app/database/mydb.sqlite < /app/database/init.sql
