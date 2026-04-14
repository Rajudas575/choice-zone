import React from "react";
import TransactionTable from "./transactionTable";

const Transactions = () => {
  return (
    <div>
      <h1 className="pb-5 font-bold text-xl">All Transactions</h1>
      <TransactionTable />
    </div>
  );
};

export default Transactions;
