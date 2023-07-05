import { z } from 'zod'

export const patchStoreSettingsRequestSchema = z.object({
  name: z.string().nonempty('Store name is required'),
})

export type SettingsFormValues = z.infer<typeof patchStoreSettingsRequestSchema>

export interface PatchStoreSettingsResponseSchema {
  name: string
}
