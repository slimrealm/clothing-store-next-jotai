'use client'

import { useAtom } from 'jotai'
import { cartAtom } from '@/lib/atoms'
import { removeFromCart, updateCartItemQuantity } from '../actions/cart'
import Link from 'next/link'

export default function Cart() {
    const [cart, setCart] = useAtom(cartAtom)

    const handleRemoveItem = async (productId: string) => {
        const newCart = await removeFromCart(productId, cart)
        setCart(newCart)
    }

    const handleUpdateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return
        const newCart = await updateCartItemQuantity(productId, quantity, cart)
        setCart(newCart)
    }

    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.productId} className="flex items-center justify-between border-b py-4">
                            <div>
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item.productId)}
                                    className="ml-4 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8">
                        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                        <Link href="/checkout" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}