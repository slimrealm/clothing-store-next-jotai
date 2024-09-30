'use client'

import { useAtom } from 'jotai'
import { productsAtom, cartAtom } from '@/lib/atoms'
import { addToCart } from '@/app/actions/cart'
import { useState } from 'react'

export default function ProductPage({ params }: { params: { id: string } }) {
    const [products] = useAtom(productsAtom)
    const [cart, setCart] = useAtom(cartAtom)
    const [quantity, setQuantity] = useState(1)

    const product = products.find(p => p.id === params.id)

    if (!product) return <div>Product not found</div>

    const handleAddToCart = async () => {
        const newCart = await addToCart(product.id, quantity, cart)
        setCart(newCart)
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">{product.name}</h1>
            <p className="text-xl mb-5">${product.price.toFixed(2)}</p>
            <p className="mb-5">{product.description}</p>
            <div className="flex items-center mb-5">
                <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    -
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    +
                </button>
            </div>
            <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-6 py-2 rounded"
            >
                Add to Cart
            </button>
        </div>
    )
}