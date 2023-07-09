import { prismadb } from '@/lib/prismadb'

import CategoryForm from './components/category-form'

interface NewCategoryPageProps {
  params: { categoryId: string; storeId: string }
}

const NewCategoryPage = async ({ params }: NewCategoryPageProps) => {
  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId },
  })

  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  )
}

export default NewCategoryPage
