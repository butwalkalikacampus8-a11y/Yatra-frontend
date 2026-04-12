# 🏔️ Drishti — Fiscal Transparency Portal
### Government of Nepal · On-Chain Public Expenditure Dashboard

---

## Architecture Overview

```
app/
  layout.tsx              ← Root Server Component (no "use client")
  globals.css             ← Design system tokens + all component CSS
  dashboard/
    page.tsx              ← Server Component — thin shell, exports metadata

components/dashboard/
  DrishtiDashboard.tsx    ← Client Component — page orchestrator + Framer Motion
  VaultBackground.tsx     ← Client Component — Spline 3D scene (NEVER import directly)
  TransactionTable.tsx    ← Client Component — live-polling table with AnimatePresence
  KpiStrip.tsx            ← Client Component — 4 animated KPI cards
  TopNav.tsx              ← Client Component — sticky top bar
  SideNav.tsx             ← Client Component — vertical icon nav

lib/
  transactions.ts         ← Types, mock data generator, formatters
```

---

## Critical Technical Decisions

### 1. Hydration-Safe 3D Integration

The Spline WebGL runtime accesses `window`, `document`, and `WebGLRenderingContext`
which do not exist in Node.js. Importing `VaultBackground` directly would cause:

```
Error: document is not defined
ReferenceError: WebGLRenderingContext is not defined
```

**Solution** — always import via `dynamic` with `ssr: false`:

```ts
// ✅ Correct — in DrishtiDashboard.tsx
const VaultBackground = dynamic(() => import("./VaultBackground"), { ssr: false });

// ❌ Wrong — direct import would break SSR
import VaultBackground from "./VaultBackground";
```

### 2. No Async Client Components

Next.js 15 prohibits `async` Client Components. All data fetching uses `useEffect`:

```ts
// ✅ Correct
"use client";
export default function TransactionTable() {
  const [txs, setTxs] = useState([]);
  useEffect(() => { /* fetch here */ }, []);
  return <table>...</table>;
}

// ❌ Wrong
"use client";
export default async function TransactionTable() { /* not allowed */ }
```

### 3. ESM Transpilation for Spline

`@splinetool/react-spline` ships as ESM-only. Without the `transpilePackages`
directive in `next.config.ts`, Next.js 15 throws a `SyntaxError: Cannot use
import statement` during the server build phase.

```ts
// next.config.ts
transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"]
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server (Turbopack)
pnpm dev

# Open http://localhost:3000/dashboard
```

---

## Connecting Your Spline Scene

1. Create a vault / safe-door scene at [spline.design](https://spline.design)
2. Export → "Spline Viewer" → copy the `.splinecode` URL
3. Replace `SPLINE_SCENE_URL` in `components/dashboard/VaultBackground.tsx`

Recommended scene settings for the "war room" aesthetic:
- Background: transparent (the CSS void colour shows through)
- Lighting: single warm-amber point light, subtle ambient
- Animation: continuous slow rotation on the Y axis

---

## Connecting to Solana / Anchor

Replace the mock data in `TransactionTable.tsx`'s `useEffect` with:

```ts
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);

useEffect(() => {
  const programId = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);

  // Subscribe to program account changes
  const subId = connection.onProgramAccountChange(programId, (info) => {
    // Parse your Anchor account data here
    const tx = parseAnchorTransaction(info.accountInfo.data);
    setTxs(prev => [tx, ...prev].slice(0, MAX_ROWS));
  });

  return () => { connection.removeProgramAccountChangeListener(subId); };
}, []);
```

---

## Design System

| Token          | Value                    | Usage              |
|----------------|--------------------------|--------------------|
| `--amber`      | `#f59e0b`                | Primary accent     |
| `--emerald`    | `#34d399`                | Confirmed/success  |
| `--sky`        | `#60a5fa`                | Links, info        |
| `--rose`       | `#f87171`                | Errors, warnings   |
| `--bg-surface` | `rgba(12,14,20,0.72)`    | Glass panels       |
| `--blur-glass` | `blur(18px) saturate(160%)` | Backdrop filter |
| Font Display   | Syne (800)               | Headings           |
| Font Mono      | JetBrains Mono           | Data, code, badges |

---

## Roadmap

- [ ] Real-time Solana WebSocket subscription
- [ ] Ministry-level drill-down pages
- [ ] Audit trail export (PDF / CSV)
- [ ] Nepali language (Devanagari) toggle
- [ ] Dark / High-contrast accessibility mode
- [ ] Solana wallet adapter integration (Phantom, Backpack)
