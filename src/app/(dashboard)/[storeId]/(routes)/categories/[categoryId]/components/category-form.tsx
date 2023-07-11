'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard, Category } from '@prisma/client'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Separator from '@/components/ui/separator'
import axios from '@/lib/axios'
import {
  UpsertCategoryRequestSchema,
  upsertCategoryRequestSchema,
} from '@/schemas/category'

interface CategoryFormProps {
  initialData: Category | null
  billboards: Billboard[]
}

const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const storeId = params.storeId as string
  const categoryId = params.categoryId as string

  const title = initialData ? 'Edit Category' : 'New Category'
  const description = initialData
    ? 'Edit your store Category'
    : 'Create a new Category'
  const toastMessage = initialData
    ? 'Category updated successfully.'
    : 'Category created successfully.'
  const action = initialData ? 'Save changes' : 'Create Category'

  const form = useForm<UpsertCategoryRequestSchema>({
    resolver: zodResolver(upsertCategoryRequestSchema),
    defaultValues: initialData ?? {
      name: '',
      billboardId: '',
    },
  })

  const onSubmit = async (formData: UpsertCategoryRequestSchema) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(`/api/${storeId}/categories/${categoryId}`, formData)
      } else {
        await axios.post(`/api/${storeId}/categories`, formData)
      }

      router.refresh()
      router.push(`/${storeId}/categories`)
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
      await axios.delete(`/api/${storeId}/categories/${categoryId}`)

      router.refresh()
      router.push(`/${storeId}/categories`)
      toast.success('Category deleted successfully.')
    } catch (error) {
      toast.error(
        "Make sure you've removed all products using this category first",
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm
