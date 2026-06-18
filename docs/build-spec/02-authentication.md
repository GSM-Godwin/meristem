# Authentication

Single-role admin authentication protecting everything under `/admin`. No public user accounts exist — `Admin` (defined in `01-database-schema.md`) is the only identity in the system.

## Flow

1. **Login page** at `/admin/login` — plain email + password form, no "forgot password" flow needed for a small internal team (a developer can reset a password directly in the database if needed).
2. **On submit:** look up the `Admin` by email, compare the submitted password against `passwordHash` using `bcrypt.compare`. If it matches, sign a JWT (using a library like `jose`) containing the admin's `id` and `email`, with a reasonable expiry (e.g. 7 days). Set it as an **httpOnly, secure, sameSite=lax** cookie.
3. **Middleware** (`middleware.ts`) checks every request to `/admin/*` (except `/admin/login`) for a valid session cookie. If missing or invalid, redirect to `/admin/login`.
4. **Logout** simply clears the cookie and redirects to `/admin/login`.

## Password storage

Never store plaintext passwords. Hash with `bcrypt` (cost factor 10–12) before saving to `Admin.passwordHash`, and only ever compare hashes — never decrypt.

## Creating the first admin

Since there's no public signup, the first `Admin` row needs to be created via the seed script described in `01-database-schema.md`, with a hardcoded initial email/password that gets changed after first login. Don't build a public `/admin/signup` route — new admins should be added by inserting a row directly (or via a small internal-only script), since the number of admins is expected to stay small and trusted.

## What's explicitly out of scope

No OAuth, no magic links, no multi-factor auth, no role/permission tiers — every admin has identical access to every part of the dashboard. If finer-grained roles are ever needed, that's a deliberate future addition, not something to build speculatively now.
