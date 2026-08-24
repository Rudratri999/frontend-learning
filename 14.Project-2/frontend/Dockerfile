# Stage- 1 Build 

# It Build Image As Builder
FROM node:22 AS builder

# Creates The Folder Inside /app
WORKDIR /app

# 2. Accept the routing URL as a build argument
ARG VITE_API_URL
# 3. Expose it to the framework's build environment
ENV VITE_API_URL=$VITE_API_URL


# It Copies The Packages Into The /app
COPY package*.json .

# And Run The Command Inside The /app
# It preferd For docker/ci setup it install clean dependencies
RUN npm ci

# Copy from frontend To /app
COPY . .

# When We Ran this it creates /app/dist
RUN npm run build

# Stage - 2 Run Stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Your computer       Container
# localhost:5173  →   nginx:80
EXPOSE 80

# nginx = is web server browser -> nginx -> /dist
# Without nginx == browser -> vite server
CMD ["nginx", "-g", "daemon off;"]

# builder stage
#       │
#       │ /app/dist
#       ↓
# nginx stage
#       │
#       │ /usr/share/nginx/html
#       ↓
#      Nginx
#       ↓
#    Browser