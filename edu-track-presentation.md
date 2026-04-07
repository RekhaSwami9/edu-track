# Edu-Track: Faculty Management System

## Presentation for Faculty

### 🎯 What is Edu-Track?

Edu-Track is a **modern web application** for **faculty/teachers** to:

- View daily/weekly schedules
- Manage availability for substitute classes
- Request substitutions when unavailable
- Track leave applications and balance
- Manage 'credits' earned from substitute work
- See dashboard with stats, notices, and quick actions

**Simple Analogy**: Like a 'Google Calendar + HR Portal' but tailored for teacher scheduling and subs!

### 📱 Main Features & Screens

1. **Login** (Secure faculty login)
2. **Dashboard**:
   - Stats cards (credits, classes today)
   - Today's schedule
   - Quick action buttons
   - Notice board
   - Substitution requests
3. **My Availability**: Set free/busy times
4. **My Credits**: Earn/spend credits log
5. **Leave**: Apply and view leaves
6. **Request Substitution**: Find and request subs
7. **Schedule**: Full weekly view
8. **Substitutions**: Browse available faculty
9. **Profile/Settings**: Personal info

### 🛠️ Technologies Used (Full Stack Explained)

Edu-Track uses **MERN Stack** (MongoDB, Express, React, Node.js) – popular for fast web apps.

#### **Frontend** (User Interface - What you interact with)

| Technology                     | Purpose                                                     | Why Chosen?                                      |
| ------------------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| **React 19**                   | Building interactive UI components (Dashboard cards, forms) | Fast, reusable components, huge community        |
| **Vite**                       | Development server & build tool                             | Super fast hot-reload (changes appear instantly) |
| **React Router**               | Navigation between pages                                    | Smooth page switching without reload             |
| **Axios**                      | Calling backend API                                         | Simple HTTP requests to fetch/save data          |
| **Lucide-React & React Icons** | Beautiful icons                                             | Modern, customizable icons for buttons/UI        |
| **CSS Modules/SCSS**           | Styling                                                     | Responsive design (looks good on mobile/desktop) |

#### **Backend** (Server & Data)

| Technology                | Purpose                     | Why Chosen?                                      |
| ------------------------- | --------------------------- | ------------------------------------------------ |
| **Node.js + Express**     | Main server, API routes     | Fast JavaScript server, handles all requests     |
| **MongoDB + Mongoose**    | Database                    | Flexible NoSQL DB for users, schedules, subs     |
| **JWT (JSON Web Tokens)** | Secure login/authentication | Tokens ensure only logged-in users access data   |
| **bcryptjs**              | Password hashing            | Secure password storage (can't be hacked easily) |
| **dotenv**                | Environment variables       | Secure config (DB password, ports)               |
| **CORS**                  | Connect frontend-backend    | Allows browser to talk to server                 |

```
Architecture Flow:
Browser (React) → API Calls (Axios) → Server (Express) → Database (MongoDB)
```

#### **Development Tools**

- **Nodemon** (backend): Auto-restart server on code changes
- **ESLint**: Code quality checks

### 🚀 How to Run (Live Demo Steps)

```bash
# 1. Backend (Data Server)
cd backend
npm install
npm run dev  # Runs on http://localhost:5000

# 2. Frontend (UI)
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

**Open browser** → `http://localhost:5173` → Login → Demo features!

### 📊 Project Status

- **Complete**: All major UI pages (Dashboard, Schedule, Leaves, Subs)
- **Ready for**: User testing, minor styling tweaks
- **Future**: Admin panel, notifications, mobile app

### ✨ Benefits for Faculty

- **Time-Saving**: Digital over manual coordination
- **Real-Time Updates**: Instant sub requests/approvals
- **Paperless**: Track everything online
- **Secure & Private**: Faculty-only access

**Thank You! Questions?**

_Built with ❤️ for efficient faculty management_
