"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRef } from 'react'
import { useRouter } from 'next/navigation';

const AuthLogin = () => {
  const userName = useRef("");
  const pass = useRef("");
  const router = useRouter();

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
      callbackUrl: "/",
    });
    if(result?.status==200){
      console.log('router')
      router.push('/')
    }else{
      alert(result?.error)
    }
  };
  return (
    <>
      <form>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="Username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            sizing="md"
            className="form-control"
            onChange={(e) => (userName.current = e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control"
            onChange={(e) => (pass.current = e.target.value)}
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-normal cursor-pointer"
            >
              Remeber this Device
            </Label>
          </div>
          <Link href={"/"} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <Button  onClick={onSubmit} color={"primary"} href="/" as={Link} className="w-full">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
