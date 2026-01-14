"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"

interface CustomizationPanelUnifiedProps {
  customization: any
  onKitTabChange: (kitType: "home" | "away") => void
  onKitChange: (kitType: "homeKit" | "awayKit", updates: any) => void
  onSizeChange: (size: string) => void
  onQuantityChange: (quantity: number) => void
}

const SIZES = ["YS/YM", "YL/YXL", "S/M", "L/XL", "2XL/3XL"]
const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Comic Sans MS",
  "Impact",
]

const FONT_WEIGHTS = [
  "400",
  "500",
  "600",
  "700",
  "800",
]

function KitPanel({ kit, kitType, onChange }: any) {
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

  const handleLabelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onChange({ labelImage: event.target?.result as string })
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
    <div className="space-y-6">
      {/* Team Name */}
      <div className="space-y-2">
        <Label htmlFor={`name-${kitType}`} className="text-sm font-medium">
          Team Name
        </Label>
        <Input
          id={`name-${kitType}`}
          value={kit.name}
          onChange={(e) => onChange({ name: e.target.value.toUpperCase().slice(0, 15) })}
          placeholder="Enter team name"
          maxLength={15}
          className="bg-slate-700 border-slate-600 text-white"
        />
        <p className="text-xs text-gray-400">{kit.name.length}/15 characters</p>
      </div>

      {/* Number */}
      <div className="space-y-2">
        <Label htmlFor={`number-${kitType}`} className="text-sm font-medium">
          Player Number
        </Label>
        <Input
          id={`number-${kitType}`}
          value={kit.number}
          onChange={(e) => onChange({ number: e.target.value.slice(0, 2) })}
          placeholder="00"
          maxLength={2}
          type="number"
          min="0"
          max="99"
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>

      {/* Number Size */}
      <div className="space-y-2">
        <Label htmlFor={`numberSize-${kitType}`} className="text-sm font-medium">
          Number Size
        </Label>
        <div className="flex items-center gap-4">
          <input
            id={`numberSize-${kitType}`}
            type="range"
            min="80"
            max="200"
            value={kit.numberSize || 150}
            onChange={(e) => onChange({ numberSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-white font-semibold min-w-12">{kit.numberSize || 150}px</span>
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label htmlFor={`font-${kitType}`} className="text-sm font-medium">
          Font Family
        </Label>
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
        <Label htmlFor={`font-${kitType}`} className="text-sm font-medium">
          Font Weight
        </Label>
        <Select value={kit.fontWeight} onValueChange={(value) => onChange({ fontWeight: value })}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            {FONT_WEIGHTS.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Logo Upload (Front) */}
      <div className="space-y-2">
        <Label htmlFor={`logo-${kitType}`} className="text-sm font-medium">
          Logo Image (Front)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={`logo-${kitType}`}
            type="file"
            accept="image/png,image/svg+xml"
            onChange={handleLogoUpload}
            className="bg-slate-700 border-slate-600 text-white flex-1"
          />
          {kit.logoImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange({ logoImage: null })}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        {kit.logoImage && (
          <div className="mt-2 w-16 h-16 bg-slate-700 rounded p-1">
            <img
              src={kit.logoImage || "/placeholder.svg"}
              alt="Logo preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <p className="text-xs text-gray-400">PNG or SVG (max 500KB)</p>
      </div>

      {/* Label Upload (Back) */}
      <div className="space-y-2">
        <Label htmlFor={`label-${kitType}`} className="text-sm font-medium">
          Label Image (Back)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={`label-${kitType}`}
            type="file"
            accept="image/png,image/svg+xml"
            onChange={handleLabelUpload}
            className="bg-slate-700 border-slate-600 text-white flex-1"
          />
          {kit.labelImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange({ labelImage: null })}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        {kit.labelImage && (
          <div className="mt-2 w-16 h-16 bg-slate-700 rounded p-1">
            <img
              src={kit.labelImage || "/placeholder.svg"}
              alt="Label preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <p className="text-xs text-gray-400">PNG or SVG (max 500KB)</p>
      </div>

      {/* Material Upload */}
      <div className="space-y-2">
        <Label htmlFor={`material-${kitType}`} className="text-sm font-medium">
          Material Texture (PNG/SVG with transparency)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={`material-${kitType}`}
            type="file"
            accept="image/png,image/svg+xml"
            onChange={handleMaterialUpload}
            className="bg-slate-700 border-slate-600 text-white flex-1"
          />
          {kit.materialImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange({ materialImage: null })}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        {kit.materialImage && (
          <div className="mt-2 w-16 h-16 bg-slate-700 rounded p-1">
            <img
              src={kit.materialImage || "/placeholder.svg"}
              alt="Material preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <p className="text-xs text-gray-400">PNG or SVG - will overlay with transparency</p>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Colors</h4>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label htmlFor={`primary-${kitType}`} className="text-sm">
            Primary Color
          </Label>
          <div className="flex gap-2">
            <Input
              id={`primary-${kitType}`}
              type="color"
              value={kit.primaryColor}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-12 h-10 bg-slate-700 border-slate-600 cursor-pointer"
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
          <Label htmlFor={`secondary-${kitType}`} className="text-sm">
            Secondary Color
          </Label>
          <div className="flex gap-2">
            <Input
              id={`secondary-${kitType}`}
              type="color"
              value={kit.secondaryColor}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="w-12 h-10 bg-slate-700 border-slate-600 cursor-pointer"
            />
            <Input
              type="text"
              value={kit.secondaryColor}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="flex-1 bg-slate-700 border-slate-600 text-white text-sm"
            />
          </div>
        </div>

        {/* Accent/Text Color */}
        <div className="space-y-2">
          <Label htmlFor={`accent-${kitType}`} className="text-sm">
            Text Color
          </Label>
          <div className="flex gap-2">
            <Input
              id={`accent-${kitType}`}
              type="color"
              value={kit.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="w-12 h-10 bg-slate-700 border-slate-600 cursor-pointer"
            />
            <Input
              type="text"
              value={kit.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="flex-1 bg-slate-700 border-slate-600 text-white text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CustomizationPanelUnified({
  customization,
  onKitTabChange,
  onKitChange,
  onSizeChange,
  onQuantityChange,
}: CustomizationPanelUnifiedProps) {
  return (
    <div className="space-y-6">
      {/* Kit Selection Tabs */}
      <Card className="bg-gray-500 border-slate-700 p-6">
        <Tabs value={customization.activeKit} onValueChange={onKitTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="home">Home Kit</TabsTrigger>
            <TabsTrigger value="away">Away Kit</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <KitPanel
              kit={customization.homeKit}
              kitType="home"
              onChange={(updates: any) => onKitChange("homeKit", updates)}
            />
          </TabsContent>

          <TabsContent value="away">
            <KitPanel
              kit={customization.awayKit}
              kitType="away"
              onChange={(updates: any) => onKitChange("awayKit", updates)}
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Size & Quantity */}
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Order Details</h3>

        {/* Size Selection */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="size" className="text-sm font-medium">
            Size
          </Label>
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

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium">
            Quantity (sets of 2 kits)
          </Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuantityChange(Math.max(1, customization.quantity - 1))}
              className="bg-slate-700 border-slate-600"
            >
              −
            </Button>
            <Input
              id="quantity"
              type="number"
              value={customization.quantity}
              onChange={(e) => onQuantityChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="flex-1 bg-slate-700 border-slate-600 text-white text-center"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuantityChange(customization.quantity + 1)}
              className="bg-slate-700 border-slate-600"
            >
              +
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Each quantity = 1 Home + 1 Away kit</p>
        </div>
      </Card>
    </div>
  )
}
