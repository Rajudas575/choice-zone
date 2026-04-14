import { Edit } from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import React from "react";
import ProfileFildCard from "../../customer/pages/account/ProfileFildCard";

const TransactionDetail = () => {
  return (
    <div className="lg:px-20 pt-5 pb-20 space-y-20">
      <div className="w-full lgw-[70%]">
        <div className="flex items-center pn-3 justify-between">
          <h1 className="font-bold text-xl">Bank Details</h1>
          <Button className="w-16 h-16">
            <Edit />
          </Button>
        </div>

        <div>
          <div>
            <ProfileFildCard keys={"Account Holder Name"} value={"Shibasish"} />
            <Divider />
            <ProfileFildCard keys={"Account Number"} value={"214569874111"} />
            <Divider />

            <ProfileFildCard keys={"IFSC CODE"} value={"ICIC321"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
