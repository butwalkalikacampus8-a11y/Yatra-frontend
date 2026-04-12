'use client'

import { motion } from 'framer-motion'

interface Transaction {
  signature: string
  ministry: string
  amount: string
  status: 'confirmed' | 'pending' | 'failed'
  icon: string
  category: 'edu' | 'inf' | 'hlt' | 'def' | 'oth'
  timestamp: number
}

const CATEGORY_STYLES: Record<string, string> = {
  edu: 'bg-[rgba(0,194,255,0.1)]',
  inf: 'bg-[rgba(0,255,136,0.08)]',
  hlt: 'bg-[rgba(255,80,120,0.08)]',
  def: 'bg-[rgba(160,80,255,0.08)]',
  oth: 'bg-white/[0.05]',
}
const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-[rgba(0,255,136,0.1)] text-[#00FF88]',
  pending:   'bg-[rgba(255,160,0,0.1)] text-[#FFA000]',
  failed:    'bg-[rgba(255,80,80,0.1)] text-[#FF5050]',
}

export function TxRow({ tx, index }: { tx: Transaction; index: number }) {
  const shortSig = `${tx.signature.slice(0, 4)}...${tx.signature.slice(-4)}`

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 py-3.5"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${CATEGORY_STYLES[tx.category]}`}>
        {tx.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium truncate">{tx.ministry}</div>
        <div className="font-mono-custom text-[10.5px] text-white/35 mt-0.5">{shortSig}</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-mono-custom text-[13px] font-bold text-[#00C2FF]">{tx.amount}</div>
        <span className={`inline-block mt-1 text-[9.5px] tracking-[0.08em] px-2 py-0.5 rounded-full ${STATUS_STYLES[tx.status]}`}>
          {tx.status.toUpperCase()}
        </span>
      </div>
    </motion.div>
  )
}