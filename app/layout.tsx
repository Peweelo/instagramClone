'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Provider from './provider'
import '@uploadthing/react/styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
const inter = Inter({ subsets: ['latin'] })


const client = new QueryClient()
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Provider>
				<QueryClientProvider client={client}>
					<body className={inter.className}>
						<Navbar />
						{children}
					</body>
				</QueryClientProvider>
			</Provider>
		</html>
	)
}
