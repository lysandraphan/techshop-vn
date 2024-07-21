"use client";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import NextLink from "next/link";

// internal
import {
  getProductDetailApi,
  getProductReviewsApi,
  getProductReviewSummaryApi,
  getProductsByCategoryApi,
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

  const mockProduct = {
    productId: 89,
    name: "Fujifilm X-S20 Mirrorless Digital Camera XC15-45mm Lens Kit Black",
    quantity: 10,
    description:
      "X-S20 offers the perfect blend of power and portability to turn thoughts and ideas into reality. Weighing just 491g (1.08 lb), with a deep handgrip that ensures a confident, comfortable hold with even the most sizable lens attached. X-S20 delivers stunning 26.1 megproductApixel images straight out of camera using Fujifilm's acclaimed color science, at up to 20fps in electronic shutter mode. Its 180° Vari-Angle LCD touchscreen makes selfie-style shots or wild angles a snap and intuitive layout enables creatives of any level to create as soon as their hands touch the camera.\r\nX-S20 combines powerful sensor and processor technologies to deliver a blistering performance for stills and video—allowing you to capture the moment any way you need. For the first time in an X-S series model, the X-Trans CMOS 4 sensor is paired with the X-Processor 5 imaging engine, resulting in high-speed image and video processing alongside improved autofocus speed and accuracy. A new AF algorithm offers the same subject detection functionality as the range-topping X-H2S so you can move as fast as the world around you. X-S20 also features Auto Subject Detection AF, perfect for hassle-free creativity.\r\nThoughtful ergonomics and cutting-edge technology make camera shake and blurry imagery a distant memory with X-S20. The camera's large handgrip makes for a secure hold. At the same time, five-axis in-body image stabilization (IBIS) has been improved, offering up to seven stops of compensation, ensuring that handheld videography and low-light image-making are nothing to fear. The X-S20 represents a one-stop gain over the previous IBIS system found in the X-S10.\r\nAs well as being a competent stills machine, X-S20 excels at video creation – whether vlogging, live streaming, or making full-length features. The new Vlog mode puts professional-quality footage in easy reach, enabling users to focus on products while unboxing or defocus cluttered backgrounds with a tap. A 3.5mm jack makes it effortless to connect accessories, including the optional TG-BT1 grip can be added for hands-free wireless operation. Stream 4K/60P footage directly from USB-C*, or internally record up to 6.2K/30p video in 4:2:2 10-bit color when story calls for it.\r\n",
    price: 1399,
    ratingScore: 4.5,
    rateTotal: 2,
    categoryDto: {
      categoryId: 10,
      name: "Digital Cameras",
      imagePath:
        "http://res.cloudinary.com/dxw7fyej4/image/upload/v1719930595/achmlnjbqcgofdkrhjab.png",
      deletedAt: null,
      quantityProduct: null,
    },
    brand: {
      id: 14,
      name: "Fujifilm",
    },
    createdAt: "2024-07-15T19:59:17.000+00:00",
    deletedAt: null,
    inWishList: false,
    imagePath:
      "http://res.cloudinary.com/dxw7fyej4/image/upload/v1721048514/vwxe4ejockzduqqg5sh7.jpg",
    imagesPath: [
      "http://res.cloudinary.com/dxw7fyej4/image/upload/v1721048606/z6wr8szej6c513wlg1xi.jpg",
      "http://res.cloudinary.com/dxw7fyej4/image/upload/v1721048642/l34nyjyeitk3ksbectat.jpg",
      "http://res.cloudinary.com/dxw7fyej4/image/upload/v1721048686/k3ajxtuvruuojxpvnuka.jpg",
      "http://res.cloudinary.com/dxw7fyej4/image/upload/v1721048733/xvdlave4z7ywn7inz2cc.jpg",
    ],
  };

  // -------------------------- EFFECT --------------------------
  // useEffect(() => {
  //   setProduct(mockProduct as ProductData);
  // }, []);

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
        <Grid item md={7}>
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
        api={getProductsByCategoryApi(product.categoryDto.categoryId, 4)}
        isInCategory
        height={240}
      />
    </Container>
  );
}
