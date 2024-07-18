"use client";
import { Fragment, useEffect, useState } from "react";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSortProductOrder,
  SortProductType,
} from "@/redux/features/sort-slice";
import { getProductsByCategoryApi } from "@/api";

// mui
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// component
import ProductList from "@/components/product-list/product-list.component";
import SearchBar from "@/components/search-bar/search-bar";

// interface
interface CategoryProductSectionProps {
  categoryId: number;
}

// EXPORT DEFAULT
export default function CategoryProductSection({
  categoryId,
}: CategoryProductSectionProps) {
  // -------------------------- STATE --------------------------
  const [searchQuery, setSearchQuery] = useState("");

  // -------------------------- VAR --------------------------
  const filterPriceRange = useAppSelector(
    (state) => state.filter.filterPriceRange
  );
  const selectedBrandIds = useAppSelector(
    (state) => state.brands.selectedBrandIds
  );

  const sortProductOrder = useAppSelector(
    (state) => state.sort.sortProductOrder
  );

  const dispatch = useAppDispatch();

  const fzSX = { fontSize: 12 };

  // -------------------------- FUNCTION --------------------------
  const selectSortHandler = (event: SelectChangeEvent) => {
    dispatch(setSortProductOrder(event.target.value as SortProductType));
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(setSortProductOrder("default"));
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <SearchBar
          setSearchQuery={setSearchQuery}
          placeholder="Search products..."
          maxWidth={300}
        />
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <Select
            value={sortProductOrder}
            onChange={selectSortHandler}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              fontSize: 12,
              color: "primary.dark",
              "& .MuiSelect-select": {
                pl: 2,
                py: 1.5,
              },
            }}
          >
            <MenuItem value="default" disabled sx={fzSX}>
              Sort by
            </MenuItem>
            <MenuItem value="lowest" sx={fzSX}>
              Price: Low to High
            </MenuItem>
            <MenuItem value="highest" sx={fzSX}>
              Price: High to Low
            </MenuItem>
            <MenuItem value="top" sx={fzSX}>
              Top Rated
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* <Stack direction="row" bgcolor="primary.light">
        {totalFilteredProducts} Result Found
      </Stack> */}
      <ProductList
        api={getProductsByCategoryApi(categoryId)}
        filterPriceRange={filterPriceRange}
        selectedBrandIds={selectedBrandIds}
        sortProductOrder={sortProductOrder}
        searchQuery={searchQuery}
        isInCategory
      />
    </Fragment>
  );
}
