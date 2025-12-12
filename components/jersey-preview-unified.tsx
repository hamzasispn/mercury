"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateJerseySVG } from "./svg-templates"

interface JerseyPreviewUnifiedProps {
  customization: any
}

export default function JerseyPreviewUnified({ customization }: JerseyPreviewUnifiedProps) {
  const [currentView, setCurrentView] = useState<"front" | "back">("front")
  const [svg, setSvg] = useState("")

  const currentKit = customization.activeKit === "home" ? customization.homeKit : customization.awayKit
  const kitLabel = customization.activeKit === "home" ? "HOME KIT" : "AWAY KIT"

  useEffect(() => {
    setSvg(generateJerseySVG(currentKit, currentView))
  }, [currentKit, currentView])

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 h-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-blue-400">{kitLabel}</h3>

        <div className="flex gap-2">
          <Button
            variant={currentView === "front" ? "default" : "outline"}
            onClick={() => setCurrentView("front")}
            size="sm"
            className={currentView === "front" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Front
          </Button>
          <Button
            variant={currentView === "back" ? "default" : "outline"}
            onClick={() => setCurrentView("back")}
            size="sm"
            className={currentView === "back" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Back
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-8 flex items-center justify-center">
        <div className="w-full max-w-lg aspect-square flex items-center justify-center">
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        {currentView === "front" ? "Front view with team name & number" : "Back view with company name"}
      </div>
    </Card>
  )
}
