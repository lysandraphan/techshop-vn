"use client";
import NextLink from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCategoryRoute,
  selectCategory,
} from "@/redux/features/categories-slice";
import { setFilterCategory } from "@/redux/features/filter-slice";

// mui
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// component
import ProductList from "@/components/product-list/product-list.component";
import FilterSection from "@/sections/filter-section/filter-section.component";

// EXPORT DEFAULT
export default function Categories() {
  // -------------------------- VAR --------------------------
  const searchParams = useSearchParams();

  const categoryId = parseInt(searchParams.get("id") as string);

  const category = useAppSelector((state: any) =>
    selectCategory(state, categoryId)
  );

  const filterPriceRange = useAppSelector(
    (state) => state.filter.filterPriceRange
  );

  let pageNumber = 1;

  const api = `https://g5-likelion-ecommerce.onrender.com/product/public/${categoryId}/paginate?page=${pageNumber}&pageSize=10&accountId=-1`;

  const dispatch = useAppDispatch();

  // -------------------------- EFFECT -------------------------
  useEffect(() => {
    dispatch(setFilterCategory([categoryId, category.name]));
  }, []);

  // -------------------------- MAIN --------------------------
  if (!category)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 5 }}>
        <Link underline="hover" color="inherit" href="/" component={NextLink}>
          Home
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href={
            category
              ? `/categories/${getCategoryRoute(category.name)}?id=${
                  category.categoryId
                }`
              : ""
          }
          aria-current="page"
          component={NextLink}
        >
          {category?.name}
        </Link>
      </Breadcrumbs>
      <Grid container spacing={5} mt={1}>
        <Grid item md={2}>
          <FilterSection />
        </Grid>
        <Grid item md={10}>
          <ProductList
            api={api}
            filterPriceRange={filterPriceRange}
            isInCategory
          />
        </Grid>
      </Grid>
    </Container>
  );
}
