# FlexTask Suite

This is a personal workflow manager built with the MERN stack.

I developed this to handle daily task tracking with user-based data isolation. It features a custom backend for identity management and a React-based frontend for the dashboard.

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

### User Data
- `POST /v1/auth/register`
- `POST /v1/auth/login`

### Content Workspace (protected)
- `POST /v1/tasks`
- `GET /v1/tasks`
- `PUT /v1/tasks/:id`
- `DELETE /v1/tasks/:id`

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

- `VITE_API_BASE_URL` (default `http://localhost:5000/v1`)

## Notes

- If port `5000` is already in use, backend will move to the next free port.
- Frontend usually runs on `http://localhost:5173` (or another free Vite port).
