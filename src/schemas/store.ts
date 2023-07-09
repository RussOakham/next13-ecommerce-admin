import { z } from 'zod'

// POST /api/stores
export const postStoreRequestSchema = z.object({
  name: z.string().nonempty('Store name is required'),
})

export type PostStoreFormValues = z.infer<typeof postStoreRequestSchema>

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

export type PatchStoreFormValues = z.infer<typeof patchStoreRequestSchema>

export const patchStoreResponseSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
})
export type PatchStoreResponseSchema = z.infer<typeof patchStoreResponseSchema>
