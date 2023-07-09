import { z } from 'zod'

// POST /api/[storeId]/billboards
// PATCH /api/[storeId]/billboards/:billboardId
export const upsertBillboardRequestSchema = z.object({
  label: z.string().nonempty('Billboard label is required'),
  imageUrl: z.string().nonempty('Billboard image url is required'),
})

export type UpsertBillboardRequestSchema = z.infer<
  typeof upsertBillboardRequestSchema
>

// POST /api/[storeId]/billboards
const postBillboardResponseSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  imageUrl: z.string(),
  label: z.string(),
  storeId: z.string(),
  updatedAt: z.string(),
})

export type PostBillboardResponseSchema = z.infer<
  typeof postBillboardResponseSchema
>

// PATCH /api/[storeId]/billboards/:billboardId
const patchBillboardResponseSchema = z.object({
  count: z.number(),
})

export type PatchBillboardResponseSchema = z.infer<
  typeof patchBillboardResponseSchema
>

// DELETE /api/[storeId]/billboards/:billboardId
const deleteBillboardResponseSchema = z.object({
  count: z.number(),
})

export type DeleteBillboardResponseSchema = z.infer<
  typeof deleteBillboardResponseSchema
>
