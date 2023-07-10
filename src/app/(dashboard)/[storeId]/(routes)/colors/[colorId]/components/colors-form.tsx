'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Color } from '@prisma/client'
import axios from 'axios'
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
import {
  UpsertColorRequestSchema,
  upsertColorRequestSchema,
} from '@/schemas/color'

interface ColorFormProps {
  initialData: Color | null
}

const ColorForm = ({ initialData }: ColorFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Edit Color' : 'New Color'
  const description = initialData
    ? 'Edit your store Color'
    : 'Create a new Color'
  const toastMessage = initialData
    ? 'Color updated successfully.'
    : 'Color created successfully.'
  const action = initialData ? 'Save changes' : 'Create Color'

  const form = useForm<UpsertColorRequestSchema>({
    resolver: zodResolver(upsertColorRequestSchema),
    defaultValues: initialData ?? {
      name: '',
    },
  })

  const onSubmit = async (formData: UpsertColorRequestSchema) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          formData,
        )
      } else {
        await axios.post(`/api/${params.storeId}/colors`, formData)
      }

      router.refresh()
      router.push(`/${params.storeId}/colors`)
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)

      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast.success('Color deleted successfully.')
    } catch (error) {
      toast.error("Make sure you've removed all categories using this color")
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
                      placeholder="Color name"
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
                    <div className="flex items-center gap-x-4">
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                    </div>
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

export default ColorForm
