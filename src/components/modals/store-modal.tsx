'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosResponse } from 'axios'
import * as z from 'zod'

import useStoreModal from '@/hooks/use-store-modal'

import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import Modal from '../ui/modal'

const storeFormSchema = z.object({
  name: z.string().nonempty('Store name is required'),
})

interface StoresApiResponseSchema {
  id: string
  name: string
}

const StoreModal: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const storeModal = useStoreModal()

  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof storeFormSchema>) => {
    try {
      setLoading(true)

      const response: AxiosResponse<StoresApiResponseSchema> = await axios.post(
        '/api/stores',
        values
      )

      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error('Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
    return null
  }

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-Commerce"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal
