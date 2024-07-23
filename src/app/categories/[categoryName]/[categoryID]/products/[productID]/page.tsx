"use client";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import NextLink from "next/link";

// internal
import {
  getProductDetailApi,
  getProductReviewsApi,
  getProductReviewSummaryApi,
  getProductsExcludeApi,
} from "@/api";
import { getCategoryRoute } from "@/redux/features/categories-slice";
import { ProductData, ReviewData, ReviewSummaryData } from "@/interface";
import { useFetchHook } from "@/custom-hooks/use-fetch-hook";

// mui
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import ImageSection from "@/web-pages/product-detail-page/images-section";
import MainInfoSection from "@/web-pages/product-detail-page/main-info-section";
import MoreDetailSection from "@/web-pages/product-detail-page/more-detail-section";
import SectionHeader from "@/components/section-header/section-header.component";
import ProductList from "@/components/product-list/product-list.component";

// EXPORT DEFAULT
export default function ProductDetail() {
  // -------------------------- VAR --------------------------
  const params = useParams<{
    categoryName: string;
    categoryID: string;
    productID: string;
  }>();

  const pathName = usePathname();

  const productId = parseInt(params.productID);

  const productApi = getProductDetailApi(productId);

  const [product, fetchApiProduct, abortControllerProduct, isLoading, error] =
    useFetchHook<ProductData>();

  const [reviews, fetchApiReview, abortControllerReview] =
    useFetchHook<ReviewData[]>();

  const [reviewSummary, fetchApiReviewSummary, abortControllerReviewSummary] =
    useFetchHook<ReviewSummaryData>();

  // -------------------------- EFFECT --------------------------
  // Fetch product detail
  useEffect(() => {
    fetchApiProduct(productApi);
    // Clean up
    return () => {
      abortControllerProduct.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productApi]);

  // Fetch product reviews
  useEffect(() => {
    if (product && product.rateTotal > 0) {
      fetchApiReview(getProductReviewsApi(productId));
      return () => {
        abortControllerReview.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.rateTotal]);

  // Fetch product review summary
  useEffect(() => {
    if (product && product.rateTotal > 0) {
      fetchApiReviewSummary(getProductReviewSummaryApi(productId));
      return () => {
        abortControllerReviewSummary.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.rateTotal]);

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;
  if (error)
    return (
      <LoadingFallback message="Error occurred while fetching product detail." />
    );
  if (!product) return <LoadingFallback message="No Product Found." />;
  return (
    <Container sx={{ mb: 10 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 5 }}>
        <Link underline="hover" color="inherit" component={NextLink} href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={NextLink}
          href={getCategoryRoute(
            params.categoryName,
            parseInt(params.categoryID)
          )}
        >
          {product?.categoryDto.name}
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          aria-current="page"
          component={NextLink}
          href={`${pathName}`}
        >
          {product.name}
        </Link>
      </Breadcrumbs>
      <Grid container spacing={5} mt={1} mb={5}>
        <Grid item xs={12} md={7}>
          <ImageSection
            mainImage={product.imagePath}
            otherImages={product.imagesPath}
            name={product.name}
          />
        </Grid>
        <Grid item md={5}>
          <MainInfoSection product={product} />
        </Grid>
      </Grid>
      <MoreDetailSection
        description={product.description}
        reviews={reviews}
        reviewSummary={reviewSummary}
      />
      <SectionHeader smallHeader="Related Products" mt={7} noButton />
      <ProductList
        api={getProductsExcludeApi(
          product.categoryDto.categoryId,
          product.productId
        )}
        isInCategory
        height={240}
      />
    </Container>
  );
}
