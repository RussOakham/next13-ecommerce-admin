import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { prismadb } from '@/lib/prismadb'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { storeId: string }
}

const layout = async ({ children, params }: DashboardLayoutProps) => {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <>
      <div>This will be a NavBar</div>
      {children}
    </>
  )
}

export default layout
