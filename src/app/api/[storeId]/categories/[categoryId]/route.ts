import { auth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { prismadb } from '@/lib/prismadb'
import { PatchCategoryResponseSchema } from '@/schemas/category'

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[CATEGORY_GET] ${(error as AxiosError).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { billboardId, name } = body as PatchCategoryResponseSchema

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Category name is required', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
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

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        billboardId,
        name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[CATEGORY_PATCH] ${(error as AxiosError).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 })
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

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[CATEGORY_DELETE] ${(error as AxiosError).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
