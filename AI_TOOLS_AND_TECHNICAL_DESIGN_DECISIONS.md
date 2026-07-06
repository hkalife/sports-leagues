# AI Tools & Technical/Design Decisions

## AI Tools Used

### Claude (Anthropic)

Used throughout the development process as a coding assistant, in two contexts:

- **Claude Code** — implementation: component architecture and file structure decisions, the service/hook/component layered pattern, the i18n system (dictionary-based, no external dependency), React Query caching strategy (`staleTime: Infinity`), responsive layout adjustments, and CSS animations (modal entrance, card fade-in, spinner).
- **Claude (chat)** — used earlier to validate design ideas and UI decisions before implementation: layout choices, component structure, and visual hierarchy, including generating a mockup used as a visual reference before building the actual UI.

## Design Decisions

The UI was inspired by [SportyBet](https://sportybet.com), using a similar color palette and overall visual language:

- **Primary red** (`red-600`) — matches SportyBet's brand color, used in the header, active states, pagination and CTAs
- **Card-based layout** — white cards on a light gray background, consistent with the bookmaker platform aesthetic
- **Sport badges** — colored pill labels per sport type, making it easy to scan leagues at a glance
- **Secondary navigation** — the "Most Popular" tab bar is not a static/hardcoded list. It's derived at runtime from the fetched league data: leagues are grouped by `strSport`, counted, and the top sports by league count are shown as quick-access tabs. The dropdown filter inside `LeagueList` remains the complete, authoritative sport filter (covering every sport, not just the top ones); the tabs are a shortcut that shares the same selection state, so picking a sport from either one keeps both in sync.

### State management

No external state management library (Redux, Zustand, etc.) was used. The project relies on three intentional layers:

| Layer                 | Tool                 | What it manages                                            |
| --------------------- | -------------------- | ---------------------------------------------------------- |
| Server state          | React Query          | Leagues list, season badges, loading/error states, caching |
| Global UI state       | React Context API    | Active language (en/pt)                                    |
| Local/shared UI state | `useState` + lifting | Search query, pagination, selected sport, selected league  |

The sport filter state lives in `App.tsx` (lifted) so both the `SportNav` tabs and the dropdown inside `LeagueList` share the same value without extra complexity. React Query handles the heaviest part — async data, deduplication and caching — making a dedicated state manager unnecessary for this scope.

### Architecture decisions

- **No external i18n library** — a simple dictionary object with a custom `useTranslation` hook was enough for two languages (en/pt), avoiding the overhead of `react-i18next`. This was a fast addition on top of the core requirements and did not take time away from the required functionality.
- **Client-side filtering** — since the API returns all leagues in a single call, filtering by name and sport is done in memory with `useMemo`, keeping the UX instant and avoiding unnecessary network calls per keystroke.
- **Lifted sport filter state** — the sport filter lives in `App.tsx` so the `SportNav` tabs and the dropdown inside the league list stay in sync without extra plumbing.
- **Radix UI primitives** (`@radix-ui/react-dialog`, `@radix-ui/react-select`) — used for the season badge modal and the sport dropdown specifically, since both need real accessibility behavior (focus trap and `Esc`-to-close on the dialog; keyboard navigation on the select) that would otherwise need to be hand-built. Everything else (buttons, pills, cards) is plain HTML/Tailwind, since they don't need that behavior.
- **`staleTime: Infinity`** — league and badge data doesn't change during a session, so React Query never refetches once cached, satisfying the "cache responses to avoid repeat calls" requirement without any manual cache bookkeeping.

### Known API limitation

The free-tier TheSportsDB API key used for `all_leagues.php` returns a restricted dataset compared to the paid tier: fewer leagues, and `strLeagueAlternate` is missing or `null` for a number of entries. This is a limitation of the public API itself, not a bug in the implementation — the UI treats `strLeagueAlternate` as optional and simply omits that line on the league card when it isn't present.

### Testing

No automated tests were included, given the 90-minute scope and the assignment not calling for them explicitly. If I were to extend this with more time, I'd prioritize:

- Unit tests for the badge caching/deduplication logic (cache hit vs. miss, no duplicate in-flight requests for the same league)
- Tests for the combined search + sport filter logic in the main list view

Likely with Vitest + React Testing Library, matching the Vite setup already in place.
