'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function OrderConfirmation() {
    const [orderDetails, setOrderDetails] = useState<any>(null)
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    useEffect(() => {
        if (sessionId) {
            // Here you would typically make an API call to your backend to get the order details
            // For this example, we'll just simulate it
            setOrderDetails({
                id: 'ORD' + Math.random().toString(36).substr(2, 9),
                total: '$XX.XX',
                date: new Date().toLocaleDateString(),
            })
        }
    }, [sessionId])

    if (!orderDetails) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">Order Confirmation</h1>
            <p>Thank you for your order!</p>
            <p>Order ID: {orderDetails.id}</p>
            <p>Total: {orderDetails.total}</p>
            <p>Date: {orderDetails.date}</p>
        </div>
    )
}