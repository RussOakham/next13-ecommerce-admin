import { format } from 'date-fns'

import { prismadb } from '@/lib/prismadb'

import SizesClient from './components/sizes-client'
import { SizeColumn } from './components/sizes-types'

interface SizesPageProps {
	params: {
		storeId: string
	}
}

const SizesPage = async ({ params }: SizesPageProps) => {
	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedSizes: SizeColumn[] = sizes.map((size) => ({
		id: size.id,
		name: size.name,
		value: size.value,
		createdAt: format(size.createdAt, 'MMM do, yyyy'),
	}))

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 px-4 py-6">
				<SizesClient data={formattedSizes} />
			</div>
		</div>
	)
}

export default SizesPage
