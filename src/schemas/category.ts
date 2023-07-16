import { z } from 'zod'

// POST /api/[storeId]/categories
// PATCH /api/[storeId]/categories/:categoryId
export const upsertCategoryRequestSchema = z.object({
	name: z.string().nonempty('Category name is required'),
	billboardId: z.string().nonempty('Billboard ID is required'),
})

export type UpsertCategoryRequestSchema = z.infer<
	typeof upsertCategoryRequestSchema
>

export const postCategoryResponseSchema = z.object({
	billboardId: z.string(),
	createdAt: z.string(),
	id: z.string(),
	name: z.string(),
	storeId: z.string(),
	updatedAt: z.string(),
})

export type PostCategoryResponseSchema = z.infer<
	typeof postCategoryResponseSchema
>

// PATCH /api/[storeId]/categories/:categoryId
export const patchCategoryResponseSchema = z.object({
	count: z.number(),
})

export type PatchCategoryResponseSchema = z.infer<
	typeof patchCategoryResponseSchema
>

// DELETE /api/[storeId]/categories/:categoryId
export const deleteCategoryResponseSchema = z.object({
	count: z.number(),
})

export type DeleteCategoryResponseSchema = z.infer<
	typeof deleteCategoryResponseSchema
>
