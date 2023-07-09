import { z } from 'zod'

// POST /api/[storeId]/products
// PATCH /api/[storeId]/products/:productId
export const upsertProductRequestSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  images: z
    .object({ url: z.string().nonempty('Product image is required') })
    .array(),
  price: z.coerce
    .number()
    .multipleOf(0.01, 'Price must be to nearest penny')
    .nonnegative('Product price is required'),
  categoryId: z.string().nonempty('Product category is required'),
  colorId: z.string().nonempty('Product color is required'),
  sizeId: z.string().nonempty('Product size is required'),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
})

export type UpsertProductRequestSchema = z.infer<
  typeof upsertProductRequestSchema
>

// POST /api/[storeId]/products
const postProductResponseSchema = z.object({
  name: z.string(),
  images: z.string().array(),
  price: z.string(),
  categoryId: z.string(),
  colorId: z.string(),
  sizeId: z.string(),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
})

export type PostProductResponseSchema = z.infer<
  typeof postProductResponseSchema
>

// PATCH /api/[storeId]/products/:productsId
const patchProductResponseSchema = z.object({
  count: z.number(),
})

export type PatchProductResponseSchema = z.infer<
  typeof patchProductResponseSchema
>

// DELETE /api/[storeId]/products/:productsId
const deleteProductResponseSchema = z.object({
  count: z.number(),
})

export type DeleteProductResponseSchema = z.infer<
  typeof deleteProductResponseSchema
>
