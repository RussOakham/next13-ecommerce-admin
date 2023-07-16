'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import AlertModal from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from '@/lib/axios'

import { CellActionProps } from './category-types'

const CellAction = ({ data }: CellActionProps) => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const params = useParams()

	const storeId = params.storeId as string

	const onCopy = async (id: string) => {
		await navigator.clipboard.writeText(id)
		toast.success('Copied to clipboard')
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			await axios.delete(`/api/${storeId}/categories/${data.id}`)

			router.refresh()
			toast.success('Category deleted successfully.')
		} catch (error) {
			toast.error("Make sure you've removed all categories using this category")
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="h-8 w-8 p-0" variant="ghost">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => router.push(`/${storeId}/categories/${data.id}`)}
					>
						<Edit className="mr-2 h-4 w-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" />
						Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default CellAction
