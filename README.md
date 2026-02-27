Task Management System

This is a full-stack Task Management System built using the MERN stack.
I created this project to practice authentication, protected routes, and full CRUD operations in a real-world style application.

The app allows users to create an account, log in securely, and manage their personal tasks. Each user can only see and manage their own tasks.

What This App Can Do

User registration and login

Secure authentication using JWT

Protected dashboard route

Create, view, update, and delete tasks

Filter tasks by status (Pending / Completed)

Logout functionality

Additional pages like Home, Features, About, and Contact

Tech Stack Used

Backend:

Node.js

Express.js

MongoDB

Mongoose

JWT

Frontend:

React (Vite)

React Router

Axios

Project Structure

The project has one main folder with two subfolders:

backend → Contains API logic, models, controllers, and middleware

frontend → Contains the React user interface

This separation keeps the project clean and organized.

How To Run The Project

You can either run the entire project from the root folder or run backend and frontend separately.

Make sure:

MongoDB is running (or use MongoDB Atlas)

Environment variables are properly configured

Dependencies are installed in both folders

The backend usually runs on port 5000.
The frontend usually runs on port 5173.

If port 5000 is already in use, the backend automatically switches to the next available port.

Environment Setup

Backend requires:

MongoDB connection string

JWT secret key

Optional port number

Frontend requires:

API base URL (usually pointing to the backend server)

Purpose of This Project

This project helped me understand:

How authentication works in real applications

How to protect API routes

How frontend and backend communicate

How to structure a full-stack MERN project

Author

Satyam Saurabh
