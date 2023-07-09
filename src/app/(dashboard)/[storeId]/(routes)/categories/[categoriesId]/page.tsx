import { prismadb } from '@/lib/prismadb'

import BillboardForm from './components/billboard-form'

interface NewBillboardPageProps {
  params: { billboardId: string }
}

const NewBillboardPage = async ({ params }: NewBillboardPageProps) => {
  const billboard = await prismadb.billboard.findUnique({
    where: { id: params.billboardId },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default NewBillboardPage
