import { z } from 'zod'

export const categoryRequestSchema = z.object({
  name: z.string().nonempty('Category name is required'),
  billboardId: z.string().nonempty('Billboard ID is required'),
})

export type CategoryFormValues = z.infer<typeof categoryRequestSchema>

export interface PatchCategoryResponseSchema {
  name: string
  billboardId: string
}

export interface PostCategoryResponseSchema {
  name: string
  billboardId: string
}
