## BIDINGO Game Setup Guide

### 1. Choose Environment Profile

The application supports three environment profiles:

#### Development Profile
```bash
# Start in development mode
npm run dev
```
Features:
- React Query DevTools enabled
- Immediate query invalidation
- Detailed logging
- No refetch on window focus
- Shorter garbage collection time

#### Test Profile
```bash
# Start in test mode
npm run dev:test
```
Features:
- React Query DevTools enabled
- No query retries
- Test-specific API endpoints
- Isolated test database

#### Production Profile
```bash
# Start in production mode
npm run dev:prod
```
Features:
- No DevTools
- Optimized query caching
- Production API endpoints
- Error logging only

### 2. Environment Setup

1. Create appropriate .env file:
   - `.env.development` for development
   - `.env.test` for testing
   - `.env.production` for production

2. Configure environment variables:
   ```env
   VITE_API_URL=<api-url>
   VITE_WS_URL=<websocket-url>
   VITE_ENV=<environment>
   ```

### 3. Start the Application

#### Using Docker (Recommended)

1. Development:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. Testing:
   ```bash
   docker-compose -f docker-compose.test.yml up
   ```

3. Production:
   ```bash
   docker-compose up
   ```

#### Using NPM

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application:
   ```bash
   # Development
   npm run dev

   # Test
   npm run dev:test

   # Production
   npm run dev:prod
   ```

### 4. Verify Setup

1. Access the application:
   - Development: http://localhost:5173
   - Test: http://localhost:5174
   - Production: http://localhost:80

2. Check environment indicators:
   - Development: React Query DevTools available in bottom-right corner
   - Test: Test environment banner at top of page
   - Production: No development tools visible

### 5. Development Features

#### React Query DevTools
- Available in development and test environments
- Toggle with `ctrl + h` (Windows/Linux) or `⌘ + h` (Mac)
- Shows active queries, mutations, and cache state

#### Hot Module Replacement (HMR)
- Active in development mode
- Instant updates without full page refresh
- State preservation during component updates

#### Environment-Specific Behaviors
- Development: Aggressive cache invalidation, detailed logging
- Test: No retries, isolated test data
- Production: Optimized for performance and stability

### 6. Common Issues

1. Port Conflicts
   ```bash
   # Change ports in docker-compose files or package.json scripts
   # Default ports: 5173 (dev), 5174 (test), 80 (prod)
   ```

2. Environment Variables
   ```bash
   # Verify correct .env file is being used
   # Check VITE_ENV value matches intended environment
   ```

3. Docker Issues
   ```bash
   # Reset containers and volumes
   docker-compose down -v
   docker-compose up --build
   ```

### 7. Additional Commands

```bash
# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview

# Clean install
npm ci

# Docker commands
npm run docker:build
npm run docker:run
npm run docker:compose
npm run docker:compose:down
```
