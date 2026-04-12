"use client";

/**
 * components/dashboard/TopNav.tsx
 *
 * Sticky top bar with the Drishti wordmark, Nepal coat of arms emoji,
 * a network status pill, and a wallet connection button placeholder.
 */

import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.header
      className="top-nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Wordmark */}
      <div className="nav-brand">
        <span className="nav-emblem" aria-hidden="true">🏔️</span>
        <span className="nav-wordmark">
          <span className="nav-wordmark-drishti">Drishti</span>
          <span className="nav-wordmark-np">Nepal</span>
        </span>
      </div>

      {/* Right-side controls */}
      <div className="nav-actions">
        {/* Solana network badge */}
        <div className="network-pill">
          <motion.span
            className="net-dot"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          Solana Devnet
        </div>

        {/* Wallet connect — wire to @solana/wallet-adapter in production */}
        <button className="btn-wallet" aria-label="Connect Solana wallet">
          Connect Wallet
        </button>
      </div>
    </motion.header>
  );
}
