import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// PROPER user authentication TODO 
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "admin@gmail.com",
    password: "123",
  },
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find((user) => user.email === credentials.email)

        if (!user || user.password !== credentials.password) {
          return null
        }

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

export default NextAuth(authOptions)

