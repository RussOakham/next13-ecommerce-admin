'use client'

import DataTable from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import Separator from '@/components/ui/separator'

import columns from './columns'
import { OrdersColumn } from './orders-types'

interface OrderClientProps {
  data: OrdersColumn[]
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage your store orders"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  )
}

export default OrderClient
