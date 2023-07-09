import { z } from 'zod'

// POST /api/[storeId]/sizes
// PATCH /api/[storeId]/sizes/:sizesId
export const upsertSizeRequestSchema = z.object({
  name: z.string().nonempty('Size name is required'),
  value: z.string().nonempty('Size value is required'),
})

export type UpsertSizeRequestSchema = z.infer<typeof upsertSizeRequestSchema>

// POST /api/[storeId]/sizes
const postSizeResponseSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  storeId: z.string(),
  value: z.string(),
  updatedAt: z.string(),
})

export type PostSizeResponseSchema = z.infer<typeof postSizeResponseSchema>

// PATCH /api/[storeId]/sizes/:sizesId
const patchSizeResponseSchema = z.object({
  count: z.number(),
})

export type PatchSizeResponseSchema = z.infer<typeof patchSizeResponseSchema>

// DELETE /api/[storeId]/sizes/:sizesId
const deleteSizeResponseSchema = z.object({
  count: z.number(),
})

export type DeleteSizeResponseSchema = z.infer<typeof deleteSizeResponseSchema>
