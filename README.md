# Servants Web App

---

## Overview

Servants Web App is a comprehensive management system designed for organizations (like churches) to coordinate servants, services, and roles. It provides a streamlined interface for both users and administrators to manage schedules, track service openings, handle role assignments, and communicate in real time.

## Tech Stack

### Frontend
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Routing:** React Router 7
- **Icons:** Lucide React & Heroicons
- **Date Handling:** date-fns
- **Utility:** tailwind-merge

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Storage:** Multer & Cloudinary
- **Real-time:** WebSocket (`ws`)
- **Logging:** Pino & pino-http
- **Task Scheduling:** node-cron
- **Messaging:** Twilio

## Features

- **Multi-Level Authentication:** Separate registration and login flows for users and administrators, with role-based protected routes.
- **Password Recovery:** "Forgot Password" functionality for users to securely regain access to their accounts.
- **Dashboard:** At-a-glance view of upcoming services, active roles, and organizational statistics.
- **Service Management:** Admins can create, edit, and delete services, including specific opening slots.
- **Role System:** Flexible role management allowing admins to assign or relieve specific responsibilities to servants.
- **Openings:** Servants can view and sign up for open service slots.
- **Schedule Tracking:** Comprehensive view of service schedules and volunteer assignments.
- **Real-time Chat & File Uploads:** Live messaging between users powered by WebSockets, with a dedicated `Chats` page. Users can attach files and preview pictures before sending them. Includes robust error handling for connection stability.
- **Admin Panel:** Dedicated admin pages for managing users, admissions, roles, and services.
- **Responsive Interface:** Optimized for both desktop and mobile devices.

## Project Structure

```text
servants/
├── client/                       # React frontend
│   ├── src/
│   │   ├── api.ts                # API client configuration
│   │   ├── App.tsx               # Main application component
│   │   ├── index.css             # Global styles
│   │   ├── main.tsx              # Application entry point
│   │   ├── assets/               # Static assets and icons
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── ButtonLink.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Form.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── RolesCard.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── UpcomingServices.tsx
│   │   │   ├── UpcomingServicesAdmin.tsx
│   │   │   └── UpcomingServicesMobile.tsx
│   │   ├── context/              # Auth and global state
│   │   │   ├── AuthContext.tsx
│   │   │   └── AuthProvider.tsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useChatSocket.ts
│   │   ├── pages/                # Full-page components
│   │   │   ├── Home.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── Openings.tsx
│   │   │   ├── Chats.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── LoginAdmin.tsx
│   │   │   ├── RegisterAdmin.tsx
│   │   │   ├── CreateService.tsx
│   │   │   ├── AdminServices.tsx
│   │   │   ├── AdminRoles.tsx
│   │   │   ├── AdminAdmissions.tsx
│   │   │   └── AdminUsers.tsx
│   │   └── utils/                # Helper functions
│   │       ├── functions.ts
│   │       └── tokenUtils.ts
│   └── vercel.json               # Vercel routing config
├── server/                       # Express backend
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes.js         # API router entry point
│   │   │   └── components/       # Feature modules (Controller-Service-Repository)
│   │   │       ├── assignments/
│   │   │       ├── chats/
│   │   │       ├── file/
│   │   │       ├── roles/
│   │   │       ├── services/
│   │   │       └── users/
│   │   ├── core/                 # Server configuration and middleware
│   │   │   ├── app.js
│   │   │   ├── cloudinary.js
│   │   │   ├── config.js
│   │   │   ├── errors.js
│   │   │   ├── logger.js
│   │   │   ├── webSocket.js
│   │   │   └── middlewares/
│   │   │       ├── auth.js
│   │   │       └── upload.js
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── assignments-schema.js
│   │   │   ├── chats-schema.js
│   │   │   ├── index.js
│   │   │   ├── roles-schema.js
│   │   │   ├── services-schema.js
│   │   │   └── users-schema.js
│   │   ├── utils/                # Security and helper utilities
│   │   │   ├── password.js
│   │   │   └── uploadToCloudinary.js
│   │   └── server.js             # Entry point
│   └── .env.example
```

## Environment Variables

### Server (`server/.env`)
| Variable | Description |
|---|---|
| `NODE_ENV` | Application environment (`development` \| `production`) |
| `PORT` | Server port (default: `5000`) |
| `DB_CONNECTION` | MongoDB connection string |
| `DB_NAME` | MongoDB database name |
| `JWT_SECRET` | Secret key for JWT signing |
| `CORS_ORIGIN` | Allowed origin for frontend requests (e.g., your Vercel URL) |
| `TWILIO_ACCOUNT_SID` | Twilio account SID for messaging |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token |
| `TWILIO_VERIFY_SERVICE_SID` | Twilio verify service SID |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for file storage |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Client (`client/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | The base URL for the backend API |

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- A running MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd servants
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure Backend Environment**
   ```bash
   cp .env.example .env
   # Fill in the values in .env
   ```

4. **Install Frontend Dependencies**
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

The client will be available at `http://localhost:5173` and the API at `http://localhost:5000` by default.

## API Routes

The backend exposes a REST API under `/api` with the following resource groups:

| Resource | Description |
|---|---|
| `/api/users` | User registration, login, and profile management |
| `/api/services` | Service creation, retrieval, and management |
| `/api/roles` | Role assignment and management |
| `/api/assignments` | Servant-to-service assignment operations |
| `/api/chats` | Chat message persistence and retrieval |
| `/api/file` | File upload handling and management |

Real-time chat is handled over a WebSocket connection managed by `webSocket.js`.

## Deployment

### Frontend
The frontend is configured for deployment on **Vercel**. A `vercel.json` is included to handle client-side routing rewrites.
- Ensure `VITE_API_URL` is set in your Vercel project's environment variables.

### Backend
The backend can be deployed to any Node.js hosting provider (e.g., Render, Railway, Heroku).
- Ensure all environment variables from `server/.env.example` are configured in the hosting environment.
- The server includes `trust proxy` configuration for secure operation behind reverse proxies.
- Use `npm start` (runs `node ./src/server.js`) for production instead of `npm run dev`.
