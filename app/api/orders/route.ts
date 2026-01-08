// import { type NextRequest, NextResponse } from "next/server"

// // This API route handles order creation and PayPal integration
// // In production, this would:
// // 1. Save order to MongoDB
// // 2. Create PayPal payment
// // 3. Return PayPal approval link

// export async function POST(request: NextRequest) {
//   try {
//     const { customization, formData } = await request.json()

//     // Validate required fields
//     if (!customization || !formData) {
//       return NextResponse.json({ error: "Missing customization or form data" }, { status: 400 })
//     }

//     // In production, you would:
//     // 1. Generate a unique order ID
//     const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

//     // 2. Save to MongoDB
//     // const order = await saveOrderToDatabase({
//     //   orderId,
//     //   customization,
//     //   formData,
//     //   status: 'pending',
//     //   totalPrice: 10 + (customization.quantity * 49.99),
//     //   createdAt: new Date()
//     // })

//     // 3. Create PayPal payment link (would need PayPal API key)
//     const total = 10 + customization.quantity * 49.99

//     // Mock PayPal link - replace with actual PayPal API call
//     const paypalLink = `https://www.sandbox.paypal.com/checkoutnow?token=mock-token-${orderId}`

//     return NextResponse.json({
//       orderId,
//       paypalLink,
//       total,
//     })
//   } catch (error) {
//     console.error("Order creation error:", error)
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import { generateJerseySVG } from "@/components/svg-templates"

export async function POST(request: NextRequest) {
  try {
    const { customization, formData } = await request.json()

    // Validate required fields
    if (!customization || !formData) {
      return NextResponse.json({ error: "Missing customization or form data" }, { status: 400 })
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Calculate total
    const PRICE_PER_SET = 99.99
    const total = 10 + customization.quantity * PRICE_PER_SET

    // Generate jersey SVGs for email
    const homeKitFront = generateJerseySVG(customization.homeKit, "front")
    const homeKitBack = generateJerseySVG(customization.homeKit, "back")
    const awayKitFront = generateJerseySVG(customization.awayKit, "front")
    const awayKitBack = generateJerseySVG(customization.awayKit, "back")

    // Create email HTML
    const emailHtml = generateOrderEmailHTML({
      orderId,
      customization,
      formData,
      total,
      jerseyPreviews: {
        homeKitFront,
        homeKitBack,
        awayKitFront,
        awayKitBack,
      },
    })

    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Orders <onboarding@resend.dev>", 
          to: formData.email,
          subject: `Order Confirmation - ${orderId}`,
          html: emailHtml,
        }),
      })

      if (!emailResponse.ok) {
        console.error("Failed to send email:", await emailResponse.text())
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      total,
      message: "Order placed successfully! Check your email for confirmation.",
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

function generateOrderEmailHTML({
  orderId,
  customization,
  formData,
  total,
  jerseyPreviews,
}: {
  orderId: string
  customization: any
  formData: any
  total: number
  jerseyPreviews: {
    homeKitFront: string
    homeKitBack: string
    awayKitFront: string
    awayKitBack: string
  }
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
          }
          .header .order-id {
            margin-top: 10px;
            font-size: 14px;
            opacity: 0.9;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px 30px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 15px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 10px;
          }
          .jersey-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 20px;
          }
          .jersey-preview {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 8px;
            padding: 15px;
            text-align: center;
          }
          .jersey-preview .label {
            font-size: 12px;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .jersey-preview svg {
            width: 100%;
            height: auto;
            max-height: 250px;
          }
          .jersey-preview .info {
            font-size: 13px;
            color: #64748b;
            margin-top: 8px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .info-item {
            padding: 12px;
            background-color: #f8fafc;
            border-radius: 6px;
            border-left: 3px solid #3b82f6;
          }
          .info-item .label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .info-item .value {
            font-size: 15px;
            color: #1e293b;
            font-weight: 500;
          }
          .total-section {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 14px;
          }
          .total-row.final {
            border-top: 2px solid #3b82f6;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 18px;
            font-weight: 700;
            color: #1e40af;
          }
          .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            color: #64748b;
            font-size: 13px;
          }
          .footer .brand {
            font-size: 16px;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 10px;
          }
          @media (max-width: 600px) {
            .jersey-grid, .info-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <h1>🎽 Order Confirmed!</h1>
            <div class="order-id">Order ID: ${orderId}</div>
          </div>

          <!-- Content -->
          <div class="content">
            <!-- Greeting -->
            <p style="font-size: 16px; color: #475569; margin-bottom: 25px;">
              Hi <strong>${formData.fullName}</strong>,<br>
              Thank you for your order! We've received your custom jersey order and will begin processing it shortly.
            </p>

            <!-- Jersey Previews -->
            <div class="section">
              <div class="section-title">Your Custom Jerseys</div>
              <div class="jersey-grid">
                <!-- Home Front -->
                <div class="jersey-preview">
                  <div class="label">Home Kit (Front)</div>
                  ${jerseyPreviews.homeKitFront}
                  <div class="info">${customization.homeKit.name} #${customization.homeKit.number}</div>
                </div>
                
                <!-- Home Back -->
                <div class="jersey-preview">
                  <div class="label">Home Kit (Back)</div>
                  ${jerseyPreviews.homeKitBack}
                  <div class="info">${customization.homeKit.companyName || "No company name"}</div>
                </div>
                
                <!-- Away Front -->
                <div class="jersey-preview">
                  <div class="label">Away Kit (Front)</div>
                  ${jerseyPreviews.awayKitFront}
                  <div class="info">${customization.awayKit.name} #${customization.awayKit.number}</div>
                </div>
                
                <!-- Away Back -->
                <div class="jersey-preview">
                  <div class="label">Away Kit (Back)</div>
                  ${jerseyPreviews.awayKitBack}
                  <div class="info">${customization.awayKit.companyName || "No company name"}</div>
                </div>
              </div>
            </div>

            <!-- Order Details -->
            <div class="section">
              <div class="section-title">Order Details</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Size</div>
                  <div class="value">${customization.size}</div>
                </div>
                <div class="info-item">
                  <div class="label">Quantity (Sets)</div>
                  <div class="value">${customization.quantity}</div>
                </div>
              </div>
              ${
                customization.notes
                  ? `
                <div class="info-item" style="margin-top: 15px; grid-column: 1 / -1;">
                  <div class="label">Special Notes</div>
                  <div class="value">${formData.notes}</div>
                </div>
              `
                  : ""
              }
            </div>

            <!-- Shipping Information -->
            <div class="section">
              <div class="section-title">Shipping Address</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Name</div>
                  <div class="value">${formData.fullName}</div>
                </div>
                <div class="info-item">
                  <div class="label">Email</div>
                  <div class="value">${formData.email}</div>
                </div>
                <div class="info-item">
                  <div class="label">Phone</div>
                  <div class="value">${formData.phone}</div>
                </div>
                <div class="info-item">
                  <div class="label">City</div>
                  <div class="value">${formData.city}</div>
                </div>
                <div class="info-item" style="grid-column: 1 / -1;">
                  <div class="label">Address</div>
                  <div class="value">${formData.address}</div>
                </div>
                <div class="info-item">
                  <div class="label">Postal Code</div>
                  <div class="value">${formData.postalCode}</div>
                </div>
              </div>
            </div>

            <!-- Order Total -->
            <div class="section">
              <div class="section-title">Order Summary</div>
              <div class="total-section">
                <div class="total-row">
                  <span>Price per set</span>
                  <span>$99.99</span>
                </div>
                <div class="total-row">
                  <span>Sets × ${customization.quantity}</span>
                  <span>$${(customization.quantity * 99.99).toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div class="total-row final">
                  <span>Total</span>
                  <span>$${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="section">
              <div class="section-title">What's Next?</div>
              <p style="color: #475569; font-size: 14px; line-height: 1.8;">
                ✓ Your order is being processed<br>
                ✓ You'll receive updates via email at <strong>${formData.email}</strong><br>
                ✓ Expected delivery: 2-3 weeks<br>
                ✓ Questions? Reply to this email or contact our support team
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="brand">MERCURY UNIFORMS</div>
            <p style="margin: 10px 0;">
              Premium Custom Sports Jerseys<br>
              Quality You Can Trust
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
              This is an automated email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}
