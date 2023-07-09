import { z } from 'zod'

// POST /api/[storeId]/billboards
export const billboardRequestSchema = z.object({
  label: z.string().nonempty('Billboard label is required'),
  imageUrl: z.string().nonempty('Billboard image url is required'),
})

export type BillboardFormValues = z.infer<typeof billboardRequestSchema>

export interface PostBillboardResponseSchema {
  label: string
  imageUrl: string
}

// PATCH /api/[storeId]/billboards/:billboardId
export interface PatchBillboardResponseSchema {
  label: string
  imageUrl: string
}

// Separate Post and Patch schemas
// infer the types from the schemas
// parse in the api functions
