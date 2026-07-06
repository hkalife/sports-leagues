# AI Tools & Design Decisions

## AI Tools Used

### Claude (Anthropic)

Used throughout the development process as a coding assistant. Claude helped with:

- Component architecture and file structure decisions
- Implementation of the service/hook/component layered pattern
- Building the i18n system (dictionary-based, no external dependency)
- React Query caching strategy (`staleTime: Infinity`)
- Responsive layout adjustments
- CSS animations (modal entrance, card fade-in, spinner)

### Claude (Design validation)

Used to validate design ideas and UI decisions before and during implementation, helping evaluate layout choices, component structure, and visual hierarchy.

## Design Decisions

The UI was inspired by [SportyBet](https://sportybet.com), using a similar color palette and overall visual language:

- **Primary red** (`red-600`) — matches SportyBet's brand color, used in the header, active states, pagination and CTAs
- **Card-based layout** — white cards on a light gray background, consistent with the bookmaker platform aesthetic
- **Sport badges** — colored pill labels per sport type, making it easy to scan leagues at a glance
- **Secondary navigation** — "Most Popular" tab bar mirrors the sport quick-filters common in betting platforms

### State management

No external state management library (Redux, Zustand, etc.) was used. The project relies on three intentional layers:

| Layer                 | Tool                 | What it manages                                            |
| --------------------- | -------------------- | ---------------------------------------------------------- |
| Server state          | React Query          | Leagues list, season badges, loading/error states, caching |
| Global UI state       | React Context API    | Active language (en/pt)                                    |
| Local/shared UI state | `useState` + lifting | Search query, pagination, selected sport, selected league  |

The sport filter state lives in `App.tsx` (lifted) so both the `SportNav` tabs and the dropdown inside `LeagueList` share the same value without extra complexity. React Query handles the heaviest part — async data, deduplication and caching — making a dedicated state manager unnecessary for this scope.

### Architecture decisions

- **No external i18n library** — a simple dictionary object with a custom `useTranslation` hook was enough for two languages, avoiding the overhead of `react-i18next`
- **Client-side filtering** — since the API returns all leagues in a single call, filtering by name and sport is done in memory with `useMemo`, keeping the UX instant
- **Lifted sport filter state** — the sport filter lives in `App.tsx` so the `SportNav` tabs and the dropdown inside the league list stay in sync without extra plumbing
- **`staleTime: Infinity`** — league and badge data doesn't change during a session, so React Query never refetches once cached
