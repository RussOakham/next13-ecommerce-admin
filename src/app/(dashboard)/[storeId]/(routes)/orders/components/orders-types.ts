import { Order, Product } from '@prisma/client'

export type OrdersColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export type OrderItem = {
  id: string
  orderId: string
  order: Order
  productId: string
  product: Product
}

export interface CellActionProps {
  data: OrdersColumn
}
