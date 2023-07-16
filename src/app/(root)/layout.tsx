import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { prismadb } from '@/lib/prismadb'

interface HomepageLayoutProps {
	children: React.ReactNode
}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	const store = await prismadb.store.findFirst({
		where: {
			userId,
		},
	})

	if (store) {
		redirect(`/${store.id}`)
	}

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>{children}</>
	)
}

export default HomepageLayout
