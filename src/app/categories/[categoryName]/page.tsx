"use client";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

// internal
import { useAppSelector } from "@/redux/hooks";
import {
  getCategoryRoute,
  selectCategory,
} from "@/redux/features/categories-slice";

// mui
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";

// component
import ProductList from "@/components/product-list/product-list.component";
import FilterSection from "@/sections/filter-section/filter-section.component";

export default function Categories() {

  const searchParams = useSearchParams();
  const categoryId = parseInt(searchParams.get("id") as string);
  const category = useAppSelector((state) => selectCategory(state, categoryId));
  
  let pageNumber = 1;
  const url = `https://g5-likelion-ecommerce.onrender.com/product/public/${category?.categoryId}/paginate?page=${pageNumber}&pageSize=10&accountId=-1`;

  // http://localhost:3000/categories/digital-cameras?id=10

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
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
          <FilterSection categoryId={categoryId} />
        </Grid>
        <Grid item md={10}>
          <ProductList url={url} isInCategory />
        </Grid>
      </Grid>
    </Container>
  );
}
