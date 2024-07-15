"use client";
import NextLink from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

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
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// component
import CategoryProductSection from "@/web-pages/category-page/category-product-section";
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import FilterCategory from "@/web-pages/category-page/filter-category";
import FilterPrice from "@/web-pages/category-page/filter-price";
import FilterBrand from "@/web-pages/category-page/filter-brand";

// EXPORT DEFAULT
export default function Categories() {
  // -------------------------- VAR --------------------------
  const params = useParams<{ categoryName: string; categoryID: string }>();

  const categoryId = parseInt(params.categoryID);

  const category = useAppSelector((state: any) =>
    selectCategory(state, categoryId)
  );

  const dispatch = useAppDispatch();

  // -------------------------- EFFECT -------------------------
  useEffect(() => {
    dispatch(setFilterCategory([categoryId, category.name]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------- MAIN --------------------------
  if (!category) return <LoadingFallback />;
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
            category ? getCategoryRoute(category.name, category.categoryId) : ""
          }
          aria-current="page"
          component={NextLink}
        >
          {category?.name}
        </Link>
      </Breadcrumbs>
      <Grid container spacing={5} mt={1} mb={5}>
        {/*-------------------------- Filter Section --------------------------*/}
        <Grid item md={2}>
          <Stack
            direction="column"
            divider={
              <Divider
                flexItem
                sx={{ mt: 2, mb: 1, backgroundColor: "primary.light" }}
              />
            }
          >
            <FilterCategory />
            <FilterPrice />
            <FilterBrand />
          </Stack>
        </Grid>
        {/*-------------------------- ProductList Section --------------------------*/}
        <Grid item md={10}>
          <CategoryProductSection categoryId={categoryId} />
        </Grid>
      </Grid>
    </Container>
  );
}
