export type ProductColumn = {
	id: string
	name: string
	isFeatured: boolean
	isArchived: boolean
	price: string
	category: string
	size: string
	color: string
	createdAt: string
}

export interface CellActionProps {
	data: ProductColumn
}
