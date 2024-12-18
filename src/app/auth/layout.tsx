import { getServerSession } from "next-auth"
import Providers from "../components/dashboard/Providers"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    if(session){
        redirect('http://localhost:3000/')
    }
  return (
    <html lang="en">
      <body>
      <Providers >
        {children}
      </Providers >
      </body>
    </html>
  )
}
