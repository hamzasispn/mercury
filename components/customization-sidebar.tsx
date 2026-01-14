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
const FONT_FAMILIES = ["Arial", "Helvetica", "Times-New-Roman", "Courier-New", "Georgia", "Verdana", "Impact", "block", "kansas", "bureau"]
const FONT_WEIGHTS = ["400", "500", "600", "700", "800", "900"]

const colorsHex = [
  { name: 'Maroon Brown', hex: '#713042' },
  { name: 'Charcoal Black', hex: '#2a2c2e' },
  { name: 'Cool Gray', hex: '#a2a8ad' },
  { name: 'Soft White', hex: '#f4f9ff' },
  { name: 'Forest Green', hex: '#2d523b' },
  { name: 'Ice White', hex: '#f6fafe' },
  { name: 'Royal Blue', hex: '#1f5592' },
  { name: 'Deep Purple', hex: '#473a76' },
  { name: 'Dusty Rose', hex: '#864b5b' },
  { name: 'Crimson Red', hex: '#a91b28' },
  { name: 'Dark Wine', hex: '#4b232e' }
];

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

  // const handleMaterialUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //       onChange({ materialImage: event.target?.result as string })
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

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
            <Label className="text-xs text-gray-900">color Zone 1 (Logo + Size Patch)</Label>
            <div className="grid grid-cols-2 gap-2 items-center flex-wrap">
              {colorsHex.map((color) => (
                <div className="relative group flex gap-2 items-center">
                  <button
                    key={color.name}
                    className="w-8 h-8 rounded border border-slate-600 rounded-full"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onChange({ secondColor: color.hex })}
                  />
                  <div className=" text-white text-xs top-10 z-[999999]">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">color Zone 2 (Outline Zone )</Label>
            <div className="grid grid-cols-2 gap-2 items-center flex-wrap">
              {colorsHex.map((color) => (
                <div className="relative group flex gap-2 items-center">
                  <button
                    key={color.name}
                    className="w-8 h-8 rounded border border-slate-600 rounded-full"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onChange({ firstColor: color.hex })}
                  />
                  <div className=" text-white text-xs top-10 z-[999999]">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">Color Zone 3 (Team name color)</Label>
            <div className="grid grid-cols-2 gap-2 items-center flex-wrap">
              {colorsHex.map((color) => (
                <div className="relative group flex gap-2 items-center">
                  <button
                    key={color.name}
                    className="w-8 h-8 rounded border border-slate-600 rounded-full"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onChange({ secondaryColor: color.hex })}
                  />
                  <div className=" text-white text-xs top-10 z-[999999]">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Secondary Color */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">Color Zone 4 (Team Number Color + Top Inner Outline)</Label>
            <div className="grid grid-cols-2 gap-2 items-center flex-wrap">
              {colorsHex.map((color) => (
                <div className="relative group flex gap-2 items-center">
                  <button
                    key={color.name}
                    className="w-8 h-8 rounded border border-slate-600 rounded-full"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onChange({ accentColor: color.hex })}
                  />
                  <div className=" text-white text-xs top-10 z-[999999]">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">color Zone 5 (Jersey Color)</Label>
            <div className="grid grid-cols-2 gap-2 items-center flex-wrap">
              {colorsHex.map((color) => (
                <div className="relative group flex gap-2 items-center">
                  <button
                    key={color.name}
                    className="w-8 h-8 rounded border border-slate-600 rounded-full"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onChange({ primaryColor: color.hex })}
                  />
                  <div className=" text-white text-xs top-10 z-[999999]">{color.name}</div>
                </div>
              ))}
            </div>
          </div>



          {/* Text Color */}
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
            <Label className="text-xs text-gray-900">Team Name (Front Only)</Label>
            <Input
              value={kit.name}
              onChange={(e) => onChange({ name: e.target.value.toUpperCase().slice(0, 12) })}
              placeholder="TEAM NAME"
              maxLength={12}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <p className="text-xs text-gray-900">{kit.name.length}/12 characters</p>
          </div>

          {/* Player Number */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">Player Number</Label>
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
            <Label className="text-xs text-gray-900">
             Front Number Sizes
            </Label>

            <select
              value={kit.numberSize || 12}
              onChange={(e) =>
                onChange({ numberSize: e.target.value })
              }
              className="w-full bg-slate-700 border-slate-600 text-white rounded px-2 py-1 text-sm"
            >
              <option value={"6rem"}>6 inches</option>
              <option value={"8rem"}>8 inches</option>
              <option value={"10rem"}>10 inches </option>
              <option value={"12rem"}>12 inches </option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">
             Back Number Sizes
            </Label>

            <select
              value={kit.backnumberSize || 69}
              onChange={(e) =>
                onChange({ backnumberSize: e.target.value })
              }
              className="w-full bg-slate-700 border-slate-600 text-white rounded px-2 py-1 text-sm"
            >
              <option value={"8rem"}>8 inches</option>
              <option value={"10rem"}>10 inches </option>
              <option value={"12rem"}>12 inches </option>
            </select>
          </div>


          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">Text Font Family</Label>
            <Select value={kit.fontFamily} onValueChange={(value) => onChange({ fontFamily: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-900"> Number Font Family</Label>
            <Select value={kit.textfontFamily || 'block'} onValueChange={(value) => onChange({ textfontFamily: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
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
            <Label className="text-xs text-gray-900">Font Weight</Label>
            <Select value={kit.fontWeight} onValueChange={(value) => onChange({ fontWeight: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
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
            <Label className="text-xs text-gray-900">Company Name (Back Logo Area)</Label>
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
    <div className="h-full flex flex-col rounded-2xl">
      {/* Kit Tabs */}
      <Tabs value={customization.activeKit} onValueChange={onKitTabChange} className="flex-1">
        <TabsList className="grid w-[90%] grid-cols-2 m-4 mb-0 bg-slate-700">
          <TabsTrigger value="home">Side 1</TabsTrigger>
          <TabsTrigger value="away">Side 2  </TabsTrigger>
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
      {/* <Card className="m-4 bg-slate-700/50 border-slate-600 p-4">
        <h3 className="font-semibold mb-3 text-blue-400 text-sm">Order Details</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs text-gray-900">Size</Label>
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
            <Label className="text-xs text-gray-900">Quantity (sets)</Label>
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
      </Card> */}
    </div>
  )
}