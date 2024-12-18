"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const AuthForgotPassword = () => {
  const pass = useRef("");
  const token = useSearchParams().get('token') ?? 0

  const onSubmit = async (e:any) => {
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:1111/auth/forgot-password?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          password:pass.current
        })
      })
        const data = await res.json()
        if(data.statusCode!=200){
          alert(data.message)
        }else{
          alert("Your pasword was changed")
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
            <Label htmlFor="userpwd" value="New Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control"
            onChange={(e) => (pass.current = e.target.value)}
          />
        </div>
        <Button  onClick={onSubmit} color={"primary"} href="/" as={Link} className="w-full">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AuthForgotPassword;
