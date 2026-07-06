# Sports Leagues

A single-page application that lets you browse and filter sports leagues from around the world, built as a frontend take-home assignment.

## Features

- Browse all sports leagues fetched from [TheSportsDB](https://www.thesportsdb.com/free_sports_api)
- Filter leagues by name (search) and by sport type (dropdown)
- Quick sport filters derived dynamically from API data (top 5 by league count)
- Click any league card to view its season badge image
- Responses cached with React Query (`staleTime: Infinity`) — no repeat API calls
- English / Portuguese language support
- Responsive layout (mobile, tablet, desktop)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **TanStack React Query v5** — data fetching and caching
- **Radix UI** — Dialog (badge modal) and Select primitives

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── shared/
│   │   └── Spinner.tsx
│   ├── BadgeModal.tsx
│   ├── Header.tsx
│   ├── LeagueCard.tsx
│   ├── LeagueFilters.tsx
│   ├── LeagueList.tsx
│   ├── PageTitle.tsx
│   └── SportNav.tsx
├── hooks/
│   ├── useLanguage.ts
│   ├── useLeagues.ts
│   ├── useSeasonBadge.ts
│   └── useTranslation.ts
├── i18n/
│   ├── languageContext.ts
│   ├── LanguageContext.tsx
│   └── translations.ts
├── services/
│   └── leagues.ts
└── types/
    └── league.ts
```

## API

| Endpoint                                                    | Description                     |
| ----------------------------------------------------------- | ------------------------------- |
| `GET /api/v1/json/3/all_leagues.php`                        | Fetch all leagues               |
| `GET /api/v1/json/3/search_all_seasons.php?badge=1&id={id}` | Fetch season badge by league ID |

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Type-check and build for production
npm run lint      # Run ESLint
npm run format    # Run Prettier
```
