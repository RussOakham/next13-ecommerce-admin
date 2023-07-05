'use client'

import { useState } from 'react'
import { Store } from '@prisma/client'
import { PopoverContent } from '@radix-ui/react-popover'
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import useStoreModal from '@/hooks/use-store-modal'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'
import { Popover, PopoverTrigger } from './ui/popover'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  className?: string
  items: Store[]
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()
  const storeModal = useStoreModal()

  const formattedItems = items.map((item) => ({
    label: item.name,
    id: item.id,
  }))

  const currentStore = formattedItems.find((item) => item.id === params.storeId)

  const onStoreSelect = (store: { label: string; id: string }) => {
    setOpen(false)
    router.push(`/${store.id}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label ?? 'Select a store'}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] rounded-sm p-0 shadow">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.id}
                  className="text-sm"
                  onSelect={() => onStoreSelect(item)}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.id === item.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
