import { prismadb } from '@/lib/prismadb'

import BillboardClient from './components/billboard-client'

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
