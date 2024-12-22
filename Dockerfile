# Use Node.js Alpine as base image for smaller size
FROM node:20-alpine

# Add build dependencies
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Install dependencies first (caching layer)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Use non-root user for security
USER node

# Expose custom port
EXPOSE 999666

# Start the application
CMD ["npm", "run", "preview", "--", "--port", "999666", "--host"]