"use client";
// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BrandData } from "@/redux/features/brands-slice";
import {
  addSelectedBrandIds,
  filterSelectedBrandIds,
  resetSelectedBrandIds,
} from "@/redux/features/filter-slice";

// mui
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";

// EXPORT DEFAULT
export default function FilterBrand() {
  // -------------------------- VAR --------------------------
  const isLoading = useAppSelector((state) => state.brands.isLoading);

  const brands = useAppSelector((state) => state.brands.brands);

  const selectedBrandIds = useAppSelector(
    (state) => state.filter.selectedBrandIds
  );

  const isDisableFilter = useAppSelector(
    (state) => state.filter.isDisableFilter
  );

  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isSelected = event.target.checked;
    let selectedId = parseInt(event.target.value);

    if (isSelected) {
      dispatch(addSelectedBrandIds(selectedId));
    } else {
      dispatch(filterSelectedBrandIds(selectedId));
    }
  };

  const displayAllBrands = () => {
    dispatch(resetSelectedBrandIds());
  };

  // -------------------------- MAIN --------------------------
  // if (isLoading) return <LoadingFallback />;
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
        disabled={isDisableFilter}
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
                    checked={selectedBrandIds?.includes(brand.id)}
                    onChange={checkBoxHandler}
                    name={brand.name}
                    value={brand.id}
                    disabled={isDisableFilter}
                    sx={{
                      pl: 1.5,
                      pr: 0.5,
                      py: 1,
                      "& .MuiSvgIcon-root": {
                        fontSize: 14,
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
