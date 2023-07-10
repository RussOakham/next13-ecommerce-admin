import { auth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { prismadb } from '@/lib/prismadb'
import { UpsertSizeRequestSchema } from '@/schemas/size'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name, value } = body as UpsertSizeRequestSchema

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Size name is required', { status: 400 })
    }

    if (!value) {
      return new NextResponse('Size value is required', { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 })
    }

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[SIZE_POST] ${(error as Error).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return NextResponse.json(sizes)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[SIZES_GET] ${(error as AxiosError).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
