/* eslint-disable import/prefer-default-export */

import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { prismadb } from '@/lib/prismadb'

interface StoreRequestBody {
  name: string
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { name } = body as StoreRequestBody

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
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
    console.log(`[STORES_POST] ${(error as Error).message}`)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
