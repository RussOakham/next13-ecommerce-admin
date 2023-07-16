import { z } from 'zod'

// POST /api/[storeId]/colors
// PATCH /api/[storeId]/colors/:colorsId
export const upsertColorRequestSchema = z.object({
	name: z.string().nonempty('Color name is required'),
	value: z
		.string()
		.min(4, 'Color value must be 4 characters long')
		.regex(/^#/, {
			message: 'Color value be a valid hex color code',
		}),
})

export type UpsertColorRequestSchema = z.infer<typeof upsertColorRequestSchema>

// POST /api/[storeId]/colors
const postColorResponseSchema = z.object({
	createdAt: z.string(),
	id: z.string(),
	name: z.string(),
	storeId: z.string(),
	value: z
		.string()
		.min(4, 'Color value must be 4 characters long')
		.regex(/^#/, {
			message: 'Color value be a valid hex color code',
		}),
	updatedAt: z.string(),
})

export type PostColorResponseSchema = z.infer<typeof postColorResponseSchema>

// PATCH /api/[storeId]/colors/:colorsId
const patchColorResponseSchema = z.object({
	count: z.number(),
})

export type PatchColorResponseSchema = z.infer<typeof patchColorResponseSchema>

// DELETE /api/[storeId]/colors/:colorsId
const deleteColorResponseSchema = z.object({
	count: z.number(),
})

export type DeleteColorResponseSchema = z.infer<
	typeof deleteColorResponseSchema
>
