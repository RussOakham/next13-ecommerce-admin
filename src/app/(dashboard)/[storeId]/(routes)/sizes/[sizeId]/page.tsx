import { prismadb } from '@/lib/prismadb'

import SizeForm from './components/sizes-form'

interface NewSizePageProps {
  params: { sizeId: string }
}

const NewSizePage = async ({ params }: NewSizePageProps) => {
  const size = await prismadb.size.findFirst({
    where: { id: params.sizeId },
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}

export default NewSizePage
