'use client'
// ⚠ Must NOT be async — client components cannot be async

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function HeroText() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Scroll-driven parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="relative z-10 text-center flex flex-col items-center"
    >
      {/* Live badge */}
      <motion.div variants={ITEM_VARIANTS}
        className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
        <span className="font-mono-custom text-[11px] tracking-[0.08em] text-white/50 uppercase">
          Live on Solana Mainnet · FY 2081/82 BS
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1 variants={ITEM_VARIANTS}
        className="font-display font-extrabold leading-[1.05] tracking-[-0.02em] mb-6"
        style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
      >
        Every Rupee.
        <br />
        <span className="bg-gradient-to-r from-[#00C2FF] via-[#4488FF] to-[#00C2FF] bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_4s_linear_infinite]">
          On-Chain. In Real Time.
        </span>
      </motion.h1>

      {/* Subheading — bilingual */}
      <motion.p variants={ITEM_VARIANTS}
        className="max-w-[540px] text-base font-light leading-[1.8] text-white/45 mb-10"
      >
        Nepal's fiscal transparency protocol — every government budget
        transaction verified, immutable, and publicly auditable on the
        Solana blockchain.
        <br />
        <span className="text-sm text-white/25 italic mt-1 block">
          नेपाल सरकारको वित्तीय पारदर्शिता प्रणाली — प्रत्येक रकम सार्वजनिक छ।
        </span>
      </motion.p>

      {/* CTAs */}
      <motion.div variants={ITEM_VARIANTS} className="flex items-center gap-4 flex-wrap justify-center">
        <button className="px-8 py-3.5 bg-[#00C2FF] text-[#050505] rounded-md font-mono-custom text-xs font-bold tracking-[0.08em] uppercase hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] hover:-translate-y-px transition-all">
          Explore Budget Data
        </button>
        <button className="px-8 py-3.5 border border-white/10 rounded-md text-white/50 font-mono-custom text-xs tracking-[0.08em] uppercase hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all">
          View Audit Trail →
        </button>
      </motion.div>
    </motion.div>
  )
}