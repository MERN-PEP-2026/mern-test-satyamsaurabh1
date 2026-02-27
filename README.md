# Task Management System

This is my MERN task manager project.

I built it as a full-stack app with login/register, protected task APIs, and a React dashboard where each user can manage only their own tasks.

## What the app does

- User registration and login with JWT
- Create, view, update, and delete tasks
- Filter tasks by status (`pending` / `completed`)
- Logout and protected dashboard route
- Extra website pages with navbar (`Home`, `Features`, `About`, `Contact`)

## Tech stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React (Vite), React Router, Axios

## API routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks (protected)
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Project folders

- `backend` - API, models, controllers, middleware
- `frontend` - React UI

## How to run

### Option 1: Run from root (recommended)

```bash
npm install
npm run install:all
npm run dev
```

### Option 2: Run separately

Backend terminal:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Frontend terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm start
```

## Environment setup

In `backend/.env` set:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional, default 5000)

In `frontend/.env` set:

- `VITE_API_BASE_URL` (default `http://localhost:5000/api`)

## Notes

- If port `5000` is already in use, backend will move to the next free port.
- Frontend usually runs on `http://localhost:5173` (or another free Vite port).
