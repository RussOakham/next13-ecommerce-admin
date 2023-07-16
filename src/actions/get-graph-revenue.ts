import { prismadb } from '@/lib/prismadb'

export interface GraphData {
	name: string
	total: number
}

const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
	const paidOrders = await prismadb.order.findMany({
		where: {
			storeId,
			isPaid: true,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
	})

	const monthlyRevenue: { [key: number]: number } = paidOrders.reduce(
		(acc, order) => {
			const month = order.createdAt.getMonth()

			let revenueForOrder = 0

			order.orderItems.forEach((orderItem) => {
				revenueForOrder += orderItem.product.price.toNumber()
			})

			// Add revenue for order to the month
			acc[month] = (acc[month] ?? 0) + revenueForOrder

			return acc
		},
		{} as { [key: number]: number },
	)

	// Convert monthlyRevenue to GraphData[]
	const graphData: GraphData[] = [
		{ name: 'Jan', total: monthlyRevenue[0] ?? 0 },
		{ name: 'Feb', total: monthlyRevenue[1] ?? 0 },
		{ name: 'Mar', total: monthlyRevenue[2] ?? 0 },
		{ name: 'Apr', total: monthlyRevenue[3] ?? 0 },
		{ name: 'May', total: monthlyRevenue[4] ?? 0 },
		{ name: 'Jun', total: monthlyRevenue[5] ?? 0 },
		{ name: 'Jul', total: monthlyRevenue[6] ?? 0 },
		{ name: 'Aug', total: monthlyRevenue[7] ?? 0 },
		{ name: 'Sep', total: monthlyRevenue[8] ?? 0 },
		{ name: 'Oct', total: monthlyRevenue[9] ?? 0 },
		{ name: 'Nov', total: monthlyRevenue[10] ?? 0 },
		{ name: 'Dec', total: monthlyRevenue[11] ?? 0 },
	]

	return graphData
}

export default getGraphRevenue
