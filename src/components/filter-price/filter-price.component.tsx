"use client";
import { useState } from "react";

// mui
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

const minDistance = 10;

const filterPriceOptions = [
  { id: 0, min: 0, max: 5000, label: "All Price" },
  { id: 1, min: 0, max: 100, label: "Under $100" },
  { id: 2, min: 100, max: 500, label: "$100 to $500" },
  { id: 3, min: 500, max: 1000, label: "$500 to $1000" },
  { id: 4, min: 1000, max: 5000, label: "Over $1000" },
];

function valuetext(value: number) {
  return `$${value}`;
}

export default function FilterPrice() {
  const [priceRange, setPriceRange] = useState<number[]>([200, 800]);
  const [filteredPrice, setFilteredPrice] = useState(0);

  const handleChangeSlider = (
    event: Event,
    newPriceRange: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newPriceRange)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newPriceRange[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newPriceRange[1], priceRange[0] + minDistance),
      ]);
    }
  };

  const handleChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredPrice(parseInt(event.target.value));
  };

  return (
    <Stack direction="column" spacing={3}>
      <Typography fontWeight={600}>PRICE RANGE</Typography>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={priceRange}
        onChange={handleChangeSlider}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        color="secondary"
        min={0}
        max={1000}
        step={50}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          id="min-input-field"
          label="Min"
          variant="outlined"
          maxRows={1}
        />
        <TextField
          id="max-input-field"
          label="Max"
          variant="outlined"
          maxRows={1}
        />
      </Stack>
      <FormControl>
        <RadioGroup
          aria-labelledby="price-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value=""
          onChange={handleChangeRadioBtn}
        >
          {filterPriceOptions.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={
                <Radio
                  size="small"
                  checked={option.id === filteredPrice}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 12,
                    },
                  }}
                />
              }
              label={<Typography fontSize={12}>{option.label}</Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
