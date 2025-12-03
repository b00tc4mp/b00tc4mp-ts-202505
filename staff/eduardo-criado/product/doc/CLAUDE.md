# Project Architecture: TypeScript Bootcamp - Product App

## Executive Summary

This is a full-stack TypeScript bootcamp project featuring a user authentication system with a searchable, sortable, and pageable user directory. The application demonstrates monorepo structure with shared utilities, a Node.js/Express backend API, and a React frontend with Vite.

**Current Status:** Feature development branch - Database abstraction layer supporting multiple backends (SQL, NoSQL, File System)

---

## 1. Overall Project Structure

```
b00tc4mp-ts-202505/
├── staff/
│   └── eduardo-criado/
│       └── product/
│           ├── api/              # Backend API (Node.js/Express)
│           ├── app/              # Frontend (React/Vite)
│           ├── com/              # Shared utilities & types
│           ├── doc/              # Documentation
│           └── zzz/              # Archival/backup versions
├── coverage/                     # Test coverage reports
├── node_modules/
├── README.md                     # Root project overview
└── .git/                         # Git repository
```

### Key Principle
The project uses a **monorepo structure** where:
- `com/` = Shared code (errors, validators, types)
- `api/` = Backend services
- `app/` = Frontend UI
- Each can be developed and tested independently

---

## 2. Technology Stack

### Backend (API)
- **Runtime:** Node.js (ES modules)
- **Framework:** Express.js 5.1.0
- **Language:** TypeScript 5.x
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **CORS:** cors 2.8.5
- **Environment:** dotenv 17.2.1

### Database Layer (Switchable)
**Multiple implementations available:**
1. **SQL:** Prisma 6.10.1 with MySQL driver
2. **NoSQL:** Mongoose 8.15.1 with MongoDB
3. **File System:** Custom JSON-based storage

### Frontend (App)
- **Framework:** React 19.1.0
- **Router:** react-router-dom 7.7.1
- **Build Tool:** Vite 7.0.4
- **Language:** TypeScript 5.8.3
- **Linter:** ESLint 9.30.1

### Shared Module (com)
- **Language:** TypeScript 5.9.2
- **Purpose:** Shared error classes, validation utilities, and types

### Testing
- **Framework:** Mocha 11.5.0
- **Assertion:** Chai 5.2.0
- **Types:** @types/mocha 10.0.10

---

## 3. Frontend and Backend Organization

### Frontend Structure (app/)
```
app/
├── src/
│   ├── App.tsx                  # Main router component
│   ├── main.tsx                 # React/ReactDOM entry point
│   ├── index.css                # Global styles
│   ├── App.css                  # App component styles
│   ├── logic/                   # Business logic functions
│   │   ├── index.ts             # Logic exports
│   │   ├── loginUser.ts         # Login API call
│   │   ├── registerUser.ts      # Registration API call
│   │   ├── logoutUser.ts        # Session/token cleanup
│   │   ├── getUserInfo.ts       # Get current user info
│   │   └── seachUsers.ts        # Search users with filters
│   └── views/
│       └── components/
│           ├── Login.tsx        # Login form component
│           ├── Register.tsx     # Registration form component
│           └── Home.tsx         # Home with user search table
├── public/                      # Static assets
├── .env                         # Environment variables
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript root config
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.node.json          # Node-specific TS config
└── eslint.config.js            # ESLint configuration
```

**Frontend Architecture Pattern:**
- **Components:** React functional components with hooks (useState, useEffect)
- **Logic:** Separation of concerns - API calls in `logic/` directory
- **State Management:** React hooks (useState)
- **Navigation:** React Router with client-side routing
- **Error Handling:** Custom error classes from `com` module

### Backend Structure (api/)
```
api/
├── index.ts                     # Express app & route definitions
├── logic/                       # Business logic layer
│   ├── index.ts                 # Logic exports
│   ├── registerUser.ts          # User registration logic
│   ├── authenticateUser.ts      # User authentication logic
│   ├── createPost.ts            # Create post logic
│   ├── getUserInfo.ts           # Fetch user info logic
│   ├── findUsers.ts             # Search/filter users logic
│   ├── generateCaption.ts       # AI caption generation (Perplexity)
│   ├── types.ts                 # Logic function signatures
│   └── *.spec.ts                # Unit tests for each logic function
├── data/
│   └── repository/              # Data access layer
│       ├── types.ts             # Repository interfaces
│       ├── populate.ts          # Multi-DB population script
│       ├── fs/                  # File System repository
│       │   ├── UserRepository.ts
│       │   ├── PostRepository.ts
│       │   └── *.spec.ts
│       ├── no-sql/              # MongoDB/Mongoose repository
│       │   ├── index.ts         # MongoDB connection
│       │   ├── UserRepository.ts
│       │   ├── PostRepository.ts
│       │   ├── types.ts
│       │   └── *.spec.ts
│       └── sql/                 # MySQL/Prisma repository
│           ├── index.ts         # Prisma client
│           ├── schema.prisma    # Database schema
│           ├── UserRepository.ts
│           ├── PostRepository.ts
│           └── *.spec.ts
├── utils/
│   └── jsonwebtoken-promised.js # Promise wrapper for JWT
├── test/                        # Integration test scripts
│   ├── *.sh                     # cURL test commands
│   └── perplexity-test.js
├── build/                       # Compiled JavaScript output
├── .env                         # Production environment variables
├── .test.env                    # Test database environment variables
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # API documentation
```

**Backend Architecture Pattern:**
- **Express Routes:** RESTful endpoints in main `index.ts`
- **Logic Layer:** Business rules in `logic/` - validated and tested
- **Repository Pattern:** Swappable data layer (fs/no-sql/sql)
- **Error Handling:** Custom error classes with HTTP status mapping
- **Middleware:** CORS, JSON body parser, JWT verification
- **Dependency Injection:** Repository class passed to logic functions

### Shared Module Structure (com/)
```
com/
├── index.ts                     # Exports all public APIs
├── errors.ts                    # Error class definitions
├── validate.ts                  # Input validation utilities
├── build/                       # Compiled output
├── tsconfig.json
├── package.json
└── .gitkeep
```

**Error Classes:**
- `SystemError` - Unexpected system failures
- `ValidationError` - Input validation failures (HTTP 400)
- `NotFoundError` - Resource not found (HTTP 404)
- `CredentialsError` - Authentication failures (HTTP 401)
- `DuplicityError` - Resource already exists (HTTP 409)

**Validation Functions:**
- `validate.text(value, name, min, max)` - String validation
- `validate.email(value, name, max)` - Email format validation
- `validate.id(value, name)` - ID format validation (alphanumeric)
- `validate.number(value, name)` - Number type validation
- `validate.keyWords(array, name)` - Array of text validation

---

## 4. Database Setup & Configuration

### Multiple Database Support
This project supports switching between three database backends **without changing application logic**:

#### 4.1 SQL Database (MySQL + Prisma)
**Status:** Currently active in `registerUser.ts` (line 1 shows import)

**Setup:**
```bash
# Environment file (.env)
PORT=8080
DATABASE_URL=mysql://root:12345@localhost:3306/product
MONGO_URL=mongodb://localhost:27017/product-api (unused)

# For testing (.test.env)
DATABASE_URL=mysql://root:12345@localhost:3306/product_test
```

**Schema (schema.prisma):**
```prisma
model User {
  id       String  @id
  name     String
  email    String  @unique
  username String  @unique
  password String
  avatar   String?
  
  posts Post[] @relation("UserPosts")
}

model Post {
  id          String   @id
  authorId    String
  title       String
  description String
  image       String
  createdAt   DateTime @default(now())
  
  author User @relation(fields: [authorId], references: [id], name: "UserPosts")
}
```

**Prisma Commands:**
```bash
# Create/migrate database
npx prisma migrate dev --name init --schema=data/repository/sql/schema.prisma

# Populate test data
npx tsx --env-file=.test.env data/repository/sql/populate.ts

# Generate Prisma client
npx prisma generate
```

#### 4.2 NoSQL Database (MongoDB + Mongoose)
**Status:** Alternative implementation available

**Setup:**
```bash
# Environment
MONGO_URL=mongodb://localhost:27017/product-api
```

**Schema Definition:**
- MongoDB schemas defined in `/data/repository/no-sql/index.ts`
- User schema: name, email, username, password, avatar
- Post schema: author (ObjectId), title, description, image, createdAt
- Mongoose validation: minlength, maxlength, unique constraints

**Switch to MongoDB:**
1. Comment line 3 in `api/index.ts`: Change import from SQL to NoSQL
2. Update `registerUser.ts` to import from `no-sql/UserRepository.ts`

#### 4.3 File System Database (JSON Files)
**Status:** Development/testing fallback

**Location:** `./data/repository/fs/`
- `users.json` - User data stored as JSON array
- `posts.json` - Post data stored as JSON array
- Test version: `./data/repository/fs/test/`

**Configuration:**
```bash
FS_PATH=./data/repository/fs        # Production
FS_PATH=./data/repository/fs/test   # Testing
```

### Database Interface (Types)
All repositories implement `IUserRepository` and `IPostRepository`:

```typescript
interface IUserData {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string | null;
}

interface IUserRepository {
  save(user: IUserData): Promise<void>;
  findByUsername(username: string): Promise<IUserData | null>;
  findById(id: string): Promise<IUserData | null>;
  removeAll(): Promise<void>;
  generateId(): string;
  filter(criteria, sort, page): Promise<IUserData[]>;
}

interface IPostData {
  id: string;
  author: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
}

interface IPostRepository {
  save(post: IPostData): Promise<void>;
  findById(id: string): Promise<IPostData | null>;
  findAll(): Promise<IPostData[]>;
  findByAuthor(authorId: string): Promise<IPostData[]>;
  removeAll(): Promise<void>;
  removeById(id: string): Promise<void>;
  generateId(): string;
}
```

### Important Notes
- **Never run tests with production database** - Always use separate test database (product_test)
- **Environment switching:** Use `--env-file=.test.env` flag with tsx/node
- SQL tests use separate schema (not yet visible but referenced in README)

---

## 5. API Structure & Routing Patterns

### Main Express App (index.ts)
All routes are defined in the main `api/index.ts` file with pattern:

```
Route: Method -> Handler Logic -> Response
```

### API Endpoints

#### Authentication Routes

**POST `/users`** - Register new user
```javascript
Body: { name, email, username, password }
Response: 201 Created (empty body)
Errors: 
  - 400 ValidationError: Invalid input
  - 409 DuplicityError: User already exists
```

**POST `/users/auth`** - Authenticate user
```javascript
Body: { username, password }
Response: 200 { token: "JWT_TOKEN" }
Errors:
  - 400 ValidationError: Invalid input
  - 401 CredentialsError: Invalid credentials
```

**GET `/users/me`** - Get current user info
```javascript
Headers: Authorization: Bearer {token}
Response: 200 { id, name, email, username }
Errors:
  - 401 CredentialsError: Invalid/missing token
  - 404 NotFoundError: User not found
```

#### Post Routes

**POST `/posts`** - Create new post
```javascript
Headers: Authorization: Bearer {token}
Body: { title, description, image }
Response: 201 Created (empty body)
Errors:
  - 400 ValidationError: Invalid input
  - 401 CredentialsError: Invalid token
```

#### Search Routes

**GET `/users/search`** - Search and filter users
```javascript
Headers: Authorization: Bearer {token}
Query Parameters:
  - query: string (search term)
  - sortField: "name" | "username" | "email"
  - sortOrder: "asc" | "desc"
  - pageNumber: number (1-based)
  - pageSize: number (results per page)

Response: 200 [{ id, name, username, email }, ...]
Errors:
  - 400 ValidationError: Invalid parameters
  - 401 CredentialsError: Invalid token
```

#### Health Checks

**GET `/hello`** - Health check
```javascript
Response: 200 "Hello, World!"
```

### Middleware Stack

1. **CORS Middleware** - Enables cross-origin requests
2. **JSON Parser** - Parses request bodies
3. **JWT Verification** - Guards protected routes
4. **Error Handler** - Catches and formats errors

### Error Response Format
```javascript
{
  "error": "ErrorClassName",  // From com/errors.ts
  "message": "Descriptive message"
}
```

**HTTP Status Mapping:**
- 400 → ValidationError
- 401 → CredentialsError
- 404 → NotFoundError
- 409 → DuplicityError
- 500 → SystemError

---

## 6. Testing Setup & Patterns

### Test Files Organization

**Backend Unit Tests:**
```
api/logic/*.spec.ts          # Logic layer tests
api/data/repository/**/*.spec.ts  # Repository layer tests
```

**Example Test Files:**
- `registerUser.spec.ts` - Registration logic tests
- `authenticateUser.spec.ts` - Authentication logic tests
- `createPost.spec.ts` - Post creation logic tests
- `findUsers.spec.ts` - Search logic tests
- `UserRepository.spec.ts` - Data layer tests (fs/sql/no-sql)
- `PostRepository.spec.ts` - Post repository tests

### Test Commands

```bash
# Run all tests
npm run test

# Run tests with watch mode (auto-rerun on changes)
npm run test-watch

# Run tests with debugger attached
npm run test-inspect
```

### Test Configuration

**Test Environment (.test.env):**
- Separate MongoDB: `mongodb://localhost:27017/product-api-test`
- Separate MySQL: `product_test` database
- Separate file system: `./data/repository/fs/test`

### Mocha Configuration
- Entry points: `build/logic/*.spec.js` and `build/data/repository/**/*.spec.js`
- Node flags: `--env-file=.test.env` (loads test environment variables)
- Framework: Mocha 11.5.0
- Assertions: Chai 5.2.0

### Integration Testing
Shell scripts available for manual API testing:
```bash
test/hello.sh                 # Health check
test/register-user.sh        # Registration endpoint
test/authenticate-user.sh    # Authentication endpoint
test/get-user-info.sh        # Get user info endpoint
test/find-users.sh           # Search users endpoint
test/create-post.sh          # Create post endpoint
test/perplexity.sh           # AI caption generation
```

---

## 7. Build & Development Scripts

### API (Backend)

**package.json scripts:**
```json
{
  "start-watch": "node --env-file=.env --watch build",
  "start-inspect": "node --env-file=.env --inspect-brk build",
  "compile-watch": "tsc --watch",
  "test": "node --env-file=.test.env node_modules/mocha/bin/mocha build/logic/*.spec.js",
  "test-watch": "node --env-file=.test.env --watch node_modules/mocha/bin/mocha ...",
  "test-inspect": "node --env-file=.test.env --inspect-brk node_modules/mocha/bin/mocha ..."
}
```

**Development Workflow:**
```bash
# Terminal 1: Compile TypeScript
cd api
npm run compile-watch

# Terminal 2: Run API with auto-reload
npm run start-watch

# Terminal 3: Run tests with watch mode
npm run test-watch
```

**Key Node Flags:**
- `--env-file=.env` - Load environment variables from file
- `--watch` - Auto-restart on file changes
- `--inspect-brk` - Debug mode with breakpoint on start

### Frontend (React App)

**package.json scripts:**
```json
{
  "start": "vite",
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

**Development Workflow:**
```bash
cd app
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run lint         # Check code quality
npm run preview      # Preview production build
```

**Key Commands:**
- `tsc -b` - Compile TypeScript with project references
- `vite` - Dev server with HMR (Hot Module Replacement)
- `vite build` - Production bundle
- `eslint .` - Lint all files

### Shared Module (com)

**package.json scripts:**
```json
{
  "compile-watch": "tsc --watch"
}
```

**Build:**
```bash
cd com
npm run compile-watch
```

### Common Development Tasks

**Installing Dependencies:**
```bash
# Root (monorepo)
npm install

# Individual modules
cd api && npm install
cd app && npm install
cd com && npm install
```

**Building All:**
```bash
# Compile all TypeScript
cd com && npm run compile-watch &
cd api && npm run compile-watch &
cd app && npm run build

# Or one at a time
npm run build  # in each directory
```

---

## 8. Configuration Files

### TypeScript Configuration

**api/tsconfig.json:**
- Target: `esnext`
- Module: `nodenext` (Node.js ES modules)
- Output: `./build`
- Strict mode enabled
- Source maps enabled

**app/tsconfig.json:**
- Root config with project references
- `tsconfig.app.json` - App-specific settings
  - JSX: `react-jsx`
  - Target: `esnext`
- `tsconfig.node.json` - Build tool settings

**com/tsconfig.json:**
- Target: `esnext`
- Module: `nodenext`
- Output: `./build`
- Strict mode enabled

### Environment Files

**API (.env):**
```bash
PORT=8080                                              # Server port
JWT_SECRET=TypeScript                                  # JWT signing key
MONGO_URL=mongodb://localhost:27017/product-api       # MongoDB (if using NoSQL)
FS_PATH=./data/repository/fs                          # File system storage
DATABASE_URL=mysql://root:12345@localhost:3306/product # MySQL (if using SQL)
PERPLEXITY_API_KEY=...                                # Optional: AI service
```

**API (.test.env):**
```bash
PORT=8080
JWT_SECRET=TypeScript
MONGO_URL=mongodb://localhost:27017/product-api-test  # Test database
FS_PATH=./data/repository/fs/test                     # Test file storage
DATABASE_URL=mysql://root:12345@localhost:3306/product_test  # Test database
```

**Frontend (.env):**
```bash
VITE_API_URL=http://localhost:8080  # Backend API endpoint
```

### Vite Configuration (Frontend)

**vite.config.ts:**
```typescript
export default defineConfig({
  plugins: [react()],  // React plugin for JSX
})
```

### ESLint Configuration (Frontend)

**eslint.config.js:**
- JavaScript parser and configuration
- React hooks plugin enabled
- React refresh plugin for HMR

### Prisma Configuration (SQL)

**schema.prisma:**
- Provider: `mysql`
- Client generator with custom output (commented out)
- Datasource URL from `DATABASE_URL` env var

---

## 9. Key Architecture Patterns & Conventions

### Authentication Flow

```
User Input → Validation → Repository Query → Logic Validation
  ↓
  ├─ Registration: Save new user
  ├─ Authentication: Find user + verify password → sign JWT
  └─ Protected Routes: Verify JWT → extract userId

Response ← Error Handler ← Business Logic ← Data Layer
```

### Request Lifecycle (Protected Route Example)

```
GET /users/search?query=john&sortField=name&sortOrder=asc
  ↓
1. Route Handler extracts token from Authorization header
2. JWT.verify(token) with secret
3. Extract userId from token payload
4. Call logic.findUsers(userId, query, sortField, sortOrder, page, size)
5. Logic validates parameters using com/validate
6. Repository.filter() queries database
7. Response returns filtered users JSON
  ↓
Error: Caught by middleware → HTTP status + error object
```

### Data Flow

```
Frontend (React)
  ├─ Components: UI & state management
  ├─ Logic: API calls with validation
  └─ sessionStorage.token: JWT persistence

  ↔ HTTP/JSON ↔

Backend (Express + Logic + Repository)
  ├─ Routes: Endpoint definitions
  ├─ Logic: Business rules & validation
  ├─ Repository: Abstracted data access
  └─ Database: SQL/NoSQL/FS
```

### Error Handling

**Frontend:**
```typescript
// Errors from com/errors.ts
catch (error) {
  if (error instanceof SystemError) {
    // Network or server issue
  } else if (error instanceof ValidationError) {
    // Input validation failed
  } else if (error instanceof CredentialsError) {
    // Login failed
  }
}
```

**Backend:**
```typescript
// Catch in middleware
api.use((error, req, res, next) => {
  let status = 500;
  if (error instanceof ValidationError) status = 400;
  if (error instanceof NotFoundError) status = 404;
  if (error instanceof CredentialsError) status = 401;
  if (error instanceof DuplicityError) status = 409;
  
  res.status(status).json({ error: error.constructor.name, message: error.message });
});
```

### Repository Pattern Benefits

1. **Swappable implementations** - Switch databases without changing logic
2. **Testability** - Mock repositories for unit tests
3. **Interface contracts** - `IUserRepository` defines all required methods
4. **Single responsibility** - Data access isolated from business logic

**Current: registerUser.ts imports from SQL**
```typescript
import { UserRepository } from "../data/repository/sql/UserRepository.js";
```

**To switch to MongoDB:**
```typescript
import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
```

### Validation Strategy

**Defensive validation at multiple layers:**

1. **Frontend** - Client-side validation in logic functions
2. **Backend Logic** - Validate before repository calls
3. **Database** - Schema constraints (unique, minlength, etc.)

**Common validations:**
- Text length (min/max)
- Email format (RFC compliant regex)
- ID format (alphanumeric only)
- Required fields

### Token Management

**Frontend:**
```typescript
// Store after login
sessionStorage.token = token

// Retrieve for requests
const token = sessionStorage.token
// Remove on logout
delete sessionStorage.token
```

**Backend:**
```typescript
// Extract from header
const token = req.headers.authorization.slice(7)  // Remove "Bearer "

// Verify and decode
jwt.verify(token, JWT_SECRET)
// Payload: { sub: userId, iat, exp }
```

---

## 10. Monorepo Package Dependencies

### Inter-Package Dependencies

**api/package.json:**
```json
{
  "dependencies": {
    "com": "file:../com"  // Local file reference
  }
}
```

**app/package.json:**
```json
{
  "dependencies": {
    "com": "file:../com"  // Local file reference
  }
}
```

**Why?**
- Share error classes and validators across frontend and backend
- Type safety for API contracts
- Single source of truth for validation logic

### Common Build Output

When `com/` is compiled:
```
com/build/
├── index.js          # Exports errors & validate
├── errors.js         # Error class definitions
└── validate.js       # Validation functions
```

Both `api/` and `app/` reference this compiled output via import statements.

---

## 11. Current Development Context

**Branch:** `feature/product`

**Recent Activity:**
- Database migration: Changed from FS to SQL (Prisma) for main implementation
- Kept NoSQL (Mongoose) as alternative implementation
- Updated logic functions to use SQL repository
- Added test database configuration (.test.env)
- Added Prisma migration instructions to README

**Modified Files** (in current branch):
```
staff/eduardo-criado/product/api/test/authenticate-user.sh
staff/eduardo-criado/product/api/test/create-post.sh
```

**Last Commits:**
1. Change env for SQL test database; add examples in populate file
2. Test changes to authenticate, register, create post with NoSQL
3. Update FS variables to separate JSON files in repositories
4. Modify main views removing handles
5. Change endpoint path to find users; add search users logic

---

## 12. Quick Reference: Important Commands

### Setup & Installation
```bash
npm install                    # Install all dependencies (root level)
```

### API Development
```bash
cd api
npm run compile-watch          # Watch TypeScript compilation
npm run start-watch           # Start server with auto-reload
npm run test-watch            # Run tests with watch mode
npm run test-inspect          # Run tests with debugger
```

### Frontend Development
```bash
cd app
npm run dev                   # Start Vite dev server (port 5173)
npm run build                 # Build for production
npm run lint                  # Check code quality
```

### Database Setup (SQL)
```bash
# Export test env variables
export $(cat api/.test.env | xargs)

# Run Prisma migration
npx prisma migrate dev --name init --schema=api/data/repository/sql/schema.prisma

# Populate test data
npx tsx --env-file=.test.env api/data/repository/sql/populate.ts
```

### Testing
```bash
cd api
npm test                      # Run all tests once
npm run test-watch           # Run tests in watch mode
npm run test-inspect         # Debug tests
```

---

## 13. Troubleshooting & Important Notes

### Database Connection Issues
- **SQL:** Ensure MySQL is running on localhost:3306 with credentials in `.env`
- **NoSQL:** Ensure MongoDB is running on localhost:27017
- **FS:** Ensure `FS_PATH` directory exists and is writable

### Port Conflicts
- API runs on port 8080 (configurable via PORT env var)
- Frontend dev server runs on port 5173
- Ensure no other services are using these ports

### Test Database
- **CRITICAL:** Never use production database for tests
- Always set DATABASE_URL in `.test.env` to `product_test` or `product-api-test`
- Tests may clear data - use separate databases

### Frontend API Connection
- Ensure `VITE_API_URL` in app/.env matches running API server
- Default: `http://localhost:8080`
- Must include protocol (http://) and port

### Module Resolution Issues
- Local file references (`"com": "file:../com"`) require npm install after changes
- Recompile `com/` before running tests
- TypeScript must find compiled `.js` files in `com/build/`

### JWT Token Issues
- Token stored in `sessionStorage` (not persistent across browser closes)
- Token expires after 30 days (configurable in api/index.ts)
- Include `Authorization: Bearer {token}` header for protected routes

---

## 14. File Organization Summary

| Path | Purpose |
|------|---------|
| `api/index.ts` | Express server & all routes |
| `api/logic/*.ts` | Business logic layer |
| `api/data/repository/` | Data access abstractions |
| `api/data/repository/sql/schema.prisma` | Database schema definition |
| `app/src/App.tsx` | React router & main component |
| `app/src/logic/*.ts` | API client functions |
| `app/src/views/components/` | React UI components |
| `com/errors.ts` | Shared error classes |
| `com/validate.ts` | Shared validation functions |
| `api/.env` | Production environment |
| `api/.test.env` | Test environment |
| `app/.env` | Frontend environment |

---

## Conclusion

This is a comprehensive full-stack application demonstrating:
- Monorepo architecture with shared utilities
- Clean separation of concerns (API routes → Logic → Repository → Database)
- Multiple database implementations with identical interfaces
- Frontend-backend communication via REST API with JWT auth
- TypeScript strict mode throughout
- Testing infrastructure with Mocha/Chai
- Professional development workflow with watch modes and debugging

The flexible repository pattern allows easy database switching for different environments (development/testing/production).
