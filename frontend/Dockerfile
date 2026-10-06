# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package definitions
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application source code and environment file
COPY . .
COPY .env* ./

# Build production bundle
RUN npm run build

# Stage 2: Production runtime stage
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5174

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
