"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { generateJerseySVG } from "./svg-templates"

interface JerseyPreviewUnifiedProps {
  customization: any
}

export default function JerseyPreviewUnified({ customization }: JerseyPreviewUnifiedProps) {
  const [frontSvg, setFrontSvg] = useState("")
  const [backSvg, setBackSvg] = useState("")

  const currentKit = customization.activeKit === "home" ? customization.homeKit : customization.awayKit
  const kitLabel = customization.activeKit === "home" ? "HOME KIT" : "AWAY KIT"

  useEffect(() => {
    setFrontSvg(generateJerseySVG(currentKit, "front"))
    setBackSvg(generateJerseySVG(currentKit, "back"))
  }, [currentKit])

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 h-full">
      <h3 className="text-xl font-bold text-blue-400 mb-6">{kitLabel}</h3>

      <div className="grid grid-cols-2 gap-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-8">
        {/* FRONT VIEW */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: frontSvg }} />
          </div>
          <p className="mt-4 text-sm text-gray-400">Front View</p>
        </div>

        {/* BACK VIEW */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: backSvg }} />
          </div>
          <p className="mt-4 text-sm text-gray-400">Back View</p>
        </div>
      </div>
    </Card>
  )
}
