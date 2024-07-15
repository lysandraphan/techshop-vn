"use client";
import { Fragment, useState } from "react";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSortValue, SortType } from "@/redux/features/filter-slice";
import { getProductsByCategoryApi } from "@/api";

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

  const sortValue = useAppSelector((state) => state.filter.sortValue);

  const dispatch = useAppDispatch();

  const fzSX = { fontSize: 12 };

  // -------------------------- FUNCTION --------------------------
  const selectSortHandler = (event: SelectChangeEvent) => {
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
            border: "1px solid #c4c4c4",
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
          <IconButton sx={{ color: "#757575" }} onClick={() => {}}>
            <SearchIcon />
          </IconButton>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <Select
            value={sortValue}
            onChange={selectSortHandler}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              fontSize: 12,
              color: "#A3A3A3",
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
            <MenuItem value="best" sx={fzSX}>
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
        sortValue={sortValue}
        searchQuery={searchQuery}
        isInCategory
      />
    </Fragment>
  );
}
