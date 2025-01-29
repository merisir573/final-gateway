# Use a supported Node.js version
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including NestJS CLI
RUN npm install && npm install -g @nestjs/cli

# Copy the entire app code
COPY . .

# Expose the port for the app
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
