import { format } from 'date-fns'

import { prismadb } from '@/lib/prismadb'

import BillboardClient from './components/billboard-client'
import { BillboardColumn } from './components/billboard-types'

interface BillboardsPageProps {
	params: {
		storeId: string
	}
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const formattedBillboards: BillboardColumn[] = billboards.map(
		(billboard) => ({
			id: billboard.id,
			label: billboard.label,
			createdAt: format(billboard.createdAt, 'MMM do, yyyy'),
		}),
	)

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 px-4 py-6">
				<BillboardClient data={formattedBillboards} />
			</div>
		</div>
	)
}

export default BillboardsPage
