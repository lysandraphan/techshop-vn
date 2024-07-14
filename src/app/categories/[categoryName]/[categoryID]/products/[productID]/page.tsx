"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import axios from "axios";

// internal
import { ProductData } from "@/components/product-list/product-list.component";
import { getProductDetailApi } from "@/api";
import { useParams, usePathname, useRouter } from "next/navigation";

// mui
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import { getCategoryRoute } from "@/redux/features/categories-slice";
import CustomImage from "@/components/custom-image/custom-image.component";

// EXPORT DEFAULT
export default function ProductDetail() {
  // -------------------------- STATE --------------------------
  const [product, setProduct] = useState<ProductData>();
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const params = useParams<{
    categoryName: string;
    categoryID: string;
    productID: string;
  }>();
  const productId = parseInt(params.productID);

  const api = getProductDetailApi(productId);

  const router = useRouter();
  const pathName = usePathname();

  // -------------------------- FUNCTION --------------------------
  const fetchProductDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(api);
      const result = response.data as ProductData;
      console.log(result);
      setProduct(result);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    fetchProductDetail();
  }, []);

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;
  return (
    <Container>
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
          {product.categoryDto.name}
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
        <Grid item md={6}>
          <CustomImage
            src={product.imagePath}
            alt={product.name}
            height={350}
            mt={50}
          />
          {product.imagesPath &&
            product.imagesPath.map((image, index) => (
              <CustomImage
                key={index}
                src={image}
                alt={product.name}
                height={150}
              />
            ))}
        </Grid>
        <Grid item md={6}>
          Product Detail Section
        </Grid>
      </Grid>
    </Container>
  );
}
