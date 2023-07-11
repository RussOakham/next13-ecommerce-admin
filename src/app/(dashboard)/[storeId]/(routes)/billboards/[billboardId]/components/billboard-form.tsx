'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import AlertModal from '@/components/modals/alert-modal'
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
import ImageUpload from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import Separator from '@/components/ui/separator'
import axios from '@/lib/axios'
import {
  UpsertBillboardRequestSchema,
  upsertBillboardRequestSchema,
} from '@/schemas/billboard'

interface BillboardFormProps {
  initialData: Billboard | null
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const storeId = params.storeId as string
  const billboardId = params.billboardId as string

  const title = initialData ? 'Edit Billboard' : 'New Billboard'
  const description = initialData
    ? 'Edit your store Billboard'
    : 'Create a new Billboard'
  const toastMessage = initialData
    ? 'Billboard updated successfully.'
    : 'Billboard created successfully.'
  const action = initialData ? 'Save changes' : 'Create Billboard'

  const form = useForm<UpsertBillboardRequestSchema>({
    resolver: zodResolver(upsertBillboardRequestSchema),
    defaultValues: initialData ?? {
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (formData: UpsertBillboardRequestSchema) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(`/api/${storeId}/billboards/${billboardId}`, formData)
      } else {
        await axios.post(`/api/${storeId}/billboards`, formData)
      }

      router.refresh()
      router.push(`/${storeId}/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${storeId}/billboards/${billboardId}`)

      router.refresh()
      router.push(`/${storeId}/billboards`)
      toast.success('Billboard deleted successfully.')
    } catch (error) {
      toast.error(
        "Make sure you've removed all categories using this billboard",
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
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}

export default BillboardForm
