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
import TextField from "@mui/material/TextField";

// interface
interface filterPriceOptionProps {
  id: number;
  label: string;
  range: [number, number];
}

interface FilterPriceProps {
  filteredPrice: [number, number];
  changeFilteredPrice: (newFilteredPrice: [number, number]) => void;
}

// variable
const minDistance = 10;

const filterPriceOptions: filterPriceOptionProps[] = [
  { id: 0, label: "All Price", range: [0, 1000000] },
  { id: 1, label: "Under $100", range: [0, 100] },
  { id: 2, label: "$100 to $500", range: [100, 500] },
  { id: 3, label: "$500 to $1000", range: [500, 1000] },
  { id: 4, label: "Over $1000", range: [1000, 1000000] },
];

// EXPORT DEFAULT
export default function FilterPrice({
  filteredPrice,
  changeFilteredPrice,
}: FilterPriceProps) {
  // -------------------------- STATE --------------------------
  const [priceRange, setPriceRange] = useState<number[]>([200, 800]);

  // -------------------------- FUNCTION --------------------------
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
    const arr = event.target.value.split(",");
    const filterPriceArr = [parseInt(arr[0]), parseInt(arr[1])] as [
      number,
      number
    ];
    changeFilteredPrice(filterPriceArr);
  };

  const compareRange = (
    optionRange: [number, number],
    priceRange: [number, number]
  ) => {
    return optionRange[0] === priceRange[0] && optionRange[1] === priceRange[1];
  };

  // -------------------------- MAIN --------------------------
  return (
    <Stack direction="column" spacing={2}>
      <Typography fontWeight={600}>PRICE RANGE</Typography>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={priceRange}
        onChange={handleChangeSlider}
        valueLabelDisplay="auto"
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
          size="small"
          inputProps={{ sx: { fontSize: 10 } }}
          InputLabelProps={{ sx: { fontSize: 10 } }}
        />
        <TextField
          id="max-input-field"
          label="Max"
          variant="outlined"
          maxRows={1}
          size="small"
          inputProps={{ sx: { fontSize: 10 } }}
          InputLabelProps={{ sx: { fontSize: 10 } }}
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
              value={option.range}
              control={
                <Radio
                  size="small"
                  checked={compareRange(option.range, filteredPrice)}
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
