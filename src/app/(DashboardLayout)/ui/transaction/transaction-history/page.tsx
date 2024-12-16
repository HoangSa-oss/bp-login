import React from "react";

import TransactionHistory from '../../../../components/dashboard/TransactionHistory'

import Link from "next/link";

const page = () => {
  return (
    <>
        <div className="lg:col-span-8 col-span-12">
          <TransactionHistory />
        </div>
    </>
  );
};

export default page;
