"use client";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useRef } from "react";

const AuthRegister = () => {
  const name = useRef("");
  const email = useRef("")
  const phone = useRef("");
  const company = useRef("");
  const username = useRef("");
  const password = useRef("");
  const onSubmit = async () => {
    const res = await fetch('http://localhost:1111' + "/auth/register", {
      method: "POST",
      headers:{
       "Content-Type": "application/json; charset=utf-8"

      },
      body: JSON.stringify({
        user_name: username.current,
        password:password.current,
        email:email.current,
        full_name: name.current,
        phone: phone.current,
        company:company.current,
        is_verify_email:true,
       
      }),
    });
    const data = await res.json()
    alert(data.message)
    };
  return (
    <>
      <form>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            className="form-control"
            onChange={(e) => (name.current = e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd" value="Email Address" />
          </div>
          <TextInput
            id="emadd"
            type="text"
            sizing="md"
            className="form-control"
            onChange={(e) => (email.current = e.target.value)}
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone" />
          </div>
          <TextInput
            id="phone"
            type="tel"
            sizing="md"
            className="form-control"
            onChange={(e) => (phone.current = e.target.value)}
          />
        </div> 
        <div className="mb-8">
          <div className="mb-2 block">
            <Label htmlFor="company" value="Company" />
          </div>
          <TextInput
            id="company"
            type="text"
            sizing="md"
            className="form-control"
            onChange={(e) => (company.current = e.target.value)}

          />
        </div> 
        <div className="mb-10">
          <div className="mb-2 block">
            <Label htmlFor="user" value="Username"/>
          </div>
          <TextInput
            id="user"
            type="text"
            sizing="md"
            className="form-control"
            onChange={(e) => (username.current = e.target.value)}

          />
        </div> 
        <div className="mb-12">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="md"
            className="form-control"
            onChange={(e) => (password.current = e.target.value)}

          />
        </div> 
        <Button onClick={onSubmit} color={'primary'} className="w-full">Sign Up</Button> 
        
      </form>
    </>
  )
}

export default AuthRegister
