FROM node:22

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install -g npm@latest && npm ci

# Copy source and build
COPY . .
RUN npm run build

# Clean up dev dependencies after build
RUN npm prune --production

EXPOSE 3000
CMD ["npm", "start"] 