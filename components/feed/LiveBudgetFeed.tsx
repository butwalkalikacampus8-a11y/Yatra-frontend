'use client'

import { useEffect, useState } from 'react'
import { TxRow } from './TxRow'
import { AllocationPanel } from './AllocationPanel'
import { ChainStats } from './ChainStats'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { useLiveFeed } from '@/hooks/useLiveFeed'

export function LiveBudgetFeed() {
  const { transactions, isLoading, blockNumber } = useLiveFeed()

  return (
    <div className="grid grid-cols-[1fr_380px] gap-6">
      {/* TX Ledger */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 font-mono-custom text-[11px] tracking-[0.08em] text-[#00FF88] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            LIVE
          </div>
          <span className="font-mono-custom text-[11px] text-white/40">
            Block #{blockNumber.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col divide-y divide-white/[0.04]">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)
            : transactions.map((tx, i) => <TxRow key={tx.signature} tx={tx} index={i} />)
          }
        </div>

        <ChainStats />
      </div>

      {/* Allocation Panel */}
      <AllocationPanel />
    </div>
  )
}