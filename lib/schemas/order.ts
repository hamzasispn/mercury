// MongoDB Order schema
// This defines the structure of orders saved in MongoDB

import mongoose, { Schema, type Document } from "mongoose"

export interface IOrder extends Document {
  orderId: string
  customization: {
    kitType: "home" | "away"
    name: string
    number: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    size: string
    quantity: number
  }
  formData: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    notes: string
  }
  status: "pending" | "completed" | "failed"
  totalPrice: number
  paypalOrderId?: string
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true, required: true },
    customization: {
      kitType: { type: String, enum: ["home", "away"], required: true },
      name: { type: String, required: true },
      number: { type: String, required: true },
      primaryColor: { type: String, required: true },
      secondaryColor: { type: String, required: true },
      accentColor: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
    formData: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      notes: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
    paypalOrderId: { type: String },
  },
  { timestamps: true },
)

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema)
