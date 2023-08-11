'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic';


const Stage = dynamic(async () => {
  try {
    const result = await import('./stage');
    return result;
  } catch (e) {
    console.error(e);
    const errorComponent = () => (
      <div>ERROR</div>
    );
    return errorComponent;
  }
}, { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stage />
    </main>
  )
}
