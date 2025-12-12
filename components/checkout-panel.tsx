"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { generateJerseySVG } from "./svg-templates"

interface CheckoutPanelProps {
  customization: any
  onCheckout: (formData: any) => Promise<void>
}

const PRICE_PER_SET = 99.99 // Both kits

export default function CheckoutPanel({ customization, onCheckout }: CheckoutPanelProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const total = PRICE_PER_SET * customization.quantity

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onCheckout(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Order Preview - All 4 Views */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">Order Preview - All 4 Views</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Home Front */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-3">
            <div className="text-xs text-blue-400 font-semibold mb-2 text-center">HOME KIT (Front)</div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded p-2 flex items-center justify-center aspect-square">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: generateJerseySVG(customization.homeKit, "front"),
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center">
              {customization.homeKit.name} #{customization.homeKit.number}
            </div>
          </Card>

          {/* Home Back */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-3">
            <div className="text-xs text-blue-400 font-semibold mb-2 text-center">HOME KIT (Back)</div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded p-2 flex items-center justify-center aspect-square">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: generateJerseySVG(customization.homeKit, "back"),
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center">
              {customization.homeKit.companyName || "No company name"}
            </div>
          </Card>

          {/* Away Front */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-3">
            <div className="text-xs text-amber-400 font-semibold mb-2 text-center">AWAY KIT (Front)</div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded p-2 flex items-center justify-center aspect-square">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: generateJerseySVG(customization.awayKit, "front"),
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center">
              {customization.awayKit.name} #{customization.awayKit.number}
            </div>
          </Card>

          {/* Away Back */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-3">
            <div className="text-xs text-amber-400 font-semibold mb-2 text-center">AWAY KIT (Back)</div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded p-2 flex items-center justify-center aspect-square">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: generateJerseySVG(customization.awayKit, "back"),
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center">
              {customization.awayKit.companyName || "No company name"}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6 text-blue-400">Order Summary</h3>

          <div className="space-y-4 mb-6">
            <div className="pb-4 border-b border-slate-700">
              <p className="text-sm text-gray-400 mb-2">Home Kit</p>
              <p className="font-medium text-white">{customization.homeKit.name}</p>
              <p className="text-sm text-gray-400">#{customization.homeKit.number}</p>
            </div>

            <div className="pb-4 border-b border-slate-700">
              <p className="text-sm text-gray-400 mb-2">Away Kit</p>
              <p className="font-medium text-white">{customization.awayKit.name}</p>
              <p className="text-sm text-gray-400">#{customization.awayKit.number}</p>
            </div>

            <div className="pb-4 border-b border-slate-700">
              <p className="text-sm text-gray-400 mb-2">Size</p>
              <p className="font-medium text-white">{customization.size}</p>
            </div>

            <div className="pb-4 border-b border-slate-700">
              <p className="text-sm text-gray-400 mb-2">Sets Ordered</p>
              <p className="font-medium text-white">{customization.quantity}</p>
              <p className="text-xs text-gray-500">Each set includes 1 Home + 1 Away kit</p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price per set</span>
              <span className="text-white">${PRICE_PER_SET.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Sets × Qty</span>
              <span className="text-white">${(PRICE_PER_SET * customization.quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="text-white">$10.00</span>
            </div>
            <div className="pt-2 border-t border-slate-700 flex justify-between font-semibold text-lg">
              <span className="text-white">Total</span>
              <span className="text-blue-400">${(total + 10).toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 text-blue-400">Shipping & Contact Information</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-300">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm text-gray-300">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm text-gray-300">
                  City *
                </Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="New York"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm text-gray-300">
                Street Address *
              </Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="123 Main Street"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-sm text-gray-300">
                Postal Code *
              </Label>
              <Input
                id="postalCode"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="10001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm text-gray-300">
                Special Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white resize-none"
                placeholder="Any special requests or delivery instructions..."
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Pay $${(total + 10).toFixed(2)} with PayPal`
              )}
            </Button>

            <p className="text-xs text-center text-gray-400 mt-2">
              You will be redirected to PayPal to complete your payment securely
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}
