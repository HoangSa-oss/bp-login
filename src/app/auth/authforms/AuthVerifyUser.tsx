"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const AuthVerifyUser = () => {
  const token = useSearchParams().get('token') ?? 0
  useEffect(()=>{
    const fetchData= async ()=>{
      try{
        const res = await fetch(`http://localhost:1111/api/users/verify-user?token=${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }})
          const data = await res.json()
          if(data.statusCode!=200){
            alert(data.message)
          }else{
            alert('Verify Success')
          }
      }catch(err){
        console.log(err)
      }
    
    }
    fetchData()
  },[])
  return (
    <>
       
    </>
  );
};

export default AuthVerifyUser;
