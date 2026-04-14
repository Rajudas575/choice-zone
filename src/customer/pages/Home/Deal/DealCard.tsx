import React from "react";

const DealCard = ({ deal }: any) => {
  // console.log("DEAL--", deal);
  const handleShopeClick = () => {};
  return (
    <div onClick={() => handleShopeClick()} className="w-full cursor-pointer">
      <img
        className="border-x-[7px] border-t-[7px] border-blue-600 w-full h-[12rem] object-cover object-top"
        src={deal.image}
        alt=""
      />

      <div className="border-4 border-black bg-black text-white p-2">
        <p className="text-2xl font-bold">{deal.discount} %</p>
        <p className="font-bold">shop now</p>
      </div>
    </div>
  );
};

export default DealCard;
