import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { prismadb } from '@/lib/prismadb'
import stripe from '@/lib/stripe'

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	const { productIds } = (await req.json()) as { productIds: string[] }

	if (!productIds || productIds.length === 0) {
		return new NextResponse('Product ids are required', { status: 400 })
	}

	const products = await prismadb.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	})

	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

	products.forEach((product) => {
		lineItems.push({
			quantity: 1,
			price_data: {
				currency: 'GBP',
				product_data: {
					name: product.name,
				},
				unit_amount: product.price.toNumber() * 100,
			},
		})
	})

	const order = await prismadb.order.create({
		data: {
			storeId: params.storeId,
			isPaid: false,
			orderItems: {
				create: productIds.map((productId: string) => ({
					product: {
						connect: {
							id: productId,
						},
					},
					quantity: 1,
				})),
			},
		},
	})

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		billing_address_collection: 'required',
		phone_number_collection: {
			enabled: true,
		},
		success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
		cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
		metadata: {
			orderId: order.id,
		},
	})

	return NextResponse.json(
		{ url: session.url },
		{
			headers: corsHeaders,
		},
	)
}
