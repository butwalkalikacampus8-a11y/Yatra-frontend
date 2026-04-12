'use client'

import { useEffect, useState, useCallback } from 'react'

// In production: replace with real Solana getParsedConfirmedTransactions
// filtered by the government program address

const MOCK_TX_POOL = [
  { signature: '4xKpABCD9mQr', ministry: 'Ministry of Education', amount: '₨ 1,240,000', status: 'confirmed', icon: '📚', category: 'edu' },
  { signature: '7nRtEFGH2hWs', ministry: 'Dept. of Roads & Infrastructure', amount: '₨ 8,750,000', status: 'confirmed', icon: '🏗', category: 'inf' },
  { signature: '2bFmIJKL5kLp', ministry: 'Ministry of Health & Population', amount: '₨ 3,100,000', status: 'pending', icon: '🏥', category: 'hlt' },
  { signature: '9pXqMNOP7cNv', ministry: 'Nepal Army Procurement', amount: '₨ 22,400,000', status: 'confirmed', icon: '🛡', category: 'def' },
  { signature: '1jYaQRST4wBg', ministry: 'Ministry of Agriculture', amount: '₨ 650,000', status: 'confirmed', icon: '🌾', category: 'inf' },
  { signature: '3mCxUVWX8tJk', ministry: 'NRB Currency Management', amount: '₨ 450,000', status: 'confirmed', icon: '🏦', category: 'oth' },
  { signature: '6vHnYZAB1rPs', ministry: 'Bagmati Province Office', amount: '₨ 2,800,000', status: 'pending', icon: '🏛', category: 'edu' },
] as const

export function useLiveFeed() {
  const [transactions, setTransactions] = useState(MOCK_TX_POOL.slice(0, 5).map((tx, i) => ({ ...tx, timestamp: Date.now() - i * 12000 })))
  const [isLoading, setIsLoading] = useState(true)
  const [blockNumber, setBlockNumber] = useState(294_817_442)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200) // simulate load
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return
    const interval = setInterval(() => {
      const randomTx = MOCK_TX_POOL[Math.floor(Math.random() * MOCK_TX_POOL.length)]
      setTransactions(prev => [
        { ...randomTx, timestamp: Date.now() },
        ...prev.slice(0, 4),
      ])
      setBlockNumber(n => n + Math.floor(2 + Math.random() * 3))
    }, 4000)
    return () => clearInterval(interval)
  }, [isLoading])

  return { transactions, isLoading, blockNumber }
}