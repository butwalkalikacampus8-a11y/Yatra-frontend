'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Budget Feed', href: '/feed' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Audit Trail', href: '/audit' },
]

export function Navbar() {
  const [lang, setLang] = useState<'en' | 'np'>('en')

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-8 bg-[rgba(5,5,5,0.7)] backdrop-blur-2xl border-b border-white/[0.06]">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 border border-[#00C2FF] rounded-md flex items-center justify-center">
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-[#00C2FF]" />
        </div>
        <div>
          <span className="font-display font-bold tracking-[0.08em] text-[17px] uppercase">
            {lang === 'en' ? <>DRISH<span className="text-[#00C2FF]">TI</span></> : <>दृ<span className="text-[#00C2FF]">ष्टि</span></>}
          </span>
          <span className="block text-[9px] tracking-[0.15em] text-white/30 font-light">
            {lang === 'en' ? 'दृष्टि प्रोटोकल' : 'DRISHTI PROTOCOL'}
          </span>
        </div>
      </div>

      {/* Links */}
      <ul className="flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="text-[11px] font-medium tracking-[0.06em] uppercase text-white/40 hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
          className="font-mono-custom text-[11px] text-white/40 px-2.5 py-1 border border-white/10 rounded hover:text-[#00C2FF] hover:border-[#00C2FF]/40 transition-all"
        >
          {lang === 'en' ? 'नेपाली' : 'English'}
        </button>
        {/* Solana Wallet — styled via globals.css overrides */}
        <WalletMultiButton />
      </div>
    </nav>
  )
}