# Servants Web App

---

## Development Setup

1. Install the recommended VS Code extensions: `ESLint`.
2. Copy and rename `.env.example` to `.env` inside the server folder.
3. Open `.env` and set the enviroment variables.
4. In the `package.json` file inside client folder, there should be "build": "tsc -b && vite build", but `tsc -b` is removed since it stops vercel from running because of the typescript check.

---

## Overview

Servants Web App is a comprehensive management system designed for organizations (like churches) to coordinate servants, services, and roles. It provides a streamlined interface for both users and administrators to manage schedules, track service openings, and handle role assignments.

## Tech Stack

### Frontend
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Icons:** Lucide React & Heroicons
- **Date Handling:** date-fns

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Logging:** Pino & pino-http
- **Task Scheduling:** node-cron

## Features

- **Multi-Level Authentication:** Separate registration and login flows for users and administrators.
- **Dashboard:** At-a-glance view of upcoming services, active roles, and organizational statistics.
- **Service Management:** Admins can create, edit, and delete services, including specific opening slots.
- **Role System:** Flexible role management allowing admins to assign or relieve specific responsibilities to servants.
- **Schedule Tracking:** Comprehensive view of service schedules and volunteer assignments.
- **Responsive Interface:** Optimized for both desktop and mobile devices.

## Project Structure

```text
servants/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth and global state
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Full-page components
│   │   └── utils/          # Helper functions
├── server/                 # Express backend
│   ├── src/
│   │   ├── api/            # Route definitions
│   │   ├── components/     # Modular business logic (Controller-Service-Repository)
│   │   ├── core/           # Server configuration and middleware
│   │   ├── models/         # Mongoose schemas
│   │   └── utils/          # Security and helper utilities
```

## Environment Variables

### Server (`server/.env`)
- `PORT`: Server port (default: 5000)
- `DB_CONNECTION`: MongoDB connection string
- `JWT_SECRET`: Secret key for token signing
- `CORS_ORIGIN`: Allowed origin for frontend requests

### Client (`client/.env`)
- `VITE_API_URL`: The base URL for the backend API

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- MongoDB instance

### Installation

1. **Clone the repository**
2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```
3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```
2. **Start the Client**
   ```bash
   cd client
   npm run dev
   ```

## Deployment

### Frontend
The frontend is configured for deployment on **Vercel**. It includes a `vercel.json` for handling client-side routing.
- Ensure `VITE_API_URL` is set in your Vercel project's environment variables.
- Note: The `tsc -b` check has been removed from the build script to ensure successful Vercel builds.

### Backend
The backend can be deployed to any Node.js hosting provider (e.g., Heroku, Render, Railway).
- Ensure all environment variables from `.env.example` are configured in the hosting environment.
- The server includes `trust proxy` configuration for secure operation behind reverse proxies.

