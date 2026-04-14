import { Edit } from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import React from "react";
import ProfileFildCard from "../../customer/pages/account/ProfileFildCard";

const BusinessDetails = () => {
  return (
    <div className="lg:px-20 pt-5 pb-20 space-y-20">
      <div className="w-full lgw-[70%]">
        <div className="flex items-center pn-3 justify-between">
          <h1 className="font-bold text-xl">Business Details</h1>
          <Button className="w-16 h-16">
            <Edit />
          </Button>
        </div>

        <div>
          {/* //Seller Logo// */}
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://res-console.cloudinary.com/ds4zgf8p4/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/bG9nby1zcXVhcmVfc2Z0bXh1/template_primary"
            alt=""
          />
          <div>
            <ProfileFildCard
              keys={"Besiness / Band Name"}
              value={"Square Cloths Pvt"}
            />
            <Divider />
            <ProfileFildCard keys={"GSTIN"} value={"GSTIN564"} />
            <Divider />

            <ProfileFildCard
              keys={"Account Status"}
              value={"PENDING_VERIFICATION"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
