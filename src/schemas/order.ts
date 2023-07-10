import { z } from 'zod'

// POST /api/[storeId]/orders
// PATCH /api/[storeId]/orders/:orderId
export const upsertOrdersRequestSchema = z.object({
  label: z.string().nonempty('Orders label is required'),
  imageUrl: z.string().nonempty('Orders image url is required'),
})

export type UpsertOrdersRequestSchema = z.infer<
  typeof upsertOrdersRequestSchema
>

// POST /api/[storeId]/orders
const postOrdersResponseSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  imageUrl: z.string(),
  label: z.string(),
  storeId: z.string(),
  updatedAt: z.string(),
})

export type PostOrdersResponseSchema = z.infer<typeof postOrdersResponseSchema>

// PATCH /api/[storeId]/orders/:orderId
const patchOrdersResponseSchema = z.object({
  count: z.number(),
})

export type PatchOrdersResponseSchema = z.infer<
  typeof patchOrdersResponseSchema
>

// DELETE /api/[storeId]/orders/:orderId
const deleteOrdersResponseSchema = z.object({
  count: z.number(),
})

export type DeleteOrdersResponseSchema = z.infer<
  typeof deleteOrdersResponseSchema
>
