"use client"
import JerseyCustomizer from "@/components/jersey-customizer"
import { Provider } from "@/components/providers"

export default function Home() {
  return (
    <Provider>
      <main className="min-h-screen bg-gradient-to-b from-slate-300 to-slate-300">
        <JerseyCustomizer />
      </main>
    </Provider>
  )
}
