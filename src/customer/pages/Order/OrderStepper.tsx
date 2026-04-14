import { CheckCircle } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", destination: "by Mo, 12 Jul", value: "PLACED" },
  { name: "Packed", destination: "by Mo, 12 Jul", value: "CONFIRMED" },
  { name: "Shipped", destination: "by 13 Jul - 18 Jul", value: "SHIPPED" },
  { name: "Arriving", destination: "by 14 Jul - 18 Jul", value: "ARRIVING" },
  { name: "Arrived", destination: "by 14 Jul - 18 Jul", value: "DELIVERED" },
];

const canceledStep = [
  { name: "Order Placed", destination: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Order Canceled", destination: "on Thu, 11 Jul", value: "CANCELLED" },
];

const currentStep = 3;

const OrderStepper = ({ orderStatus}: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <>
    <Box className="w-full px-4 py-10">
      <div className="flex items-center justify-between">
        {statusStep.map((step, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
              ${index <= currentStep ? "bg-gray-200 text-[#004e98]" : "bg-gray-300 text-gray-600"}`}>
              {step.value === orderStatus ? (
                <CheckCircle />
              ) : (
                <FiberManualRecordIcon />
              )}
            </div>

            {/* Line */}
            {index < statusStep.length - 1 && (
              <div
                className={`absolute top-4 left-1 w-full h-[2px] 
                ${index < currentStep ? "bg-[#004e98]" : "bg-gray-300"}`}
                style={{ transform: "translateX(50%)" }}></div>
            )}

            {/* Text */}
            <div className="mt-3 text-center">
              <p className="text-sm font-medium">{step.name}</p>
              <p
                className={`${step.value === orderStatus ? "text-gray-200" : "text-gray-500"} text-xs`}>
                {step.destination}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Box>
    </>
  );
};

export default OrderStepper;
