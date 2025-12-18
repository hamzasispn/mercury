"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JerseyPreviewUnified from "./jersey-preview-unified"
import CustomizationSidebar from "./customization-sidebar"
import CheckoutPanel from "./checkout-panel"
import { toast } from "sonner"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface KitCustomization {
  name: string
  number: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  fontWeight: string
  numberSize: number
  logoImage: string | null
  companyName: string
  materialImage: string | null
}

export interface CustomizationState {
  homeKit: KitCustomization
  awayKit: KitCustomization
  size: "YS/YM" | "YL/YXL" | "S/M" | "L/XL" | "2XL/3XL"
  quantity: number
  activeKit: "home" | "away"
}

const INITIAL_KIT: KitCustomization = {
  name: "TEAM NAME",
  number: "88",
  primaryColor: "#344c96",
  secondaryColor: "#d9ad37",
  accentColor: "#ffffff",
  fontFamily: "Arial",
  fontWeight: "700",
  numberSize: 150,
  logoImage: null,
  companyName: "",
  materialImage: null,
}

const INITIAL_STATE: CustomizationState = {
  homeKit: { ...INITIAL_KIT },
  awayKit: {
    name: "TEAM NAME",
    number: "88",
    primaryColor: "#ffffff",
    secondaryColor: "#344c96",
    accentColor: "#000000",
    fontFamily: "Arial",
    fontWeight: "700",
    numberSize: 150,
    logoImage: null,
    companyName: "",
    materialImage: null,
  },
  size: "L/XL",
  quantity: 1,
  activeKit: "home",
}

const STORAGE_KEY = "jersey_customization"

export default function JerseyCustomizer() {
  const [customization, setCustomization] = useState<CustomizationState>(INITIAL_STATE)
  const [mainTab, setMainTab] = useState("customize")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setCustomization(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load saved customization")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customization))
  }, [customization, customization.size])

  const handleKitTabChange = (kitType: "home" | "away") => {
    setCustomization((prev) => ({
      ...prev,
      activeKit: kitType,
    }))
  }

  const handleKitChange = (kitType: "homeKit" | "awayKit", updates: Partial<KitCustomization>) => {
    setCustomization((prev) => ({
      ...prev,
      [kitType]: { ...prev[kitType], ...updates },
    }))
  }

  const handleSizeChange = (size: CustomizationState["size"]) => {
    setCustomization((prev) => ({ ...prev, size }))
  }

  const handleQuantityChange = (quantity: number) => {
    setCustomization((prev) => ({ ...prev, quantity }))
  }

  const handleCheckout = async (formData: any) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customization,
          formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      // const { orderId, paypalLink } = await response.json()
      // window.location.href = paypalLink
    } catch (error) {
      toast.error("Failed to process checkout")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-400">Jersey Customizer</h1>
              <p className="text-sm text-gray-400">Design your custom kits</p>
            </div>
          </div>

          <Tabs value={mainTab} onValueChange={setMainTab} className="w-auto">
            <TabsList className="bg-slate-800">
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="checkout">Checkout</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsContent value="customize" className="mt-0">
            <div className="flex gap-6 relative">
              {/* Sidebar */}
              <div
                className={`${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300 fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 lg:w-80 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 overflow-y-auto z-40`}
              >
                <CustomizationSidebar
                  customization={customization}
                  onKitTabChange={handleKitTabChange}
                  onKitChange={handleKitChange}
                  onSizeChange={handleSizeChange}
                  onQuantityChange={handleQuantityChange}
                />
              </div>

              {/* Preview */}
              <div className="flex-1 lg:ml-0">
                <JerseyPreviewUnified customization={customization} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="checkout">
            <CheckoutPanel customization={customization} onCheckout={handleCheckout} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
