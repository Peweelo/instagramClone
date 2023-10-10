import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Provider from './provider'
import '@uploadthing/react/styles.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Instagram app',
	description: 'Instagram app clone',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Provider>
				<body className={inter.className}>
					<Navbar />
					{children}
				</body>
			</Provider>
		</html>
	)
}
