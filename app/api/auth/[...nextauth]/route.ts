import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        // Replace this with your own logic to validate credentials
        if (credentials.username === process.env.MYECO_USERNAME && credentials.password === process.env.MYECO_PASSWORD) {
          return { id: "1", name: 'Sircle' } as User;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/myeco/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60
  }
};

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}