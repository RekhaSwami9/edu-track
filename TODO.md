# Edu-Track Credit-Based Substitution System - TODO

## Phase 1: Database Schema ✅ COMPLETE

- [x] User model (faculty/admin roles)
- [x] Availability model (faculty availability slots)
- [x] CreditTransaction model (credit tracking)
- [x] Substitution model (substitution requests)
- [x] Leave model (leave management)

## Phase 2: Backend APIs ✅ COMPLETE

- [x] Auth APIs (login, register, JWT)
- [x] Availability APIs (CRUD, toggle status, find available)
- [x] Credit APIs (balance, transactions, stats, leaderboard)
- [x] Substitution APIs (request, accept, decline, complete, cancel)
- [x] Leave APIs (apply, approve, reject, cancel)
- [x] Middleware (auth protection, admin only)

## Phase 3: Frontend Components ✅ COMPLETE

- [x] MyAvailability page (set availability, toggle status)
- [x] MyCredits page (view balance, transaction history)
- [x] RequestSubstitution page (create substitution requests)
- [x] SubstitutionRequests page (view and manage requests)
- [x] API integration with backend
- [x] Navigation and routing

## Phase 4: Testing & Integration ✅ COMPLETE

- [x] Backend server running on port 5001
- [x] MongoDB connected
- [x] Frontend running on port 5191
- [x] API endpoints tested and working

## Next Steps (Optional Enhancements)

- [ ] Add real-time notifications (Socket.io)
- [ ] Email notifications for substitutions
- [ ] Admin dashboard for managing all requests
- [ ] Analytics and reporting
- [ ] Mobile responsiveness improvements
- [ ] Unit and integration tests

## Running the Application

### Backend

```bash
cd backend
npm start
```

Server runs on http://localhost:5001

### Frontend

```bash
cd frontend
npm run dev
```

App runs on http://localhost:5191

## API Documentation

### Auth Endpoints

- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Availability Endpoints

- GET /api/availability/:facultyId - Get faculty availability
- PUT /api/availability/:facultyId - Update availability
- PATCH /api/availability/:facultyId/toggle - Toggle status
- GET /api/availability/find/available - Find available faculties

### Credit Endpoints

- GET /api/credits/balance/:facultyId - Get credit balance
- GET /api/credits/transactions/:facultyId - Get transaction history
- GET /api/credits/stats/:facultyId - Get credit stats
- GET /api/credits/leaderboard - Get faculty leaderboard

### Substitution Endpoints

- POST /api/substitution/request - Request substitution
- GET /api/substitution/my-requests - Get my requests
- GET /api/substitution/my-substitutions - Get my substitutions
- GET /api/substitution/notifications - Get pending notifications
- POST /api/substitution/:id/accept - Accept substitution
- POST /api/substitution/:id/decline - Decline substitution
- POST /api/substitution/:id/complete - Complete substitution
- POST /api/substitution/:id/cancel - Cancel substitution
- GET /api/substitution/stats - Get substitution stats

### Leave Endpoints

- POST /api/leave/apply - Apply for leave
- GET /api/leave/my-leaves - Get my leaves
- GET /api/leave/all - Get all leaves (admin)
- PATCH /api/leave/:leaveId/status - Update leave status
- DELETE /api/leave/:leaveId - Cancel leave
