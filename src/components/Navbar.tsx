"use client"

import Link from 'next/link'
import { useAtom } from 'jotai'
import { currentUserAtom, cartAtom } from '@/lib/atoms'

const Navbar = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
    const [cart] = useAtom(cartAtom)

    const handleSignOut = () => {
        setCurrentUser(null)
    }

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Clothing Store
                </Link>
                <div className="space-x-4">
                    <Link href="/" className="hover:text-gray-300">
                        Shop
                    </Link>
                    <Link href="/cart" className="hover:text-gray-300">
                        Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                    </Link>
                    {currentUser ? (
                        <>
                            <span>{currentUser.email}</span>
                            <button onClick={handleSignOut} className="hover:text-gray-300">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" className="hover:text-gray-300">
                                Sign In
                            </Link>
                            <Link href="/signup" className="hover:text-gray-300">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar