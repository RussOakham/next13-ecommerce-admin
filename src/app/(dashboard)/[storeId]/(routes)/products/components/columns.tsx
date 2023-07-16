'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

import CellAction from './cell-action'
import { ProductColumn } from './products-types'

const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'isArchived',
		header: 'Archived',
	},
	{
		accessorKey: 'isFeatured',
		header: 'Featured',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'size',
		header: 'Size',
	},
	{
		accessorKey: 'color',
		header: 'Color',
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.color}
				<div
					className="h-6 w-6 rounded-full border"
					style={{ backgroundColor: row.original.color }}
				/>
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		id: 'action',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
]

export default columns
