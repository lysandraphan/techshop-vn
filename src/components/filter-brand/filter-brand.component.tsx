"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { BrandData, fetchBrands } from "@/redux/features/brands-slice";
import LoadingFallback from "../loading-fallback/loading-fallback.component";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FilterBrand() {
  // -------------------------- STATE --------------------------
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // -------------------------- VAR --------------------------
  const isLoading = useAppSelector((state) => state.brands.isLoading);
  const brands = useAppSelector((state) => state.brands.brands);

  // -------------------------- FUNCTION --------------------------
  const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isSelected = event.target.checked;
    let selectedBrandName = event.target.value;

    if (isSelected) {
      setSelectedBrands([...selectedBrands, selectedBrandName]);
    } else {
      setSelectedBrands((prevState) =>
        prevState.filter((brandName) => brandName !== selectedBrandName)
      );
    }
  };

  const displayAllBrands = () => {};

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;
  return (
    <Stack direction="column" spacing={2}>
      <Typography fontWeight={600} sx={{ wordSpacing: 3 }}>
        OUR BRANDS
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        size="small"
        sx={{ fontSize: 10, py: 0.5, wordSpacing: 3 }}
        onClick={displayAllBrands}
      >
        All Brands
      </Button>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup row>
          {brands &&
            brands.map((brand: BrandData) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand.name)}
                    onChange={checkBoxHandler}
                    name={brand.name}
                    value={brand.name}
                    sx={{
                      pl: 1.5,
                      pr: 0.5,
                      py: 1,
                      "& .MuiSvgIcon-root": {
                        fontSize: 12,
                      },
                    }}
                  />
                }
                label={
                  <Typography fontSize={12} mr={0.1}>
                    {brand.name}
                  </Typography>
                }
              />
            ))}
        </FormGroup>
      </FormControl>
    </Stack>
  );
}
