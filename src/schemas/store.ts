import { z } from 'zod'

export const postStoreRequestSchema = z.object({
  name: z.string().nonempty('Store name is required'),
})

export type PostStoreFormValues = z.infer<typeof postStoreRequestSchema>

export interface PostStoreResponseSchema {
  id: string
  name: string
}
