/**
 * lib/transactions.ts
 *
 * Shared type definitions and a deterministic mock-data generator
 * that simulates Solana on-chain government transactions.
 *
 * In production, replace `fetchTransactions` with:
 *   - A Solana RPC call via @solana/web3.js Connection.getSignaturesForAddress()
 *   - Or your Anchor program's account subscription via useAnchorProgram()
 */

export type TxStatus = "confirmed" | "finalized" | "pending";
export type TxCategory =
  | "Infrastructure"
  | "Health"
  | "Education"
  | "Defence"
  | "Agriculture"
  | "Energy";

export interface GovernmentTransaction {
  /** Solana-style base58 signature (truncated for display) */
  signature: string;
  /** Unix timestamp (ms) */
  timestamp: number;
  /** Disbursing ministry or department */
  ministry: string;
  /** Budget line / project name */
  project: string;
  category: TxCategory;
  /** Amount in NPR (Nepalese Rupees) */
  amountNPR: number;
  status: TxStatus;
  /** Solana slot number */
  slot: number;
}

// ─── Seed data pools ───────────────────────────────────────────────────────────

const MINISTRIES = [
  "Ministry of Finance",
  "Ministry of Health",
  "Ministry of Education",
  "Ministry of Infrastructure",
  "Ministry of Agriculture",
  "Ministry of Energy",
  "Ministry of Defence",
  "Ministry of Home Affairs",
];

const PROJECTS: Record<TxCategory, string[]> = {
  Infrastructure: ["Kathmandu Ring Road Phase 3", "Pokhara Airport Link", "Bagmati Corridor"],
  Health:         ["AIIMS Madhesh Construction", "Vaccine Cold Chain", "Rural Health Posts"],
  Education:      ["School Digitalisation", "Scholarship Fund FY 2082", "CTEVT Expansion"],
  Defence:        ["Border Post Modernisation", "APF Equipment Procurement"],
  Agriculture:    ["Irrigation Scheme Chitwan", "Seed Bank Establishment"],
  Energy:         ["Upper Tamakoshi O&M", "Solar Mini-Grid Mustang"],
};

const CATEGORIES: TxCategory[] = Object.keys(PROJECTS) as TxCategory[];

const CATEGORY_COLORS: Record<TxCategory, string> = {
  Infrastructure: "#f59e0b",
  Health:         "#34d399",
  Education:      "#60a5fa",
  Defence:        "#f87171",
  Agriculture:    "#a3e635",
  Energy:         "#e879f9",
};

export { CATEGORY_COLORS };

// ─── Pseudo-random helpers ──────────────────────────────────────────────────

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function fakeSignature(seed: number): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return Array.from({ length: 44 }, (_, i) =>
    chars[Math.floor(seededRand(seed * 44 + i) * chars.length)]
  ).join("");
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Generates `count` realistic mock transactions.
 * Passing a stable `seed` produces the same set (useful for SSR/hydration safety),
 * while Date.now() as seed gives a fresh set on each poll.
 */
export function generateMockTransactions(
  count: number,
  seed: number = 42
): GovernmentTransaction[] {
  return Array.from({ length: count }, (_, i) => {
    const idx      = seed + i;
    const category = CATEGORIES[Math.floor(seededRand(idx) * CATEGORIES.length)];
    const projects = PROJECTS[category];
    const project  = projects[Math.floor(seededRand(idx + 100) * projects.length)];
    const ministry = MINISTRIES[Math.floor(seededRand(idx + 200) * MINISTRIES.length)];
    const statusR  = seededRand(idx + 300);
    const status: TxStatus =
      statusR < 0.7 ? "finalized" : statusR < 0.9 ? "confirmed" : "pending";

    return {
      signature:  fakeSignature(idx),
      timestamp:  Date.now() - Math.floor(seededRand(idx + 400) * 3_600_000),
      ministry,
      project,
      category,
      amountNPR:  Math.floor(seededRand(idx + 500) * 98_000_000 + 2_000_000),
      status,
      slot:       Math.floor(280_000_000 + seededRand(idx + 600) * 1_000_000),
    };
  });
}

/** Simulates a single new incoming transaction (append to live feed) */
export function generateOneTransaction(): GovernmentTransaction {
  return generateMockTransactions(1, Date.now())[0];
}

/** Format NPR with Nepali lakh / crore notation */
export function formatNPR(amount: number): string {
  if (amount >= 10_000_000) {
    return `NPR ${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000) {
    return `NPR ${(amount / 100_000).toFixed(2)} L`;
  }
  return `NPR ${amount.toLocaleString("en-NP")}`;
}

/** Shorten a base58 signature for table display */
export function shortSig(sig: string): string {
  return `${sig.slice(0, 6)}…${sig.slice(-4)}`;
}
