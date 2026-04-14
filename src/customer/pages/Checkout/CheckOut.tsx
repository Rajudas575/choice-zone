import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import { Add } from "@mui/icons-material";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [{ name: "RAZORPAY" }, { name: "STRIPE" }];

const CheckOut = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentGateWay, setPaymentGateWay] = useState(
    paymentGatewayList[0].name,
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => setSelectedAddress(e.target.value);

  const handleChangePaymentGateWay = (e: any) => {
    setPaymentGateWay(e.target.value);
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
      <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-7">
        <div className="col-span-2 space-y-5">
          <div className="flex justify-between items-center">
            <span className="font-semibold"> Select Dilivery Address</span>
            <Button onClick={handleOpen} variant="outlined">
              Add New Address
            </Button>
          </div>
          <div className="text-xs font-medium space-y-5">
            <p>Saved Address</p>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <AddressCard
                  value={index}
                  selectedValue={selectedAddress}
                  handleChange={handleChange}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="py-4 px-5 rounded-md border border-gray-300">
            <Button onClick={handleOpen} startIcon={<Add />}>
              Add New Address
            </Button>
          </div>
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <section className="space-y-3 border border-gray-300 p-5 rounded-md">
            <h1 className="text-blue-600 font-medium pb-2 text-center">
              Choose Payment Gateway
            </h1>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={paymentGateWay}
              onChange={handleChangePaymentGateWay}>
              {paymentGatewayList.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.name}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </section>
          <section className="border border-gray-300 rounded-md">
            <PricingCard />
            <div className="p-5">
              <Button variant="contained" fullWidth sx={{ py: "11px" }}>
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <AddressForm paymentGateWay={paymentGateWay}/>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckOut;
