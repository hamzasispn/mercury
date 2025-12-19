"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, X, Upload } from "lucide-react"
import { useState } from "react"

interface CustomizationSidebarProps {
  customization: any
  onKitTabChange: (kitType: "home" | "away") => void
  onKitChange: (kitType: "homeKit" | "awayKit", updates: any) => void
  onSizeChange: (size: string) => void
  onQuantityChange: (quantity: number) => void
}

const SIZES = ["YS/YM", "YL/YXL", "S/M", "L/XL", "2XL/3XL"]
const FONT_FAMILIES = ["font-Arial", "font-Helvetica", "font-Times-New-Roman", "font-Courier-New", "font-Georgia", "font-Verdana", "font-Impact", "font-script", "font-michigan", "font-block", "font-kansas", "font-bureau"]
const FONT_WEIGHTS = ["400", "500", "600", "700", "800", "900"]

function KitPanel({ kit, kitType, onChange }: any) {
  const [colorsOpen, setColorsOpen] = useState(true)
  const [textOpen, setTextOpen] = useState(true)
  const [uploadsOpen, setUploadsOpen] = useState(true)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onChange({ logoImage: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMaterialUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onChange({ materialImage: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4 p-4">
      {/* Colors Section */}
      <Collapsible open={colorsOpen} onOpenChange={setColorsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
          <span className="font-semibold text-blue-400">Colors</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${colorsOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-3">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Primary Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={kit.primaryColor}
                onChange={(e) => onChange({ primaryColor: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border border-slate-600"
              />
              <Input
                type="text"
                value={kit.primaryColor}
                onChange={(e) => onChange({ primaryColor: e.target.value })}
                className="flex-1 bg-slate-700 border-slate-600 text-white text-sm"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Secondary Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={kit.secondaryColor}
                onChange={(e) => onChange({ secondaryColor: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border border-slate-600"
              />
              <Input
                type="text"
                value={kit.secondaryColor}
                onChange={(e) => onChange({ secondaryColor: e.target.value })}
                className="flex-1 bg-slate-700 border-slate-600 text-white text-sm"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Text Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={kit.accentColor}
                onChange={(e) => onChange({ accentColor: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border border-slate-600"
              />
              <Input
                type="text"
                value={kit.accentColor}
                onChange={(e) => onChange({ accentColor: e.target.value })}
                className="flex-1 bg-slate-700 border-slate-600 text-white text-sm"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Text Customization Section */}
      <Collapsible open={textOpen} onOpenChange={setTextOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
          <span className="font-semibold text-blue-400">Text & Numbers</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${textOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-3">
          {/* Team Name */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Team Name (Front Only)</Label>
            <Input
              value={kit.name}
              onChange={(e) => onChange({ name: e.target.value.toUpperCase().slice(0, 12) })}
              placeholder="TEAM NAME"
              maxLength={12}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <p className="text-xs text-gray-500">{kit.name.length}/12 characters</p>
          </div>

          {/* Player Number */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Player Number (Front Only)</Label>
            <Input
              value={kit.number}
              onChange={(e) => onChange({ number: e.target.value.slice(0, 2) })}
              placeholder="88"
              maxLength={2}
              type="text"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* Number Size */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Number Size: {kit.numberSize}px</Label>
            <input
              type="range"
              min="80"
              max="200"
              value={kit.numberSize || 150}
              onChange={(e) => onChange({ numberSize: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400 font-script">Font Family</Label>
            <Select value={kit.fontFamily} onValueChange={(value) => onChange({ fontFamily: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Font Weight</Label>
            <Select value={kit.fontWeight} onValueChange={(value) => onChange({ fontWeight: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {FONT_WEIGHTS.map((weight) => (
                  <SelectItem key={weight} value={weight}>
                    {weight}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Name (Back Mercury Logo Area) */}
          {/* <div className="space-y-2">
            <Label className="text-xs text-gray-400">Company Name (Back Logo Area)</Label>
            <Input
              value={kit.companyName}
              onChange={(e) => onChange({ companyName: e.target.value.slice(0, 20) })}
              placeholder="Your Company"
              maxLength={20}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <p className="text-xs text-gray-500">Displays in Mercury logo area on back</p>
          </div> */}
        </CollapsibleContent>
      </Collapsible>

      {/* Uploads Section */}
      <Collapsible open={uploadsOpen} onOpenChange={setUploadsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
          <span className="font-semibold text-blue-400">Uploads</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${uploadsOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-3">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Logo (Front)</Label>
            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-700 border border-slate-600 rounded cursor-pointer hover:bg-slate-600 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload Logo</span>
                <input type="file" accept="image/png,image/svg+xml" onChange={handleLogoUpload} className="hidden" />
              </label>
              {kit.logoImage && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onChange({ logoImage: null })}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {kit.logoImage && (
              <div className="w-20 h-20 bg-slate-700 rounded p-2">
                <img src={kit.logoImage || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
              </div>
            )}
          </div>

          {/* Material Upload */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Material Texture</Label>
            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-700 border border-slate-600 rounded cursor-pointer hover:bg-slate-600 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload Material</span>
                <input
                  type="file"
                  accept="image/png,image/svg+xml"
                  onChange={handleMaterialUpload}
                  className="hidden"
                />
              </label>
              {kit.materialImage && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onChange({ materialImage: null })}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {kit.materialImage && (
              <div className="w-20 h-20 bg-slate-700 rounded p-2">
                <img
                  src={kit.materialImage || "/placeholder.svg"}
                  alt="Material"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <p className="text-xs text-gray-500">PNG/SVG with transparency</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default function CustomizationSidebar({
  customization,
  onKitTabChange,
  onKitChange,
  onSizeChange,
  onQuantityChange,
}: CustomizationSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Kit Tabs */}
      <Tabs value={customization.activeKit} onValueChange={onKitTabChange} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 m-4 mb-0 bg-slate-700">
          <TabsTrigger value="home">Home Kit</TabsTrigger>
          <TabsTrigger value="away">Away Kit</TabsTrigger>
        </TabsList>

        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 16rem)" }}>
          <TabsContent value="home" className="mt-0">
            <KitPanel
              kit={customization.homeKit}
              kitType="home"
              onChange={(updates: any) => onKitChange("homeKit", updates)}
            />
          </TabsContent>

          <TabsContent value="away" className="mt-0">
            <KitPanel
              kit={customization.awayKit}
              kitType="away"
              onChange={(updates: any) => onKitChange("awayKit", updates)}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Order Details */}
      <Card className="m-4 bg-slate-700/50 border-slate-600 p-4">
        <h3 className="font-semibold mb-3 text-blue-400 text-sm">Order Details</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Size</Label>
            <Select value={customization.size} onValueChange={onSizeChange}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Quantity (sets)</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuantityChange(Math.max(1, customization.quantity - 1))}
                className="bg-slate-700 border-slate-600 flex-1"
              >
                −
              </Button>
              <Input
                type="number"
                value={customization.quantity}
                onChange={(e) => onQuantityChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-16 bg-slate-700 border-slate-600 text-white text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuantityChange(customization.quantity + 1)}
                className="bg-slate-700 border-slate-600 flex-1"
              >
                +
              </Button>
            </div>
            <p className="text-xs text-gray-500">Each = 1 Home + 1 Away kit</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
