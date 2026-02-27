# Task Management System (MERN)

This project implements the assignment requirements from **Task Management System.pdf**.

## Features Implemented

### Backend (Node.js + Express + MongoDB)
- User auth APIs:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Protected task APIs:
  - `POST /api/tasks`
  - `GET /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Uses Express Router, Mongoose models, JWT auth middleware, and error handling.
- Task model includes: `title`, `description`, `status`, `createdBy`, `createdAt`.

### Frontend (React)
- Register page
- Login page
- Dashboard page
- Dashboard supports:
  - View all tasks
  - Create task
  - Update task status
  - Delete task
- Uses `useState`, `useEffect`, and Axios.

### Integration & Authentication
- Frontend connected to backend APIs.
- JWT token stored in `localStorage`.
- Protected route for dashboard.
- Dashboard shows logged-in user task list.

### Advanced Feature
- Added both:
  - Filter tasks by status
  - Logout functionality

## Project Structure

- `backend/` - Express API server
- `frontend/` - React Vite app

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# update JWT_SECRET and MONGO_URI in .env if needed
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on Vite default port (`5173`) and talks to backend at `http://localhost:5000/api`.
