import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth'
import prisma from './libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith@.com' },
				login: { label: 'Login', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (credentials) {
					if (!credentials.email || !credentials.password) {
						throw new Error('Please enter an email and password')
					}

					const user = await prisma.user.findUnique({
						where: {
							email: credentials.email,
						},
					})

					if (!user || !user?.hashedPassword) {
						throw new Error('No user found')
					}

					const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

					if (!passwordMatch) {
						throw new Error('Incorrect password')
					}

					return user
				}
			},
		}),
	],
	secret: process.env.SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update') {
				console.log('update')
				token.image = session.image
				token.picture = session.image
			}

			if (user) {
				return {
					...token,
					id: user.id,
					email: user.email,
					image: user.image,
				}
			}
			return token
		},

		async session({ session, token }) {
			return {
				...session,
				user: {
					email: session.user.email,
					image: token.picture,
				},
			}
		},
	},
	debug: process.env.NODE_ENV === 'development',
}

export const getAuthSession = () => getServerSession(authOptions)
