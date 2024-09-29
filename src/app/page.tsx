import { getProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}