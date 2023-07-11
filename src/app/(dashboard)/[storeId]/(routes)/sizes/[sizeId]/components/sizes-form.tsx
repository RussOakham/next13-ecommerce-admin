'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Size } from '@prisma/client'
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
import { Input } from '@/components/ui/input'
import Separator from '@/components/ui/separator'
import axios from '@/lib/axios'
import {
  UpsertSizeRequestSchema,
  upsertSizeRequestSchema,
} from '@/schemas/size'

interface SizeFormProps {
  initialData: Size | null
}

const SizeForm = ({ initialData }: SizeFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const storeId = params.storeId as string
  const sizeId = params.sizeId as string

  const title = initialData ? 'Edit Size' : 'New Size'
  const description = initialData ? 'Edit your store Size' : 'Create a new Size'
  const toastMessage = initialData
    ? 'Size updated successfully.'
    : 'Size created successfully.'
  const action = initialData ? 'Save changes' : 'Create Size'

  const form = useForm<UpsertSizeRequestSchema>({
    resolver: zodResolver(upsertSizeRequestSchema),
    defaultValues: initialData ?? {
      name: '',
    },
  })

  const onSubmit = async (formData: UpsertSizeRequestSchema) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(`/api/${storeId}/sizes/${sizeId}`, formData)
      } else {
        await axios.post(`/api/${storeId}/sizes`, formData)
      }

      router.refresh()
      router.push(`/${storeId}/sizes`)
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
      await axios.delete(`/api/${storeId}/sizes/${sizeId}`)

      router.refresh()
      router.push(`/${storeId}/sizes`)
      toast.success('Size deleted successfully.')
    } catch (error) {
      toast.error("Make sure you've removed all categories using this size")
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
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
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

export default SizeForm
