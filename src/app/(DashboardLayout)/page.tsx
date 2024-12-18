"use client";

import React from "react";
import SalesProfit from "../components/dashboard/SalesProfit";
import TotalFollowers from "../components/dashboard/TotalFollowers";
import TotalIncome from "../components/dashboard/TotalIncome";
import PopularProducts from "../components/dashboard/PopularProducts";
import EarningReports from "../components/dashboard/EarningReports";
import BlogCards from "../components/dashboard/BlogCards";
import Link from "next/link";

export default function page ()  {
  return (
    <>
        <div className="lg:col-span-8 col-span-12">
          <PopularProducts />
        </div>
    </>
  );
};

