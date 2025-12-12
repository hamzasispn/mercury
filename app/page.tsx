"use client"
import JerseyCustomizer from "@/components/jersey-customizer"
import { Provider } from "@/components/providers"

export default function Home() {
  return (
    <Provider>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <JerseyCustomizer />
      </main>
    </Provider>
  )
}
