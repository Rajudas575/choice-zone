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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import { createOrder } from "../../../tempReduxToolkit/features/customer/orderSlice";

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

const paymentGatwayList = [
  {
    value: "RAZORPAY",
    image:
      "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png",
    label: "Razarpay",
  },
  {
    value: "STRIPE",
    image: "/stripe_logo.png",
    label: "Stripe",
  },
];

// const paymentGatwayList = [{ name: "RAZORPAY" }, { name: "STRIPE" }];

const CheckOut = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  // const [paymentGateWay, setPaymentGateWay] = useState(
  //   paymentGatwayList[0].name,
  // );
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store);
  const [paymentGateway, setPaymentGateway] = useState(
    paymentGatwayList[0].value,
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => setSelectedAddress(e.target.value);

  // const handleChangePaymentGateWay = (e: any) => {
  //   setPaymentGateWay(e.target.value);
  // };

  const handleCreateOrder = () => {
    if (user.user?.addresses)
      dispatch(
        createOrder({
          paymentGateway,
          address: user.user?.addresses[value],
          jwt: localStorage.getItem("jwt") || "",
        }),
      );
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGateway((event.target as HTMLInputElement).value);
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
              value={paymentGateway}
              onChange={handlePaymentChange}>
              {paymentGatwayList.map((item) => (
                <FormControlLabel
                  className={`border w-[45%] flex justify-center rounded-md pr-2 ${paymentGateway === item.value ? "border-primary-color" : ""}`}
                  value={item.value}
                  control={<Radio />}
                  label={
                    <div>
                      <img
                        className={`${item.value == "stripe" ? "w-14" : ""} object-cover`}
                        src={item.image}
                        alt={item.label}
                      />
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </section>
          <section className="border border-gray-300 rounded-md">
            <PricingCard />
            <div className="p-5">
              <Button
                onClick={handleCreateOrder}
                variant="contained"
                fullWidth
                sx={{ py: "11px" }}>
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
          <AddressForm
            paymentGateWay={paymentGateway}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CheckOut;
