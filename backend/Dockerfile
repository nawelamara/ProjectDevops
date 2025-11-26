FROM node:18-alpine

# Install build tools
RUN apk update && apk add --no-cache python3 make gcc g++

# Working directory
WORKDIR /app

# Copy only backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Remove build tools
RUN apk del python3 make gcc g++

# Create database folder
RUN mkdir -p /app/database

# Copy SQL file from database folder in the root build context
COPY database/init.sql /app/database/

# Copy backend source code
COPY backend/. .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
