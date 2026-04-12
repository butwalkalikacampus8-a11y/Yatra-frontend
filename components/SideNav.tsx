"use client";

/**
 * components/dashboard/SideNav.tsx
 *
 * Vertical icon-plus-label navigation sidebar.
 * Uses Framer Motion stagger for the item reveal on mount.
 * Active state is managed locally — replace with usePathname() for routing.
 */

import { useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { icon: "⚡", label: "Live Feed",    id: "feed"     },
  { icon: "📊", label: "Analytics",   id: "analytics"},
  { icon: "🏛️",  label: "Ministries",  id: "ministry" },
  { icon: "🔗", label: "Blockchain",  id: "chain"    },
  { icon: "📁", label: "Audit Logs",  id: "audit"    },
  { icon: "⚙️",  label: "Settings",   id: "settings" },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function SideNav() {
  const [active, setActive] = useState("feed");

  return (
    <motion.nav
      className="side-nav"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Primary navigation"
    >
      {NAV_ITEMS.map((item) => (
        <motion.button
          key={item.id}
          className={`side-nav-item ${active === item.id ? "side-nav-item--active" : ""}`}
          variants={itemVariants}
          onClick={() => setActive(item.id)}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.96 }}
          aria-current={active === item.id ? "page" : undefined}
        >
          <span className="side-nav-icon" aria-hidden="true">{item.icon}</span>
          <span className="side-nav-label">{item.label}</span>
          {active === item.id && (
            <motion.div
              className="side-nav-indicator"
              layoutId="nav-indicator"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.nav>
  );
}
