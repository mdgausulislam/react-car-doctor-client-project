# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /Main

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .


# Start your React app
CMD ["npm", "run", "dev"]