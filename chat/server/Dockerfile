# Stage 1: Dependencies stage
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Security: run as non-root user
RUN chown -R node:node /app
USER node

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5001/api/status', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the server directly with Node
CMD ["node", "server.js"]
