# BIDINGO Game

## Running in Different Modes

### Development Mode
```bash
npm run dev
```
Features:
- Hot Module Replacement (HMR)
- React Query DevTools
- Detailed error logging
- Mock API endpoints
- No query retries

### Test Mode
```bash
npm run dev:test
```
Features:
- Isolated test environment
- Mock data
- No query retries
- Test-specific API endpoints

### Production Mode
```bash
npm run dev:prod
```
Features:
- Production API endpoints
- Optimized performance
- Error tracking
- Real data

## Environment Setup

1. Environment files are provided for each mode:
   - `.env.development`
   - `.env.test`
   - `.env.production`

2. Each file contains mode-specific configuration:
   - API URLs
   - WebSocket endpoints
   - Feature flags
   - Version info

## Building for Different Environments

```bash
# Development build
npm run build:dev

# Test build
npm run build:test

# Production build
npm run build:prod
```

## Preview Builds

```bash
# Preview development build
npm run preview

# Preview production build
npm run preview:prod
```