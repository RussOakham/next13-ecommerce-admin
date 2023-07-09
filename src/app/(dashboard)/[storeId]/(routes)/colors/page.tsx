import { format } from 'date-fns'

import { prismadb } from '@/lib/prismadb'

import ColorClient from './components/colors-client'
import { ColorColumn } from './components/colors-types'

interface ColorsPageProps {
  params: {
    storeId: string
  }
}

const ColorsPage = async ({ params }: ColorsPageProps) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'MMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}

export default ColorsPage
