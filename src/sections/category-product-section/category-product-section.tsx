"use client";
import { Fragment, useState } from "react";

// internal
import { getProductsByCategoryApi } from "../../api";

// mui
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

// component
import ProductList from "@/components/product-list/product-list.component";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSortValue, SortType } from "@/redux/features/filter-slice";
import { FormLabel, InputLabel } from "@mui/material";

interface CategoryProductSectionProps {
  categoryId: number;
}

export default function CategoryProductSection({
  categoryId,
}: CategoryProductSectionProps) {
  // -------------------------- STATE --------------------------
  const [searchQuery, setSearchQuery] = useState("");

  // -------------------------- FUNCTION --------------------------
  const filterPriceRange = useAppSelector(
    (state) => state.filter.filterPriceRange
  );

  const totalFilteredProducts = useAppSelector(
    (state) => state.filter.totalFilteredProducts
  );

  const sortValue = useAppSelector((state) => state.filter.sortValue);

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortValue(event.target.value as SortType));
  };

  // -------------------------- MAIN --------------------------
  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          sx={{
            flex: 1,
            pl: 2,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "primary.dark",
          }}
          maxWidth={300}
        >
          <Input
            type="text"
            placeholder="Search products..."
            disableUnderline
            sx={{
              flex: 1,
              fontSize: 12,
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton color="primary" onClick={() => {}}>
            <SearchIcon />
          </IconButton>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-label">Sort By</InputLabel> */}
          <Select
            // labelId="demo-simple-select-label"
            // label="Sort by"
            value={sortValue}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiSelect-select": {
                paddingLeft: 2,
                paddingTop: 1,
                paddingBottom: 1,
              },
            }}
          >
            <MenuItem value="default">
              <em>Default</em>
            </MenuItem>
            <MenuItem value="lowest">Lowest Price</MenuItem>
            <MenuItem value="highest">Highest Price</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* <Stack direction="row" bgcolor="primary.light">
        {totalFilteredProducts} Result Found
      </Stack> */}
      <ProductList
        api={getProductsByCategoryApi(categoryId)}
        filterPriceRange={filterPriceRange}
        sortValue={sortValue}
        searchQuery={searchQuery}
        isInCategory
      />
    </Fragment>
  );
}