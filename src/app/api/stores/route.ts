/* eslint-disable import/prefer-default-export */
import { auth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { prismadb } from '@/lib/prismadb'
import { PostStoreResponseSchema } from '@/schemas/store'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name } = body as PostStoreResponseSchema

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[STORES_POST] ${(error as AxiosError).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
