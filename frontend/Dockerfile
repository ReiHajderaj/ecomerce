# Use the official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock to install dependencies
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the Vue.js app
COPY . .

# Build the Vue.js app for production
RUN npm run build

RUN npm install -g serve
# Expose the port that the app runs on (for local dev)
EXPOSE 8080

# Start the Vue.js application
# Start the Vue.js application using `serve`
CMD ["serve", "-s", "dist", "-l", "8080"]