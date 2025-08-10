# Typed Routes with Ziggy

This project uses [Ziggy](https://github.com/tighten/ziggy) for type-safe routing between Laravel and React.

## Available Commands

### Generate Routes
```bash
composer generate:routes
```
Generates TypeScript types for all Laravel routes (excluding admin routes).

### Check Routes
```bash
composer routes:check
```
Generates routes and runs TypeScript checking to ensure type safety.

### Watch Routes (Auto-regenerate)
```bash
composer routes:watch
```
Continuously watches for changes in route files and automatically regenerates TypeScript types.

### Development Environment
```bash
composer dev
```
Starts the complete development environment with automatic route regeneration, including:
- Laravel server
- Queue listener
- Log viewer
- Vite dev server
- Route watcher

## Usage in React Components

```typescript
import { route } from '@/route';
import { router } from '@inertiajs/react';

// Navigate to a route without parameters
router.get(route('jobs.index'));

// Navigate to a route with parameters
router.get(route('jobs.show', { job: 1 }));

// Navigate to a route with multiple parameters
router.get(route('verification.verify', { id: 1, hash: 'abc123' }));
```

## Type Safety

- ✅ Autocomplete for all available routes
- ✅ TypeScript errors for non-existent routes
- ✅ Required parameter enforcement
- ✅ Type safety for parameter values

## Configuration

Routes are configured in `config/ziggy.php`:
- Admin routes are excluded from the generated types
- Debug routes are excluded

## Regenerating Types

Run `composer generate:routes` whenever you:
- Add new routes
- Modify existing routes
- Change route parameters

The types are automatically regenerated during:
- `composer prepare` (pre-commit checks)
- `composer routes:check`
- `composer routes:watch` (continuous watching)
- `composer dev` (full dev environment with watching)
