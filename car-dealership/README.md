# Carventory

Carventory is a full-stack car dealership inventory management application.

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Java 17
- Spring Boot 4
- Spring Security
- JWT authentication
- BCrypt password hashing
- Spring Data JPA
- Flyway

### Database
- PostgreSQL 16

## Project Structure

```text
car-dealership/
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   │   └── db/migration/
│   └── pom.xml
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## Features

- User registration and login
- JWT-based authentication
- Role-aware UI for USER and ADMIN
- Vehicle inventory listing
- Vehicle creation
- Vehicle editing
- Vehicle deletion
- Vehicle quantity/stock handling
- Purchase flow
- PostgreSQL persistence
- Flyway database migrations
- CORS configuration for local frontend development
- Axios automatically attaches the JWT Bearer token to API requests
- Login redirects to the dashboard after successful authentication
- Logout clears authentication state and redirects to login

## Database

The application uses PostgreSQL.

Local development defaults:

```text
Database:  car_dealership
Host:      localhost
Port:      5432
Username:  postgres
Password:  postgres
```

The backend supports environment-variable overrides:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION_MS
```

Example:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/car_dealership"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"
$env:JWT_SECRET="change-this-development-secret-to-at-least-32-characters"
$env:JWT_EXPIRATION_MS="86400000"
```

Do not use the development JWT secret or default database password in production.

## Flyway

The current database migration history contains:

```text
V1 - create users
V2 - create vehicles
V3 - create purchase transactions
V4 - add indexes
```

The backend uses:

```properties
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true
```

This means the schema is managed by Flyway rather than Hibernate auto-creation.

## Running the Backend

Make sure PostgreSQL is running first.

From `backend`:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs by default on:

```text
http://localhost:8080
```

## Running the Frontend

From `frontend`:

```powershell
npm install
npm run dev
```

The frontend runs by default on:

```text
http://localhost:5173
```

## Authentication Flow

1. User submits email and password on `/login`.
2. Frontend sends credentials to `/api/auth/login`.
3. Backend verifies the BCrypt password hash.
4. Backend returns a JWT and user information.
5. `AuthContext` stores the JWT and user information in `localStorage`.
6. Axios automatically sends the JWT as a Bearer token on authenticated API requests.
7. Successful login navigates to `/dashboard`.
8. Logout clears the token and user information and navigates to `/login`.

## Main API Areas

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
```

Vehicles:

```text
GET    /api/vehicles
POST   /api/vehicles
PUT    /api/vehicles/{id}
DELETE /api/vehicles/{id}
```

Purchases:

```text
POST /api/purchases
```

Exact request/response DTOs are defined in the backend source.

## User Roles

### USER
A normal user can:
- Log in
- View inventory
- View vehicle information
- Use the purchase flow

### ADMIN
An administrator additionally has inventory-management capabilities such as:
- Adding vehicles
- Editing vehicles
- Deleting vehicles

## Development Database Checks

List databases:

```powershell
$env:PGPASSWORD="postgres"
psql -h localhost -p 5432 -U postgres -c "\l"
```

Check users and roles:

```powershell
psql -h localhost -p 5432 -U postgres -d car_dealership -c "SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at;"
```

Check Flyway:

```powershell
psql -h localhost -p 5432 -U postgres -d car_dealership -c "SELECT installed_rank, version, description, success FROM flyway_schema_history ORDER BY installed_rank;"
```

## Testing

Backend tests:

```powershell
cd backend
.\mvnw.cmd test
```

Frontend tests:

```powershell
cd frontend
npm test
```

Use the project's configured frontend test command if `npm test` is not defined.

## Production Build

Backend:

```powershell
cd backend
.\mvnw.cmd clean package
```

Frontend:

```powershell
cd frontend
npm run build
```

## Git

Check the working tree:

```powershell
git status
```

Check the current branch:

```powershell
git branch --show-current
```

Check the latest commit:

```powershell
git log -1 --oneline
```

Push changes:

```powershell
git push origin main
```

## Integration Verification Checklist

Before considering a local deployment complete:

- [x] PostgreSQL 16 is running
- [x] `car_dealership` database is available
- [x] Flyway migrations V1-V4 are applied successfully
- [x] Backend starts on port 8080
- [x] Frontend starts on port 5173
- [x] Login API returns JWT and user information
- [x] JWT is attached to Axios API requests
- [x] Successful login redirects to `/dashboard`
- [x] Logout clears authentication and redirects to `/login`
- [x] Vehicle inventory can be loaded through the authenticated UI
- [x] USER and ADMIN role information is displayed by the UI

## Remaining Verification / Risk Notes

The following items should be explicitly rechecked before calling the project production-ready:

1. **ADMIN credentials**: the existing development ADMIN account is `admin@carventory.com`, but its original plaintext password cannot be recovered from the BCrypt hash.
2. **ADMIN end-to-end UI**: log in with a known ADMIN account and verify add/edit/delete controls through the browser.
3. **Vehicle authorization**: an earlier Postman check suggested a USER token could receive `201 Created` from vehicle creation even though the controller contains an ADMIN role check. This was intentionally left as a known security concern for later verification.
4. **Purchase/stock flow**: verify that successful purchases decrement stock correctly and that unavailable stock is rejected.
5. **Production secrets**: replace development PostgreSQL credentials and the development JWT secret.
6. **Open-in-view warning**: Spring Boot may report the standard `spring.jpa.open-in-view` warning. This is not a startup failure, but it should be reviewed for production configuration.
7. **Generated Spring Security password warning**: if Spring reports a generated default security password, review the security configuration before production deployment.

## Local Development Reminder

Never commit:
- Real passwords
- Production database credentials
- Production JWT secrets
- Real user tokens
- `.env` files containing secrets

For local testing, use development-only accounts and credentials.
