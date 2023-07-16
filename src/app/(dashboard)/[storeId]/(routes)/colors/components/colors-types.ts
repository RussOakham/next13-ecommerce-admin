export type ColorColumn = {
	id: string
	name: string
	value: string
	createdAt: string
}

export interface CellActionProps {
	data: ColorColumn
}
