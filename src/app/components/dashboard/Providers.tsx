"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import {Toaster} from 'react-hot-toast'
interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <SessionProvider>
    {children}
  </SessionProvider>;
};

export default Providers;