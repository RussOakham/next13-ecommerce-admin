'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
}

const MainNav = ({ className }: MainNavProps) => {
	const pathname = usePathname()
	const params = useParams()

	const storeId = params.storeId as string

	const routes = [
		{
			href: `/${storeId}`,
			label: 'Overview',
			active: pathname === `/${storeId}`,
		},
		{
			href: `/${storeId}/billboards`,
			label: 'Billboards',
			active: pathname === `/${storeId}/billboards`,
		},
		{
			href: `/${storeId}/categories`,
			label: 'Categories',
			active: pathname === `/${storeId}/categories`,
		},
		{
			href: `/${storeId}/sizes`,
			label: 'Sizes',
			active: pathname === `/${storeId}/sizes`,
		},
		{
			href: `/${storeId}/colors`,
			label: 'Colors',
			active: pathname === `/${storeId}/colors`,
		},
		{
			href: `/${storeId}/products`,
			label: 'Products',
			active: pathname === `/${storeId}/products`,
		},
		{
			href: `/${storeId}/orders`,
			label: 'Orders',
			active: pathname === `/${storeId}/orders`,
		},
		{
			href: `/${storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${storeId}/settings`,
		},
	]

	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
			{routes.map((route) => (
				<Link
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active
							? 'text-black dark:text-white'
							: 'text-muted-foreground',
					)}
					key={route.href}
					href={route.href}
				>
					{route.label}
				</Link>
			))}
		</nav>
	)
}

export default MainNav
