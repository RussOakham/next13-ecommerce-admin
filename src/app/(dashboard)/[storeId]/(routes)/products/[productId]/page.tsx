import { prismadb } from '@/lib/prismadb'

import ProductForm from './components/product-form'

interface NewProductPageProps {
  params: { productId: string; storeId: string }
}

const NewProductPage = async ({ params }: NewProductPageProps) => {
  const product = await prismadb.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
    },
  })

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: 'asc',
    },
  })

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: 'asc',
    },
  })

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  )
}

export default NewProductPage
