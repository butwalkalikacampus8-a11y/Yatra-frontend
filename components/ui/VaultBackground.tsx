"use client";

/**
 * components/dashboard/VaultBackground.tsx
 *
 * Renders the Spline 3D scene as a full-viewport background layer.
 *
 * ARCHITECTURE NOTES
 * ──────────────────
 * • This file is ONLY ever imported via `dynamic(..., { ssr: false })`.
 *   Never import it directly — doing so would break SSR.
 *
 * • @splinetool/react-spline/next exports a Next.js-aware Spline
 *   component that handles the module resolution correctly inside
 *   the App Router.  It still requires the parent dynamic import
 *   with ssr:false because WebGL APIs don't exist in Node.js.
 *
 * • The Framer Motion fade-in on mount prevents a jarring flash
 *   when the WebGL context finishes initialising.
 *
 * • Replace SPLINE_SCENE_URL with your own exported .splinecode URL
 *   from spline.design.  A vault / safe-door scene works perfectly.
 */

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline/next";
import type { Application } from "@splinetool/runtime";

/** Public Spline scene — swap for your own vault scene URL */
const SPLINE_SCENE_URL =
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

export default function VaultBackground() {
  const splineRef = useRef<Application | null>(null);
  const [loaded, setLoaded] = useState(false);

  /** Fired once Spline has fully initialised the WebGL scene */
  function onLoad(app: Application) {
    splineRef.current = app;
    setLoaded(true);
  }

  return (
    <motion.div
      className="vault-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      aria-hidden="true" /* decorative — screen readers skip */
    >
      <Spline scene={SPLINE_SCENE_URL} onLoad={onLoad} />

      {/* Radial vignette so the scene blends into the dark UI */}
      <div className="vault-vignette" />
    </motion.div>
  );
}
