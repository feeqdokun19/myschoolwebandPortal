# AUD Islamic Secondary School Portal — V1

Modern school management and student portal foundation.

## Stack
- Frontend: React + Vite + JavaScript
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Run locally

1. Start MongoDB:
```bash
docker compose up -d mongodb
```

2. Create backend environment:
```bash
cp backend/.env.example backend/.env
```
Replace the JWT secrets with long random values.

3. Install dependencies:
```bash
npm run install:all
```

4. Start frontend + backend:
```bash
npm run dev
```

Frontend: http://localhost:5173
API: http://localhost:5000
Health: http://localhost:5000/api/health

## V1 build order
1. Foundation
2. Authentication & RBAC
3. School setup
4. Admissions
5. Student portal
6. Teacher portal
7. Results + correction approval + audit trail
8. Quizzes/exams
