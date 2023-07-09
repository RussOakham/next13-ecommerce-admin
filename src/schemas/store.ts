import { z } from 'zod'

// POST /api/stores
export const postStoreRequestSchema = z.object({
  name: z.string().nonempty('Store name is required'),
})

export type PostStoreRequestSchema = z.infer<typeof postStoreRequestSchema>

export const postStoreResponseSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
})

export type PostStoreResponseSchema = z.infer<typeof postStoreResponseSchema>

// PATCH /api/stores/:storeId/settings
export const patchStoreRequestSchema = z.object({
  name: z.string().nonempty('Store name is required'),
})

export type PatchStoreRequestSchema = z.infer<typeof patchStoreRequestSchema>

export const patchStoreResponseSchema = z.object({
  count: z.number(),
})
export type PatchStoreResponseSchema = z.infer<typeof patchStoreResponseSchema>

// DELETE /api/stores/:storeId
export const deleteStoreResponseSchema = z.object({
  count: z.number(),
})

export type DeleteStoreResponseSchema = z.infer<
  typeof deleteStoreResponseSchema
>
