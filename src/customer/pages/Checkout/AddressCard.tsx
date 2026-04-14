import { Radio } from "@mui/material";
import React from "react";

const AddressCard = ({ value, selectedValue, handleChange, item }: any) => {
  return (
    <div className="p-5 border border-gray-300 rounded-md flex">
      <div>
        <Radio
          checked={selectedValue == value}
          value={value}
          onChange={handleChange}
          name="radio-buttons"
        />
      </div>

      <div className="space-y-3 pt-3">
        <h1>{"Raju Das"}</h1>
        <p>{"15, Nilgunj Road, Panihati, Kolkata-114, W.B-India"}</p>
        <p>
          <strong>Mobile:</strong> 9874589658
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
