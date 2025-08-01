# Stage 1: Get certificates
FROM amr-registry.caas.intel.com/intel-hub/intel-trust-chain as certs

# Stage 2: Build the application
FROM cache-registry.caas.intel.com/cache/library/node:20-alpine as build

# Copy certificates from the first stage
COPY --from=certs /certs /usr/local/share/ca-certificates

# Set environment variables for proxy and certificates
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
ENV HTTP_PROXY=http://proxy-dmz.intel.com:912
ENV HTTPS_PROXY=http://proxy-dmz.intel.com:912
ENV NO_PROXY=localhost,127.0.0.0/8,10.0.0.0/8,.intel.com
ENV http_proxy=http://proxy-dmz.intel.com:912
ENV https_proxy=http://proxy-dmz.intel.com:912
ENV no_proxy=localhost,127.0.0.0/8,10.0.0.0/8,.intel.com

# Update CA certificates and set npm proxy configuration
RUN apk add --no-cache ca-certificates && \
    update-ca-certificates && \
    npm config set proxy=http://proxy-dmz.intel.com:912 && \
    npm config set https-proxy=http://proxy-dmz.intel.com:912

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# RUN npm install
RUN npm install

# Copy the rest of the application code
COPY . .

# Set Node.js options
#ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the application
RUN npm run build

FROM nginx:alpine

COPY --from=build /app /app

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
#COPY --from=build /app/build/nginx.conf /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]