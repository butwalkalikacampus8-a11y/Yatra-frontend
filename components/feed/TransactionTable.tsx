"use client";

/**
 * components/dashboard/TransactionTable.tsx
 *
 * Glassmorphism transaction table that:
 *  1. Bootstraps with 12 mock rows on mount (useEffect — not async component)
 *  2. Polls every 4 s, prepending one new row and trimming the tail
 *  3. Animates new rows in with Framer Motion (AnimatePresence)
 *  4. Color-codes transaction categories and status badges
 *
 * PERFORMANCE NOTE — AnimatePresence with `mode="popLayout"` keeps
 * exit animations from causing layout jank when rows are removed.
 */

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GovernmentTransaction,
  CATEGORY_COLORS,
  generateMockTransactions,
  generateOneTransaction,
  formatNPR,
  shortSig,
} from "@/lib/transactions";

const POLL_INTERVAL_MS = 4000;
const MAX_ROWS         = 14;
const INITIAL_COUNT    = 12;

// ─── Animation variants ────────────────────────────────────────────────────────

/** New rows slide down from above */
const rowVariants = {
  initial: { opacity: 0, y: -20, scaleY: 0.92 },
  animate: {
    opacity: 1, y: 0, scaleY: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, x: 40,
    transition: { duration: 0.24, ease: "easeIn" },
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: GovernmentTransaction["status"] }) {
  const cfg = {
    finalized: { label: "Finalized", cls: "badge-finalized" },
    confirmed: { label: "Confirmed", cls: "badge-confirmed" },
    pending:   { label: "Pending",   cls: "badge-pending"   },
  }[status];

  return <span className={`status-badge ${cfg.cls}`}>{cfg.label}</span>;
}

function CategoryPill({ category }: { category: GovernmentTransaction["category"] }) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="category-pill"
      style={{ borderColor: color, color }}
    >
      {category}
    </span>
  );
}

function LiveDot() {
  return (
    <motion.span
      className="live-dot"
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function TransactionTable() {
  const [txs, setTxs]         = useState<GovernmentTransaction[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  /** Seed the table once on mount */
  useEffect(() => {
    setTxs(generateMockTransactions(INITIAL_COUNT, 999));
  }, []);

  /** Poll: prepend one new transaction, trim tail */
  const addTransaction = useCallback(() => {
    const next = generateOneTransaction();
    setLastAdded(next.signature);
    setTxs((prev) => [next, ...prev].slice(0, MAX_ROWS));
  }, []);

  useEffect(() => {
    const id = setInterval(addTransaction, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [addTransaction]);

  return (
    <section className="tx-table-section">
      {/* ── Table header ── */}
      <div className="tx-table-header">
        <div className="tx-table-title-row">
          <h2 className="tx-table-title">
            <LiveDot />
            Live Transactions
          </h2>
          <span className="tx-count">{txs.length} entries</span>
        </div>
        <p className="tx-table-subtitle">
          Solana Devnet · Anchor Program · Auto-refreshing
        </p>
      </div>

      {/* ── Scrollable table ── */}
      <div className="tx-scroll-container">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Signature</th>
              <th>Time</th>
              <th>Ministry</th>
              <th>Project</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Slot</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {txs.map((tx) => (
                <motion.tr
                  key={tx.signature}
                  className={`tx-row ${tx.signature === lastAdded ? "tx-row--new" : ""}`}
                  variants={rowVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  {/* Signature — links to Solana Explorer */}
                  <td className="td-sig">
                    <a
                      href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sig-link"
                    >
                      {shortSig(tx.signature)}
                    </a>
                  </td>

                  {/* Relative time */}
                  <td className="td-time">
                    {new Date(tx.timestamp).toLocaleTimeString("en-NP", {
                      hour:   "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>

                  <td className="td-ministry">{tx.ministry}</td>
                  <td className="td-project">{tx.project}</td>

                  <td>
                    <CategoryPill category={tx.category} />
                  </td>

                  <td className="td-amount">{formatNPR(tx.amountNPR)}</td>

                  <td className="td-slot">#{tx.slot.toLocaleString()}</td>

                  <td>
                    <StatusBadge status={tx.status} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </section>
  );
}
