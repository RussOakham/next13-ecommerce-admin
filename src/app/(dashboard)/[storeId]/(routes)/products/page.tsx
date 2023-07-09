import { format } from 'date-fns'

import { prismadb } from '@/lib/prismadb'
import { formatGbp } from '@/lib/utils'

import ProductClient from './components/product-client'
import { ProductColumn } from './components/products-types'

interface ProductsPageProps {
  params: {
    storeId: string
  }
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatGbp.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, 'MMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
