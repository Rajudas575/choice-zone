import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { colors } from "../../../data/filter/colors";
import { price } from "../../../data/filter/price";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);

  const handleExpendColor = () => setExpendColor(!expendColor);
  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>

        <Button className="text-blue-600">Clear all</Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6 mt-5">
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: blue[600],
              }}>
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group">
              {colors
                .slice(0, expendColor ? colors.length : 5)
                .map((item: any) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <div>
            <Button onClick={handleExpendColor}>
              {expendColor ? "hide" : `+ ${colors.length - 5} more`}
            </Button>
          </div>
          <Divider />
        </section>

        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: blue[600],
              }}>
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group">
              {price.map((item: any) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Divider />
        </section>

        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: blue[600],
              }}>
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group">
              {price.map((item: any) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
