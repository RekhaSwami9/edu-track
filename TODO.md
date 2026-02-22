# Edu-Track Credit-Based Substitution System - Implementation TODO

## Phase 1: Database Models (Backend) ✅ COMPLETED

### Tasks:

- [x] 1. Update User Model - Add credits, department, subjects, employeeId
- [x] 2. Create Availability Model - Weekly time slots (Mon-Wed 10-2, etc.)
- [x] 3. Create CreditTransaction Model - Track credit earned/used history
- [x] 4. Create/Update Substitution Model - Status tracking (pending, accepted, completed, declined)

## Phase 2: Backend APIs ⏳ PENDING

- [ ] 5. Availability Controller - Set/update weekly availability
- [ ] 6. Credit Controller - View balance, transaction history
- [ ] 7. Substitution Controller - Request substitution, notify available faculties, accept/decline logic, auto-assign with credits

## Phase 3: Frontend Components ⏳ PENDING

- [ ] 8. My Availability Page - Calendar interface to mark available slots
- [ ] 9. My Credits Page - Show current balance + transaction history
- [ ] 10. Request Substitution Page - Form to request leave, use credits, see available faculties
- [ ] 11. Substitution Requests Page - View incoming requests, accept/decline with one click
- [ ] 12. Dashboard Updates - Show credits, pending requests, today's substitutions

## Phase 4: Smart Algorithm ⏳ PENDING

- [ ] 13. Matching Algorithm - Find faculties by: availability + subject compatibility + current load
- [ ] 14. Credit Logic - Auto-assign if credits available, otherwise show request list
- [ ] 15. Notification System - Real-time alerts for new substitution requests

## Phase 5: Testing & Integration ⏳ PENDING

- [ ] 16. Test all flows end-to-end
- [ ] 17. Push to GitHub
