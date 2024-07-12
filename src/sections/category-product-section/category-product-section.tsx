"use client";
import { Fragment } from "react";

// internal
import { getProductsByCategoryApi } from "../../api";

// mui
import Stack from "@mui/material/Stack";

// component
import ProductList from "@/components/product-list/product-list.component";
import { useAppSelector } from "@/redux/hooks";

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

  // -------------------------- MAIN --------------------------
  return (
    <Fragment>
      <Stack direction="row" bgcolor="primary.light">
        {totalFilteredProducts} Result Found
      </Stack>
      <ProductList
        api={getProductsByCategoryApi(categoryId)}
        filterPriceRange={filterPriceRange}
        isInCategory
      />
    </Fragment>
  );
}
