'use client'

import { useAtom } from 'jotai'
import { cartAtom } from '@/lib/atoms'
import { useEffect, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

// Make sure to add your publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
let stripePromise: Promise<Stripe | null>
if (stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey)
}
else {
    throw new Error('could not get Stripe publishable key');
}
export default function Checkout() {
    const [cart] = useAtom(cartAtom)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
    }, [cart])

    const handleCheckout = async () => {
        const stripe = await stripePromise
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cart }),
        })
        const session = await response.json()
        console.log('session, session ID:', session, session.sessionId);
        const result = await stripe!.redirectToCheckout({
            sessionId: session.sessionId,
        })

        if (result.error) {
            console.error(result.error)
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">Checkout</h1>
            {cart.map((item) => (
                <div key={item.productId} className="flex justify-between items-center mb-2">
                    <span>{item.product.name}</span>
                    <span>
                        {item.quantity} x ${item.product.price.toFixed(2)}
                    </span>
                </div>
            ))}
            <div className="text-xl font-bold mt-5">Total: ${total.toFixed(2)}</div>
            <button
                onClick={handleCheckout}
                className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Proceed to Payment
            </button>
        </div>
    )
}