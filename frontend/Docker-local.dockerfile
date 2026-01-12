
# Use Node.js version 21.7.0 as the base image
FROM node:21.7.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Using React 19.0.0 stable with Next.js 15
RUN npm ci

# Copy the rest of the application code, except .env
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application in development mode with hot reload
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]