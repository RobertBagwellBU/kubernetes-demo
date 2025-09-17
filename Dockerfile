FROM node:18-alpine AS base
WORKDIR /app

# Install deps separately to leverage Docker cache
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy app files
COPY . .

# Run as non-root user for better security (alpine node image has a user 'node' with uid 1000)
USER node
EXPOSE 3000
CMD ["npm", "start"]