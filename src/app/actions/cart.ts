'use server'

import { revalidatePath } from 'next/cache'
import { getProducts } from '@/lib/api'
import { CartItem, Product } from '@/types'

export async function addToCart(productId: string, quantity: number, currentCart: CartItem[]) {
    const products = await getProducts()
    const product = products.find(p => p.id === productId)

    if (!product) throw new Error('Product not found')

    const existingCartItem = currentCart.find(item => item.productId === productId)
    let newCart: CartItem[]

    if (existingCartItem) {
        newCart = currentCart.map(item =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
        )
    } else {
        newCart = [...currentCart, { productId, quantity, product }]
    }

    revalidatePath('/cart')
    return newCart
}

export async function removeFromCart(productId: string, currentCart: CartItem[]) {
    const newCart = currentCart.filter(item => item.productId !== productId)
    revalidatePath('/cart')
    return newCart
}

export async function updateCartItemQuantity(productId: string, quantity: number, currentCart: CartItem[]) {
    const newCart = currentCart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
    )
    revalidatePath('/cart')
    return newCart
}