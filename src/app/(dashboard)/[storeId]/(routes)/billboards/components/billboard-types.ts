export type BillboardColumn = {
	id: string
	label: string
	createdAt: string
}

export interface CellActionProps {
	data: BillboardColumn
}
