# Base image that only copies files over
FROM public.ecr.aws/z9b7l4y2/node-temp:12.14.1 as base

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json over and run install
COPY package*.json ./
RUN npm install

# Copy files from host
COPY . .


# Production image that runs the build
FROM base AS production

# Copy files from base
COPY --from=base /usr/src/app /usr/src/app

# Run the build once everything has been copied over
RUN npm run next:build

EXPOSE 3000

CMD ["npm", "start"]
