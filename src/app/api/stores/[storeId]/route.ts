import { auth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { prismadb } from '@/lib/prismadb'
import { PatchStoreRequestSchema } from '@/schemas/store'

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name } = body as PatchStoreRequestSchema

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 })
		}

		if (!params.storeId) {
			return new NextResponse('Store ID is required', { status: 400 })
		}

		const store = await prismadb.store.updateMany({
			where: {
				id: params.storeId,
				userId,
			},
			data: {
				name,
			},
		})

		return NextResponse.json(store)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(`[STORES_PATCH] ${(error as AxiosError).message}`)
		return new NextResponse('Internal Error', { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 })
		}

		if (!params.storeId) {
			return new NextResponse('Store ID is required', { status: 400 })
		}

		const store = await prismadb.store.deleteMany({
			where: {
				id: params.storeId,
				userId,
			},
		})

		return NextResponse.json(store)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(`[STORES_DELETE] ${(error as AxiosError).message}`)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
