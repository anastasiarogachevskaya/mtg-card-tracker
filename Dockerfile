# Base image that only copies files over
FROM public.ecr.aws/z9b7l4y2/node-temp:12.14.1 as base

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json .
RUN npm install

# Copying source files
COPY . .

# Production image that runs the build
FROM base AS production

# Building app
RUN npm run build

EXPOSE 3000

# Running the app
CMD ["npm", "run", "start"]