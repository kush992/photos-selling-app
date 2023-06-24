# Use an official Node.js image as the base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if using npm) or yarn.lock (if using Yarn)
COPY package.json .
COPY package-lock.json .
# COPY yarn.lock .

# Install project dependencies
RUN npm install
# Or, if you're using Yarn:
# RUN yarn install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build
# Or, if you're using Yarn:
# RUN yarn build

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the port your Vite app will run on
EXPOSE 3000

# Start the Vite server
CMD npm run dev
# Or, if you're using Yarn:
# CMD [ "yarn", "serve" ]
