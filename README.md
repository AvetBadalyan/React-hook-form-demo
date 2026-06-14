# Built for JobTestPrep — Junior Front-End Role

> A focused demo app built by **Avet Badalyan** to demonstrate the exact stack listed in the JobTestPrep Junior Front-End Developer job description: React Hook Form, Yup, styled-components, TanStack Query, and Axios — all in strict TypeScript.

![App overview](./screenshots/Screenshot%202026-06-14%20180521.png)

---

## What this app is

This is not a generic todo app. Every decision — the color palette, the copy, the component patterns — was made to match the JobTestPrep tech stack and design language.

The app has two interactive sections:

1. **Section ① — React Hook Form + Yup validation**: A candidate registration form that validates all fields without a single `useState`. Errors appear inline on submit without a page reload.
2. **Section ② — TanStack Query + Axios**: A live REST API fetch from `jsonplaceholder.typicode.com` with caching, stale-time control, background refetch on window focus, and a manual refetch button.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict, zero `tsc` errors) |
| Form management | React Hook Form + `@hookform/resolvers` |
| Validation | Yup — schema defined separately in `src/schemas/` |
| Styling | styled-components with `ThemeProvider` + `DefaultTheme` augmentation |
| Data fetching | TanStack Query v5 + Axios |
| Dev tooling | React Query Devtools, ESLint, TypeScript strict mode |

---

## How it works

### Form section (Section ①)

![Registration form](./screenshots/Screenshot%202026-06-14%20180534.png)
![Validation errors](./screenshots/Screenshot%202026-06-14%20180612.png)

- `useForm<RegistrationFormData>` is driven by a `yupResolver` — no manual state for field values or errors
- The Yup schema lives in `src/schemas/registration.ts` and is exported as both the schema and `yup.InferType<>` for type safety
- Transient props (`$error`) prevent styled-components from forwarding non-HTML attributes to the DOM
- The submit button disables during async submission; a success banner appears on `isSubmitSuccessful` with a reset link

Validation rules enforced:
- Name: minimum 2 characters
- Email: valid format
- Age: number between 18–65
- Role: must select one of Developer / Designer / Manager
- Password: minimum 8 characters, at least one uppercase letter, one number
- Confirm password: must match password
- Terms checkbox: must be accepted

### Data fetching section (Section ②)

- `useQuery` fetches 6 posts from a public REST API with a 1-minute `staleTime`
- `isFetching` (not `isLoading`) is used for the refetch button state — `isLoading` is only true on the very first fetch, `isFetching` covers background refetches too
- Errors are shown with `error?.message ?? 'Unknown error'` — no unsafe type casting
- The floating Promise from `refetch()` is correctly discarded with `void refetch()`

### Styling architecture

- Single theme object in `src/theme.ts` — one source of truth for all colors, radii, and shadows
- `src/styled.d.ts` augments `DefaultTheme` so every styled-component template literal is fully typed without any casting
- `1rem = 10px` via `html { font-size: 62.5% }` — all spacing uses a 4-value scale: `0.8rem / 1.6rem / 3.2rem / 6.4rem`
- Shared card primitives in `src/components/ui/Card.tsx` used across both sections via `styled(Card)` extension — no CSS duplication
- Mobile responsive at `540px` breakpoint

---

## Project structure

```
src/
├── api/
│   └── posts.ts              # Axios fetch + Post interface
├── components/
│   ├── ui/
│   │   └── Card.tsx          # Shared card primitives
│   ├── PostsSection.tsx      # TanStack Query + Axios demo
│   └── RegistrationForm.tsx  # React Hook Form + Yup demo
├── schemas/
│   └── registration.ts       # Yup schema + InferType export
├── styled.d.ts               # DefaultTheme augmentation
├── theme.ts                  # Design tokens
├── App.tsx                   # Page layout + intro card
├── main.tsx                  # ThemeProvider + QueryClientProvider
└── index.css                 # 62.5% base + Nunito Sans + reset
```

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Author

**Avet Badalyan** — Frontend Engineer  
3+ years across fintech (Cognaize), e-commerce (Ashstone Studios — Shopify Theme Store), and enterprise web (EPAM Systems).  
[avetbadalyan@gmail.com](mailto:avetbadalyan@gmail.com)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
