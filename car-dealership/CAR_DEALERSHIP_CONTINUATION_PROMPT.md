# Car Dealership Inventory System — Continuation Prompt

## Purpose

This is the master continuation prompt for completing the **Car Dealership Inventory System TDD Kata**.

Work **one step at a time**:
1. Give only the current step.
2. Give exact commands/files/code required.
3. Keep explanations short and practical.
4. Wait for my confirmation.
5. Continue only after confirmation.

Do not skip TDD, Git history, authentication, documentation, or final validation.

---

# 1. Original Project Requirements

## Goal

Build a full-stack **Car Dealership Inventory System**.

## Backend

- Java 17
- Spring Boot
- PostgreSQL
- REST API
- JWT/token-based authentication
- TDD
- Clean architecture / SOLID
- Role-based authorization

## Frontend

- React
- HTML5
- CSS3
- Tailwind CSS
- SPA
- Responsive and visually appealing

## Database

- PostgreSQL
- NOT in-memory
- NO Docker

## Required Backend Endpoints

### AUTH

```text
POST /api/auth/register
POST /api/auth/login
```

### VEHICLES — protected

```text
POST /api/vehicles
GET /api/vehicles
GET /api/vehicles/search
PUT /api/vehicles/:id
DELETE /api/vehicles/:id
```

`DELETE /api/vehicles/:id` = Admin only.

### INVENTORY

```text
POST /api/vehicles/:id/purchase
POST /api/vehicles/:id/restock
```

`POST /api/vehicles/:id/restock` = Admin only.

## Vehicle Fields

- unique ID
- make
- model
- category
- price
- quantity in stock

## Frontend Requirements

- Registration
- Login
- Dashboard/homepage
- Display available vehicles
- Search/filter by make/model/category/price
- Purchase button
- Purchase disabled when quantity = 0
- Admin UI for add/update/delete/restock
- Modern responsive design
- Vehicle images where appropriate

---

# 2. TDD Requirements

Tests must be written **BEFORE implementation**.

Preserve the development pattern:

```text
RED
↓
Write failing test
↓
Run and confirm failure
↓
GREEN
↓
Implement minimum code
↓
Run and confirm success
↓
REFACTOR
↓
Improve implementation
↓
Run tests again
```

Git history must demonstrate this development story.

Important backend test areas:

- registration
- duplicate email
- password handling
- login
- invalid credentials
- JWT
- authentication
- authorization
- vehicle CRUD
- search
- purchase
- zero stock
- negative stock prevention
- restock
- admin restrictions
- validation/error cases

Do NOT implement everything first and add tests afterward.

---

# 3. Git Requirements

Use frequent descriptive commits.

The commit history should tell the development story.

Every AI-assisted commit must contain:

```text
Co-authored-by: ChatGPT <AI@users.noreply.github.com>
```

Before important pushes, verify the remote.

---

# 4. AI Documentation

Root file:

```text
PROMPTS.md
```

It must contain:

- raw, unedited AI chat logs OR
- public AI chat links

Do NOT replace this with an AI-generated summary.

Maintain this throughout development.

README must contain a detailed **My AI Usage** section covering:

- AI tools used
- how they were used
- specific contribution
- reflection on AI impact

Be honest and specific.

---

# 5. README Requirements

Final README must include:

- Project explanation
- Features
- Architecture/technology overview
- Database setup
- Backend setup
- Frontend setup
- How to run
- API information
- Authentication information
- Screenshots
- Test report
- TDD approach
- My AI Usage
- Limitations if applicable
- Optional deployment if completed

---

# 6. Phase 1 — COMPLETE

## Environment

Java:

```text
java version "17.0.9"
javac 17.0.9
```

PostgreSQL:

```text
PostgreSQL 16.15
localhost
port 5432
user postgres
database car_dealership
```

Node:

```text
v20.18.1
```

npm:

```text
11.4.2
```

Git:

```text
2.42.0.windows.2
```

Docker:

```text
NOT USED
```

Do not introduce Docker.

Maven is not installed globally.

Use Maven Wrapper:

```powershell
.\mvnw.cmd test
```

Maven Wrapper verified:

```text
Apache Maven 3.9.16
Java 17.0.9
Windows 11
```

---

# 7. Git Configuration

Global Git identity:

```text
Gunagnti Lokesh
gunagantilokesh@gmail.com
```

Project-local Git identity:

```text
GunagantiLochana
23wh1a1295@bvrithyderabad.edumin.com
```

Configured WITHOUT `--global`.

Verify:

```powershell
git config user.name
git config user.email
```

Current remote at initial setup:

```text
origin https://github.com/lokesh6692/HTML-CSS-JS.git
```

IMPORTANT:

This may be an existing HTML/CSS/JS repository and may NOT be the final repository.

Before important commits/pushes:

```powershell
git remote -v
```

Verify the correct final repository.

Do not blindly push to the existing remote.

---

# 8. Project Location

Project root:

```text
C:\Users\gunag\projects\Carventory\car-dealership
```

Backend:

```text
C:\Users\gunag\projects\Carventory\car-dealership\backend
```

Expected final structure:

```text
car-dealership/
├── backend/
├── frontend/
├── README.md
├── PROMPTS.md
└── ...
```

---

# 9. Phase 2 — DATABASE COMPLETE

Database:

```text
car_dealership
```

Verified:

```sql
SELECT current_database();
```

returns:

```text
car_dealership
```

PostgreSQL:

```text
16.15
port 5432
```

Flyway owns schema management.

Hibernate currently uses:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

Do NOT change to `create`, `create-drop`, or `update`.

---

# 10. Database Structure

## users

```text
id UUID PRIMARY KEY
name VARCHAR(100) NOT NULL
email VARCHAR(255) NOT NULL UNIQUE
password_hash VARCHAR(255) NOT NULL
role VARCHAR(20) NOT NULL
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Roles:

```text
USER
ADMIN
```

## vehicles

```text
id UUID PRIMARY KEY
make VARCHAR(100) NOT NULL
model VARCHAR(100) NOT NULL
category VARCHAR(50) NOT NULL
price NUMERIC(12,2) NOT NULL
quantity INTEGER NOT NULL
description TEXT
image_url VARCHAR(1000)
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Constraints:

```text
price > 0
quantity >= 0
```

## purchase_transactions

```text
id UUID PRIMARY KEY
vehicle_id UUID NOT NULL
user_id UUID NOT NULL
quantity INTEGER NOT NULL
price_at_purchase NUMERIC(12,2) NOT NULL
created_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Foreign keys:

```text
vehicle_id -> vehicles(id)
user_id -> users(id)
```

Constraints:

```text
quantity > 0
price_at_purchase > 0
```

## Indexes

```text
idx_vehicles_make
idx_vehicles_model
idx_vehicles_category
idx_vehicles_price
idx_purchase_vehicle
idx_purchase_user
```

## Flyway migrations

```text
V1__create_users.sql
V2__create_vehicles.sql
V3__create_purchase_transactions.sql
V4__add_indexes.sql
```

All migrations have executed successfully.

---

# 11. Spring Boot Current State

Spring Boot:

```text
4.0.8
```

Java:

```text
17
```

Maven:

```text
Maven Wrapper
```

Dependencies include:

```text
spring-boot-starter-data-jpa
spring-boot-starter-flyway
spring-boot-starter-security
spring-boot-starter-validation
spring-boot-starter-webmvc
flyway-database-postgresql
postgresql
```

Test dependencies generated by Spring Initializr are present.

Properties:

```text
backend/src/main/resources/application.properties
```

Current test:

```powershell
.\mvnw.cmd test
```

Result:

```text
BUILD SUCCESS
```

---

# 12. Current Phase Status

```text
Phase 1 — COMPLETE
Phase 2 — COMPLETE
Phase 3 — STARTING
Phase 4 — PENDING
Phase 5 — PENDING
```

---

# 13. Correct Development Sequence

## PHASE 3 — FRONTEND

### 3.1 Create React application

Create:

```text
frontend/
```

Use React + Vite.

Verify it builds/runs.

### 3.2 Configure Tailwind CSS

Configure Tailwind CSS.

Verify the build.

### 3.3 Frontend architecture

Use a simple structure:

```text
frontend/
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── context/
    ├── App.jsx
    └── main.jsx
```

Do not over-engineer.

### 3.4 Routing and application shell

Create SPA routing and basic layout.

Areas:

```text
Login
Register
Dashboard
Admin
```

### 3.5 Authentication UI

Implement:

```text
Register
Login
Logout
```

### 3.6 Authentication state + JWT handling

Implement frontend authentication state and token handling.

### 3.7 Vehicle dashboard

Implement:

- vehicle listing
- cards
- vehicle information
- stock
- price
- image

### 3.8 Search/filter

Implement:

```text
make
model
category
price
```

### 3.9 Purchase

Implement purchase.

Rules:

- authenticated user required
- stock decreases
- invalid quantities rejected
- purchase disabled when quantity = 0

### 3.10 Admin UI

Admin-only UI:

```text
Add
Update
Delete
Restock
```

Frontend checks do not replace backend authorization.

### 3.11 Responsive UI/images

Use Tailwind.

Ensure:

- responsive design
- modern dealership appearance
- mobile usability
- appropriate vehicle images

### 3.12 Frontend validation

Run:

```powershell
npm run build
```

Fix all errors before continuing.

---

# 14. Important TDD Sequencing Rule

The original high-level plan is:

```text
Phase 3 = Frontend
Phase 4 = Backend
```

However, this does NOT mean backend implementation can be completed before writing tests.

Backend functionality must still follow:

```text
RED → GREEN → REFACTOR
```

with Git commits demonstrating the progression.

Do not fabricate TDD history later.

---

# 15. PHASE 4 — BACKEND

### 4.1 Architecture

Create simple clean architecture/SOLID boundaries.

Avoid unnecessary:

- microservices
- messaging
- infrastructure
- abstractions
- technologies

### 4.2 Authentication TDD

Tests first for:

- registration
- duplicate email
- password handling
- login
- invalid credentials

### 4.3 JWT security

Test:

- valid token
- missing token
- invalid token
- authenticated identity

### 4.4 Authentication endpoints

Implement:

```text
POST /api/auth/register
POST /api/auth/login
```

### 4.5 Vehicle creation/list/search

TDD:

```text
POST /api/vehicles
GET /api/vehicles
GET /api/vehicles/search
```

### 4.6 Update/delete

Implement:

```text
PUT /api/vehicles/:id
DELETE /api/vehicles/:id
```

Verify admin-only delete.

### 4.7 Purchase/restock

Implement:

```text
POST /api/vehicles/:id/purchase
POST /api/vehicles/:id/restock
```

Test:

- successful purchase
- stock decreases
- purchase transaction recorded
- zero-stock purchase rejected
- negative stock impossible
- invalid quantity rejected
- admin-only restock
- restock increases stock

### 4.8 Authorization

Roles:

```text
USER
ADMIN
```

Admin-only:

```text
DELETE /api/vehicles/:id
POST /api/vehicles/:id/restock
```

### 4.9 Validation/error handling

Handle:

- invalid input
- unauthenticated
- unauthorized
- missing resources
- invalid purchase
- duplicate registration

### 4.10 Integration tests

Test important API flows against PostgreSQL.

Do not replace PostgreSQL with an in-memory database.

### 4.11 Test/coverage report

Run the complete suite and generate the appropriate report for README documentation.

---

# 16. PHASE 5 — INTEGRATION AND FINAL VALIDATION

### 16.1 Frontend/backend integration

Connect React to Spring Boot.

### 16.2 Authentication

Verify:

```text
Register
→ Login
→ Receive token
→ Protected API
→ Logout
```

### 16.3 User flow

Verify:

```text
Login
→ Dashboard
→ Browse
→ Search/filter
→ Purchase
→ Stock decreases
```

### 16.4 Zero stock

When:

```text
quantity = 0
```

the frontend purchase button must be disabled and backend purchase must reject the request.

### 16.5 Admin flow

Verify:

```text
Admin login
→ Add
→ Update
→ Delete
→ Restock
```

Verify normal users cannot perform admin operations.

### 16.6 API verification

Verify every required endpoint.

### 16.7 Database verification

Verify:

- PostgreSQL
- Flyway
- migrations
- constraints
- foreign keys
- indexes
- `ddl-auto=validate`

### 16.8 TDD verification

Review Git history and confirm tests precede implementation for major backend features.

### 16.9 Git verification

Run:

```powershell
git status
git log --oneline --decorate --graph --all
git remote -v
git config user.name
git config user.email
```

Verify AI-assisted commits contain:

```text
Co-authored-by: ChatGPT <AI@users.noreply.github.com>
```

### 16.10 Screenshots

Create screenshots for important functionality:

- Login
- Registration
- Dashboard
- Search/filter
- Vehicle cards
- Purchase
- Admin dashboard
- Add/update/restock/delete
- Responsive UI where useful

### 16.11 README

Complete all required documentation.

### 16.12 PROMPTS.md

Verify required raw AI logs or public chat links are present.

### 16.13 Public GitHub repository

Verify final repository is public and contains the required project/documentation files.

---

# 17. Final Validation Checklist

## Backend

- [ ] Java 17
- [ ] Spring Boot
- [ ] PostgreSQL
- [ ] Flyway
- [ ] REST API
- [ ] JWT/token authentication
- [ ] Role-based authorization
- [ ] Clean architecture/SOLID
- [ ] Registration
- [ ] Login
- [ ] Vehicle creation
- [ ] Vehicle listing
- [ ] Vehicle search
- [ ] Vehicle update
- [ ] Vehicle delete
- [ ] Purchase
- [ ] Restock
- [ ] Validation
- [ ] Error handling

## Database

- [ ] PostgreSQL, not in-memory
- [ ] No Docker
- [ ] users table
- [ ] vehicles table
- [ ] purchase_transactions table
- [ ] Flyway migrations
- [ ] constraints
- [ ] foreign keys
- [ ] indexes
- [ ] `ddl-auto=validate`

## Frontend

- [ ] React
- [ ] SPA
- [ ] HTML5
- [ ] CSS3
- [ ] Tailwind CSS
- [ ] Registration
- [ ] Login
- [ ] Dashboard/homepage
- [ ] Vehicle display
- [ ] Vehicle images
- [ ] Make filter
- [ ] Model filter
- [ ] Category filter
- [ ] Price filter
- [ ] Purchase button
- [ ] Purchase disabled at zero stock
- [ ] Admin add
- [ ] Admin update
- [ ] Admin delete
- [ ] Admin restock
- [ ] Responsive design
- [ ] Modern UI

## Authentication/Security

- [ ] Passwords securely hashed
- [ ] JWT/token generated on login
- [ ] Protected endpoints require authentication
- [ ] Admin authorization enforced backend-side
- [ ] Normal users cannot perform admin operations
- [ ] Invalid credentials rejected
- [ ] Invalid/missing token rejected

## TDD

- [ ] Tests written before implementation
- [ ] Red phase demonstrated
- [ ] Green phase demonstrated
- [ ] Refactoring performed
- [ ] Meaningful backend coverage
- [ ] Git history supports TDD

## Git

- [ ] Frequent descriptive commits
- [ ] Correct project-local identity
- [ ] Correct final remote
- [ ] AI co-author trailer on AI-assisted commits
- [ ] Public GitHub repository

## Documentation

- [ ] README.md
- [ ] Setup instructions
- [ ] Backend setup
- [ ] Frontend setup
- [ ] Database setup
- [ ] API information
- [ ] Screenshots
- [ ] Test report
- [ ] TDD explanation
- [ ] My AI Usage
- [ ] PROMPTS.md
- [ ] Raw AI logs/public chat links in PROMPTS.md

---

# 18. Working Rules for ChatGPT

1. Work one actionable step at a time.
2. Wait for confirmation before the next step.
3. Give exact PowerShell commands.
4. Give complete files when code changes are required.
5. Keep explanations short.
6. Do not introduce Docker.
7. Do not introduce unnecessary technologies.
8. Do not use an in-memory database.
9. Do not disable Flyway.
10. Do not change Hibernate to schema generation.
11. Do not skip tests.
12. Do not claim TDD if tests were written afterward.
13. Maintain meaningful Git commits.
14. Add the AI co-author trailer to AI-assisted commits.
15. Maintain `PROMPTS.md`.
16. Keep the original requirements as the source of truth.
17. Test every major feature.
18. Perform the complete final validation before declaring completion.

---

# 19. Current Exact Position

```text
Phase 1 — COMPLETE
Phase 2 — COMPLETE
Phase 3 — STARTING
Phase 4 — PENDING
Phase 5 — PENDING
```

Current task:

```text
PHASE 3.1 — CREATE REACT APPLICATION
```

The next assistant response must:

1. Briefly confirm the current position.
2. Give only the commands needed to create the React/Vite frontend.
3. Explain how to verify it.
4. Wait for confirmation.
5. Then continue to Phase 3.2.

Do NOT jump directly to later frontend features.
