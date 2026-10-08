# Commands and Notes

## Docker commands
# To stop the project:

# To start it again:

# However, there are variations depending on what you're doing:

# Command	Use Case
docker-compose up --build	[First time OR after code changes (rebuilds images)]
docker-compose up	[Just restarting (no code changes, faster)]
docker-compose down	[Stop and remove containers (data in volumes persists)]
docker-compose down -v	[Stop AND delete all data (clean slate)]

# Your typical workflow:

# First time: 
docker-compose up --build 
# Make code changes: 
docker-compose down → docker-compose up --build
# Just restarting: 
docker-compose down → docker-compose up (optional --build if needed)
# Clean restart: 
docker-compose down -v → docker-compose up --build (wipes database)

# For your teammates:
Always use docker-compose up --build when pulling new changes to ensure images are rebuilt with latest code.

## Commands

// Frontend

npm install
npm install react-router-dom
npm install axios react-hot-toast
npm install react-hot-toast --save    (if hot-toast error appear bash this)
cd frontend
npm run dev

// Backend

npm install
npm install express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer stripe validator nodemon nodemailer
cd backend
npm run server

// Admin Panel

npm install
npm install axios react-toastify react-router-dom
cd admin
npm run dev

// Chat Feature
npm install
npm install react-router-dom
npm install bcryptjs cloudinary cors dotenv express jsonwebtoken mongoose socket.io
npm install nodemon
cd client
npm run dev
cd server
npm run server

## SonarQube Setup

### 1. Run SonarQube Locally (Docker)
```bash
# 1. Start SonarQube server container
docker-compose up -d sonarqube

# 2. Access SonarQube web UI
# URL: http://localhost:9000
# Default Login: admin / admin (change password upon first login)

# 3. Generate a project token:
# Go to: User Profile > My Account > Security > Generate Token (e.g., name it 'local-token')

# 4. Run the scan locally using Docker:
docker compose --profile sonar-scan run --rm -e SONAR_TOKEN="<YOUR_COPIED_TOKEN>" sonar-scanner
```

### 2. GitHub Actions Secrets for CI/CD Pipeline
In your GitHub repository (**Settings > Secrets and variables > Actions > New repository secret**), add:
- `SONAR_TOKEN`: User token generated in SonarQube (or SonarCloud) under **My Account > Security > Generate Token**.
- `SONAR_HOST_URL`: The URL of your SonarQube server (e.g., `http://your-server-ip:9000` or `https://sonarcloud.io` if using SonarCloud).