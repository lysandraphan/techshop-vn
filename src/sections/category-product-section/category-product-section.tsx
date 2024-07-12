"use client";
import { Fragment, useState } from "react";

// internal
import { getProductsByCategoryApi } from "../../api";

// mui
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  // -------------------------- VAR --------------------------

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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sortValue}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="default">
            <em>Default</em>
          </MenuItem>
          <MenuItem value="lowest">Lowest Price</MenuItem>
          <MenuItem value="highest">Highest Price</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row" bgcolor="primary.light">
        {totalFilteredProducts} Result Found
      </Stack>
      <ProductList
        api={getProductsByCategoryApi(categoryId)}
        filterPriceRange={filterPriceRange}
        sortValue={sortValue}
        isInCategory
      />
    </Fragment>
  );
}
