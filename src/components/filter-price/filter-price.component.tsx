"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilterPriceRange } from "@/redux/features/filter-slice";

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

// variable
const minDistance = 10;

const filterPriceOptions: filterPriceOptionProps[] = [
  { id: 0, label: "All Price", range: [0, 100000] },
  { id: 1, label: "Under $100", range: [0, 100] },
  { id: 2, label: "$100 to $500", range: [100, 500] },
  { id: 3, label: "$500 to $1000", range: [500, 1000] },
  { id: 4, label: "Over $1000", range: [1000, 100000] },
];

// EXPORT DEFAULT
export default function FilterPrice() {
  // -------------------------- VAR --------------------------
  const filterPriceRange = useAppSelector(
    (state) => state.filter.filterPriceRange
  );

  const dispatch = useAppDispatch();

  // -------------------------- STATE --------------------------
  const [priceRange, setPriceRange] = useState<number[]>([200, 800]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

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

  const notify = (message: string) => toast.error(message);

  const clearPriceTextFields = () => {
    setMin("");
    setMax("");
  };

  // Filter price using Text Fields
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const inputValue = parseInt(event.target.value);

      if (isNaN(inputValue) || min === "" || max === "") {
        notify("Please enter valid Min and Max numbers.");
        clearPriceTextFields();
        return;
      }

      const minPrice = parseInt(min);
      const maxPrice = parseInt(max);

      if (minPrice > maxPrice) {
        notify("Min must be smaller or equal to max.");
        clearPriceTextFields();

        return;
      }
      dispatch(setFilterPriceRange([minPrice, maxPrice]));
    }
  };

  // Filter price using Radio Button Group
  const handleChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arr = event.target.value.split(",");

    const minPrice = parseInt(arr[0]);
    const maxPrice = parseInt(arr[1]);

    dispatch(setFilterPriceRange([minPrice, maxPrice]));
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
      <ToastContainer />
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
          value={min}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMin(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <TextField
          id="max-input-field"
          label="Max"
          variant="outlined"
          maxRows={1}
          size="small"
          inputProps={{ sx: { fontSize: 10 } }}
          InputLabelProps={{ sx: { fontSize: 10 } }}
          value={max}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMax(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </Stack>
      <FormControl>
        <RadioGroup
          aria-labelledby="price-radio-buttons-group"
          name="price-radio-buttons-group"
          onChange={handleChangeRadioBtn}
        >
          {filterPriceOptions.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.range}
              control={
                <Radio
                  size="small"
                  checked={compareRange(option.range, filterPriceRange)}
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
