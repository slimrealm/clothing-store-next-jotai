import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <Image src={product.image} alt={product.name} width={300} height={200} className="w-full" />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <Link href={`/product/${product.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                    View Details
                </Link>
            </div>
        </div>
    )
}