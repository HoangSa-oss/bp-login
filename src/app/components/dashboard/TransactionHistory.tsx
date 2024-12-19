"use client";
import React, { useEffect, useState } from "react";
import { Badge, Dropdown, Progress } from "flowbite-react";
import { HiOutlineDotsVertical  } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";

import product1 from "/public/images/products/s1.jpg";
import product2 from "/public/images/products/s2.jpg";
import product3 from "/public/images/products/s3.jpg";
import product4 from "/public/images/products/s4.jpg";
import product5 from "/public/images/products/s5.jpg";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { error } from "console";
import { getSession, useSession } from "next-auth/react";
import {Pagination} from '@mui/material'

export default function TransactionHistory () {
  const router = useRouter()
  const [dataApi,setDataApi] = useState([])
  const [dataCountAll,setDataCountAll] = useState(0)
  const pageUrl = useSearchParams().get('page') ?? 1
  const page = Number(pageUrl)
  const [currentPage,setCurrentPage] = useState(page)
  const limit = 15
  useEffect(()=>{
    const fetchData= async ()=>{
      const session = await getSession()
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/payment/transaction-history?page=${currentPage-1}&limit=${limit}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${session!.token!.accessToken}`,
            "Content-Type": "application/json",
          }})
          const data = await res.json()
          console.log(data)
          if(data.statusCode!=200){
            setDataApi([])
          }else{
            setDataApi(data.data.transactionHistory)
            setDataCountAll(Math.ceil( data.data.countAll / limit ))
          }
      }catch(err){
        console.log(err)
      }
    
    }
    fetchData()
  },[currentPage])
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    router.push(`/ui/transaction/transaction-history?page=${page}`)
  };
  return (
    <>
      <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full">
        <div className="px-6">
          <h5 className="card-title">Transaction History</h5>
          <p className="card-subtitle">Total 9k Visitors</p>
        </div>
        {/* <SimpleBar className="max-h-[450px]"> */}
          <div className="">
            <Table >
              <Table.Head>
                <Table.HeadCell className="p-6">Phone Number</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {dataApi.map((item:any, index:any) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item?.transaction?.phoneNumber}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <h5 className="text-base text-wrap">
                        {item?.transaction?.amount }
                      </h5>
                    </Table.Cell>
                    <Table.Cell>
                      <h5 className="text-base text-wrap">
                        {item?.updateAt}
                      </h5>
                      </Table.Cell>
                    <Table.Cell>
                      <h5 className="text-base text-wrap">
                        {item?.message }
                      </h5>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        {/* </SimpleBar> */}
        
      </div>
      <div style={{paddingTop: 10}}>
        <Pagination  sx={{'& > .MuiPagination-ul': {justifyContent: 'center',},}}      
        page={currentPage} count={dataCountAll} shape="rounded" onChange={handleChange} 
      />
      </div>
    </>
  );
};