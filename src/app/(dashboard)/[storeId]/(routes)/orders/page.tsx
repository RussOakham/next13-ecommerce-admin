import { format } from 'date-fns'

import { prismadb } from '@/lib/prismadb'
import { formatGbp } from '@/lib/utils'

import OrderClient from './components/order-client'
import { OrdersColumn } from './components/orders-types'

interface OrdersPageProps {
  params: {
    storeId: string
  }
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedOrders: OrdersColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatGbp.format(
      order.orderItems.reduce((total: number, item) => {
        return total + Number(item.product.price)
      }, 0),
    ),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, 'MMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}

export default OrdersPage
