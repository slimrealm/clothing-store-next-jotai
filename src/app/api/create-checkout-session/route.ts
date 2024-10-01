import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProducts } from '@/lib/api'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20', // latest API version
})

export async function POST(request: Request) {
    try {
        const { items } = await request.json()
        const products = await getProducts()

        const lineItems = await Promise.all(
            items.map(async (item: { productId: string; quantity: number }) => {
                const product = products.find((p) => p.id === item.productId)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product!.name,
                        },
                        unit_amount: Math.round(product!.price * 100), // Stripe expects amounts in cents
                    },
                    quantity: item.quantity,
                }
            })
        )

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/cart`,
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 })
    }
}