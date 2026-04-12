"use client";

/**
 * components/dashboard/KpiStrip.tsx
 *
 * Four glassmorphic KPI cards arranged horizontally.
 * Each card uses a Framer Motion count-up on mount.
 * Values are seeded from mock data — wire to Solana RPC in production.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface KpiCardProps {
  label: string;
  rawValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accentColor: string;
  delay: number;
}

function AnimatedNumber({
  target,
  decimals = 0,
}: {
  target: number;
  decimals?: number;
}) {
  const count     = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const rafRef    = useRef<ReturnType<typeof animate>>();

  useEffect(() => {
    rafRef.current = animate(count, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => rafRef.current?.stop();
  }, [target, decimals, count]);

  return <span>{display}</span>;
}

function KpiCard({ label, rawValue, prefix = "", suffix = "", decimals = 0, accentColor, delay }: KpiCardProps) {
  return (
    <motion.div
      className="kpi-card"
      style={{ "--accent": accentColor } as React.CSSProperties}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="kpi-accent-bar" />
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">
        {prefix}
        <AnimatedNumber target={rawValue} decimals={decimals} />
        {suffix && <span className="kpi-suffix">{suffix}</span>}
      </p>
    </motion.div>
  );
}

export default function KpiStrip() {
  return (
    <div className="kpi-strip">
      <KpiCard
        label="Total Disbursed (FY 2081/82)"
        rawValue={128.47}
        prefix="NPR "
        suffix=" Billion"
        decimals={2}
        accentColor="#f59e0b"
        delay={0.1}
      />
      <KpiCard
        label="Transactions Today"
        rawValue={3842}
        accentColor="#34d399"
        delay={0.2}
      />
      <KpiCard
        label="Active Ministries"
        rawValue={18}
        accentColor="#60a5fa"
        delay={0.3}
      />
      <KpiCard
        label="On-Chain Verification Rate"
        rawValue={99.97}
        suffix="%"
        decimals={2}
        accentColor="#e879f9"
        delay={0.4}
      />
    </div>
  );
}
