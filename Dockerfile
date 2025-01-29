# Use a supported Node.js version
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including NestJS CLI
RUN npm install && npx @nestjs/cli build

# Copy the entire app code
COPY . .

# Build the application
RUN npm run build

# Expose the port for the app
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
