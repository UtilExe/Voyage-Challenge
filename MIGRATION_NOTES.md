# Migration Notes

## Task 1: Migration from Pages Router -> App Router

### What I did
- Migrated `_app.tsx` logic into `src/app/layout.tsx` (root layout)
- Moved React Query provider from `_app.tsx` into a separate `src/app/providers.tsx` client component
- Moved page from `src/pages/index.tsx` to `src/app/voyages/page.tsx`
- Split the implementation into 1) Server Component (page), 2) Client Component (table)
- Added 302 redirect from `/` to `/voyages` in `next.config.mjs`
- Deleted the entire `src/pages/` directory

### Why these choices

**Server/Client split:** Leverage Server Components as much as possible, and only use Client Component when needing Client/browser functionalities (e.g. the table). Keeps the bundle smaller and follows Next.js patterns. 

**`/voyages` route:** Since this page represents domain-specific data (voyage listings), I wanted to leave room for a future homepage. 
Instead of making this the index route, it’s implemented under `/voyages`.
Until a proper homepage is in place, `/` simply redirects to `/voyages` for a clean user flow.

**Removed i18n config:** App Router doesn't support the old `i18n` config. Since we're only using English on the project, I removed it. If we need multiple languages later, we can implement middleware + `[lang]` dynamic routes.

**`suppressHydrationWarning` on html tag:** next-themes adds dark mode classes to `<html>` on the client, causing hydration warnings. This is expected behavior. Reference: `https://ui.shadcn.com/docs/dark-mode/next`
