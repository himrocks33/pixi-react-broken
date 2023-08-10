'use client'
import Image from 'next/image'
import { StageTest } from './stage'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StageTest />
    </main>
  )
}
