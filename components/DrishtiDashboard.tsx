"use client";

/**
 * components/dashboard/DrishtiDashboard.tsx
 *
 * Root CLIENT COMPONENT that composes the full dashboard.
 * Responsibilities:
 *  - Owns page-level Framer Motion orchestration (staggered reveal)
 *  - Renders the lazy-loaded 3D vault background (ssr: false)
 *  - Renders the transaction table foreground
 *  - Renders the header, KPI strip, and sidebar nav
 *
 * WHY NOT async?  Next.js 15 disallows async Client Components.
 * All data flows through useEffect hooks inside child components.
 */

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TransactionTable from "./TransactionTable";
import KpiStrip from "./KpiStrip";
import TopNav from "./TopNav";
import SideNav from "./SideNav";

/**
 * CRITICAL — ssr: false prevents the Spline WebGL context from
 * attempting to render on the server, which would cause a
 * "document is not defined" hydration mismatch in Next.js.
 */
const VaultBackground = dynamic(() => import("./VaultBackground"), {
  ssr: false,
  loading: () => (
    <div className="vault-placeholder" aria-hidden="true" />
  ),
});

/** Page-level reveal: children stagger in from below */
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export const childVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DrishtiDashboard() {
  return (
    <div className="drishti-root">
      {/* ── 3D vault lives behind everything via CSS z-index ── */}
      <VaultBackground />

      {/* ── Persistent chrome ── */}
      <TopNav />
      <SideNav />

      {/* ── Main scrollable content area ── */}
      <motion.main
        className="drishti-main"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page title block */}
        <motion.div variants={childVariants} className="page-header">
          <span className="page-eyebrow">LIVE LEDGER</span>
          <h1 className="page-title">
            राष्ट्रिय कोष
            <span className="title-accent"> Transparency Feed</span>
          </h1>
          <p className="page-sub">
            All fiscal movements recorded immutably on Solana Devnet · Updated every 4 s
          </p>
        </motion.div>

        {/* KPI strip */}
        <motion.div variants={childVariants}>
          <KpiStrip />
        </motion.div>

        {/* Transaction table */}
        <motion.div variants={childVariants}>
          <TransactionTable />
        </motion.div>
      </motion.main>
    </div>
  );
}
