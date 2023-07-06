import { z } from 'zod'

export const patchBillboardRequestSchema = z.object({
  label: z.string().nonempty('Billboard label is required'),
  imageUrl: z.string().nonempty('Billboard image url is required'),
})

export type BillboardFormValues = z.infer<typeof patchBillboardRequestSchema>

export interface PatchStoreBillboardResponseSchema {
  name: string
}
