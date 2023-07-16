'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import Separator from '@/components/ui/separator'

import columns from './columns'
import { SizeColumn } from './sizes-types'

interface SizesClientProps {
	data: SizeColumn[]
}

const SizesClient = ({ data }: SizesClientProps) => {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sizes (${data.length})`}
					description="Manage your store sizes"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId as string}/sizes/new`)}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey="name" />
			<Heading title="API" description="API Calls for Sizes" />
			<Separator />
			<ApiList entityIdName="sizeId" entityName="sizes" />
		</>
	)
}

export default SizesClient
