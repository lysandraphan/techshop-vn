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

// component
import ProductList from "@/components/product-list/product-list.component";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSortValue, SortType } from "@/redux/features/filter-slice";

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
  const selectedBrandIds = useAppSelector(state => state.brands.selectedBrandIds)

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
          <Select
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
            <MenuItem value="default" disabled>
              Sort By
            </MenuItem>
            <MenuItem value="lowest">Lowest Price</MenuItem>
            <MenuItem value="highest">Highest Price</MenuItem>
            <MenuItem value="best">Best Seller</MenuItem>
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
        sortValue={sortValue}
        searchQuery={searchQuery}
        isInCategory
      />
    </Fragment>
  );
}
