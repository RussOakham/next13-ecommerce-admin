import { auth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { prismadb } from '@/lib/prismadb'
import { UpsertBillboardRequestSchema } from '@/schemas/billboard'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { imageUrl, label } = body as UpsertBillboardRequestSchema

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 })
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[BILLBOARDS_POST] ${(error as Error).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return NextResponse.json(billboards)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[BILLBOARDS_GET] ${(error as AxiosError).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
