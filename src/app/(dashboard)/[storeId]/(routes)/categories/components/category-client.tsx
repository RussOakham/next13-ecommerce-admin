'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import Separator from '@/components/ui/separator'

import { CategoryColumn } from './category-types'
import columns from './columns'

interface CategoryClientProps {
	data: CategoryColumn[]
}

const CategoryClient = ({ data }: CategoryClientProps) => {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Categories (${data.length})`}
					description="Manage your store categories"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId as string}/categories/new`)
					}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey="name" />
			<Heading title="API" description="API Calls for Categories" />
			<Separator />
			<ApiList entityIdName="categoryId" entityName="categories" />
		</>
	)
}

export default CategoryClient
