import { prismadb } from '@/lib/prismadb'

import ColorForm from './components/colors-form'

interface NewColorPageProps {
	params: { colorId: string }
}

const NewColorPage = async ({ params }: NewColorPageProps) => {
	const color = await prismadb.color.findFirst({
		where: { id: params.colorId },
	})

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 px-4 py-6">
				<ColorForm initialData={color} />
			</div>
		</div>
	)
}

export default NewColorPage
