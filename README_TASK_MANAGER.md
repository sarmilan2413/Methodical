# Task Manager App

A full-stack task management system with secure user authentication and real-time task operations.

## Project Overview

Task Manager App is a modern web application that allows users to efficiently manage their tasks. Users can register, log in securely, and perform complete CRUD operations on tasks with a responsive and intuitive interface. The application implements JWT-based authentication to ensure that all task operations are protected and only accessible to authenticated users.

## Features

- **User Registration & Login**: Create an account and log in securely with email and password validation
- **Secure Authentication**: JWT-based token authentication system with secure token storage
- **Protected Routes**: All task-related operations require valid JWT authentication
- **Full CRUD Operations**: Create, read, update, and delete tasks with ease
- **Task Management**: Organize and track tasks efficiently
- **Responsive UI**: Modern, mobile-friendly interface that works on all devices
- **Role-Based Access**: Users can only access their own tasks

## Tech Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing and navigation
- **Axios/Fetch API** - HTTP client for API communication

### Backend
- **NestJS** - Progressive Node.js framework for building scalable server-side applications
- **TypeScript** - Type-safe server-side code
- **PostgreSQL** - Reliable relational database
- **Prisma** - Modern ORM for database operations
- **JWT (JsonWebToken)** - Secure token-based authentication
- **Bcrypt** - Password hashing and security

### Database
- **PostgreSQL** - Production-grade relational database

### Authentication
- **JWT (JSON Web Tokens)** - Stateless authentication mechanism

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   ├── lib/            # Utility functions and API calls
│   │   ├── styles/         # Global styles and Tailwind config
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── .env                # Frontend environment variables
│
├── backend/
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── dto/        # Data transfer objects
│   │   │   └── strategies/ # JWT strategies
│   │   ├── users/          # Users module
│   │   ├── tasks/          # Tasks module
│   │   ├── app.module.ts   # Root module
│   │   └── main.ts         # Application entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
│
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Clone Repository

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

### Install Dependencies

#### Backend Setup

```bash
cd backend
npm install
```

#### Frontend Setup

```bash
cd ../frontend
npm install
```

### Setup Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"

# Server Configuration
PORT=3000
NODE_ENV=development
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
```

### Database Setup

1. Create a PostgreSQL database:

```bash
createdb task_manager_db
```

2. Run Prisma migrations:

```bash
cd backend
npx prisma migrate dev --name init
```

3. (Optional) Seed the database:

```bash
npx prisma db seed
```

## How to Run Locally

### Start Backend Server

```bash
cd backend
npm run start:dev
```

The backend server will start on `http://localhost:3000`

### Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:8080` (or the next available port)

### Access the Application

Open your browser and navigate to:

```
http://localhost:8080
```

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/task_manager_db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-secret-key-here` |
| `JWT_EXPIRATION` | JWT token expiration time | `7d` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201):
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-31T10:00:00Z"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-31T10:00:00Z"
  }
}
```

### Task Endpoints

**All task endpoints require JWT authentication. Include the token in the Authorization header:**

```
Authorization: Bearer <your-jwt-token>
```

#### Get All Tasks
```
GET /api/tasks
Authorization: Bearer <token>

Response (200):
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "in-progress",
    "dueDate": "2024-04-15",
    "createdAt": "2024-03-31T10:00:00Z",
    "updatedAt": "2024-03-31T10:00:00Z"
  }
]
```

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "pending",
  "dueDate": "2024-04-15"
}

Response (201):
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "pending",
  "dueDate": "2024-04-15",
  "createdAt": "2024-03-31T10:00:00Z",
  "updatedAt": "2024-03-31T10:00:00Z"
}
```

#### Get Task by ID
```
GET /api/tasks/:id
Authorization: Bearer <token>

Response (200):
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "in-progress",
  "dueDate": "2024-04-15",
  "createdAt": "2024-03-31T10:00:00Z",
  "updatedAt": "2024-03-31T10:00:00Z"
}
```

#### Update Task
```
PATCH /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "title": "Complete project",
  "status": "completed"
}

Response (200):
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "completed",
  "dueDate": "2024-04-15",
  "createdAt": "2024-03-31T10:00:00Z",
  "updatedAt": "2024-03-31T12:30:00Z"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response (204): No Content
```

### User Endpoints

#### Get Current User Profile
```
GET /api/users/me
Authorization: Bearer <token>

Response (200):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-03-31T10:00:00Z"
}
```

## Authentication Flow

1. **User Registration**
   - User fills out registration form with name, email, and password
   - Frontend sends POST request to `/api/auth/register`
   - Backend validates input and checks for existing email
   - Password is hashed using bcrypt
   - User record is created in database
   - JWT token is generated and returned

2. **User Login**
   - User enters email and password
   - Frontend sends POST request to `/api/auth/login`
   - Backend validates credentials against hashed password
   - If valid, JWT token is generated and returned
   - If invalid, 401 Unauthorized error is returned

3. **Token Storage**
   - Frontend receives JWT token from response
   - Token is stored in localStorage or sessionStorage
   - Token is automatically attached to subsequent API requests

4. **Protected Routes**
   - Frontend checks if token exists before allowing access to protected pages
   - If no token, user is redirected to login page

5. **Authenticated Requests**
   - JWT token is included in Authorization header: `Bearer <token>`
   - Backend verifies token signature and expiration
   - If valid, request proceeds; if invalid, 401 response is returned

6. **Token Expiration**
   - Token expires after configured duration (default: 7 days)
   - User must log in again to get a new token

## Notes & Assumptions

- **Email Uniqueness**: Email addresses are unique across the system; registration fails if email already exists
- **Password Security**: Passwords are hashed using bcrypt with salt rounds of 10
- **Token Storage**: JWT tokens are stored in the browser's localStorage (consider using HttpOnly cookies for production)
- **CORS**: Backend is configured to accept requests from frontend origins
- **Validation**: Server-side validation is performed on all inputs using class-validator
- **Database**: PostgreSQL is required; SQLite is not recommended for production
- **Database Connection**: Ensure PostgreSQL service is running before starting the backend
- **Environment Variables**: All sensitive values must be kept in `.env` files and never committed to version control
- **User Isolation**: Users can only access their own tasks; queries are filtered by user ID

## Future Improvements

- **Task Categories/Tags**: Organize tasks by categories or tags
- **Task Priority Levels**: Add priority levels (High, Medium, Low) to tasks
- **Task Recurrence**: Support recurring tasks (daily, weekly, monthly)
- **Email Notifications**: Send email reminders for upcoming deadlines
- **Collaboration**: Allow users to share tasks and collaborate in teams
- **Task Attachments**: Support file attachments to tasks
- **Activity Logging**: Track changes and history for tasks
- **Advanced Search & Filtering**: Full-text search and advanced filtering options
- **Dark Mode**: Implement dark mode theme
- **Mobile App**: Develop native mobile applications for iOS and Android
- **Real-time Updates**: Implement WebSocket for real-time task updates
- **Task Analytics**: Dashboard with task completion statistics and insights
- **Two-Factor Authentication**: Add 2FA for enhanced security
- **Refresh Tokens**: Implement refresh token mechanism for better security

## Deployment

### Frontend Deployment

#### Option 1: Vercel (Recommended for Vite/React)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
4. Deploy with a single click

**Frontend URL**: `https://your-app.vercel.app`

#### Option 2: Netlify

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables

### Backend Deployment

#### Option 1: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set DATABASE_URL="postgresql://..."
   heroku config:set JWT_SECRET="your-secret"
   ```
5. Deploy: `git push heroku main`

**Backend URL**: `https://your-app-name.herokuapp.com`

#### Option 2: Railway / Render

1. Connect GitHub repository
2. Configure build and start commands
3. Set environment variables in dashboard
4. Deploy automatically on push

### Database Deployment

#### PostgreSQL on Cloud

- **Option 1**: Use managed PostgreSQL service (AWS RDS, Heroku Postgres, Railway)
- **Option 2**: Self-hosted on VPS (DigitalOcean, Linode, AWS EC2)

Update `DATABASE_URL` in backend environment variables with the cloud database connection string.

---

## Contact & Support

For questions or issues, please open a GitHub issue or reach out to the development team.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
