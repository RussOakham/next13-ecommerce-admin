import { z } from 'zod'

export const billboardRequestSchema = z.object({
  label: z.string().nonempty('Billboard label is required'),
  imageUrl: z.string().nonempty('Billboard image url is required'),
})

export type BillboardFormValues = z.infer<typeof billboardRequestSchema>

export interface PatchBillboardResponseSchema {
  label: string
  imageUrl: string
}

export interface PostBillboardResponseSchema {
  label: string
  imageUrl: string
}
