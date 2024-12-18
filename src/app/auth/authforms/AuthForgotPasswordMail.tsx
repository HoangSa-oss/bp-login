"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const AuthForgotPasswordMail = () => {
  const userName = useRef("");
  const email = useRef("");
  const router = useRouter();

  const onSubmit = async (e:any) => {
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:1111/auth/forgot-password-send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          email:email.current
        })
      })
        const data = await res.json()
        if(data.statusCode!=200){
          alert(data.message)
        }else{
          alert("Mail was send")
        }
    }catch(err){
      console.log(err)
    }
  };
  return (
    <>
      <form>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            className="form-control"
            onChange={(e) => (email.current = e.target.value)}
          />
        </div>
        <Button  onClick={onSubmit} color={"primary"} href="/" as={Link} className="w-full">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AuthForgotPasswordMail;
