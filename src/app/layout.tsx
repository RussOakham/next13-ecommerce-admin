import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import ModalProvider from '@/providers/modal-providers'
import ThemeProvider from '@/providers/theme-provider'
import ToastProvider from '@/providers/toast-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard',
}

interface RootLayoutProps {
	children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<ClerkProvider>
			<html lang="en-GB">
				<body className={inter.className} suppressHydrationWarning>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<ToastProvider />
						<ModalProvider />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
