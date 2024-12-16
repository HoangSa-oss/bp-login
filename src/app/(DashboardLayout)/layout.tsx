import React from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import Providers from "../components/dashboard/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  if(!session){
      redirect('api/auth/signin')
  }
  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        {/* Header/sidebar */}
        <Sidebar />
        <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
          <Header info={session.user} />
          {/* Body Content  */}
          <div
            className={`container mx-auto  py-30`}
          >
            <Providers>
              {children}
            </Providers>
          </div>
        </div>
      </div>
    </div>
  );
}
