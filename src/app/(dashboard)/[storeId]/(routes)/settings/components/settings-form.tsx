'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import AlertModal from '@/components/modals/alert-modal'
import ApiAlert from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import Separator from '@/components/ui/separator'
import useOrigin from '@/hooks/use-origin'
import axios from '@/lib/axios'
import {
  PatchStoreRequestSchema,
  patchStoreRequestSchema,
} from '@/schemas/store'

interface SettingsFormProps {
  initialData: Store
}

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin() ?? ''

  const storeId = params.storeId as string

  const form = useForm<PatchStoreRequestSchema>({
    resolver: zodResolver(patchStoreRequestSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (formData: PatchStoreRequestSchema) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${storeId}`, formData)

      router.refresh()
      toast.success('Store settings updated successfully.')
    } catch (error) {
      toast.error('Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${storeId}`)

      router.refresh()
      router.push('/')
      toast.success('Store deleted successfully.')
    } catch (error) {
      toast.error(
        `Make sure you've removed all related categories and products before deletion.`,
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store settings" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={loading}>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        variant="public"
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${storeId}`}
      />
    </>
  )
}

export default SettingsForm
