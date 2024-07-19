"use client";
import { useEffect } from "react";

// internal
import { useAppDispatch } from "@/redux/hooks";
import { fetchCategories } from "@/redux/features/categories-slice";
import { fetchBanners } from "@/redux/features/banners-slice";
import { fetchBrands } from "@/redux/features/brands-slice";
import { bestSellingApi, newArrivalApi } from "@/api";

// mui
import Container from "@mui/material/Container";

// component
import CustomImage from "@/components/custom-image/custom-image.component";
import CategoryAndBannerSection from "@/web-pages/home-page/category-and-banner-section";
import BestSellingSection from "@/web-pages/home-page/best-selling-section";
import BrowseCategorySection from "@/web-pages/home-page/browse-category-section";
import NewArrivalSection from "@/web-pages/home-page/new-arrival-section";
import InfoSection from "@/web-pages/home-page/info-section";
// import { fetchProducts } from "@/redux/features/products-slice";

export default function Home() {
  // -------------------------- VAR --------------------------
  const dispatch = useAppDispatch();

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBanners());
    dispatch(fetchBrands());
    // dispatch(fetchProducts(bestSellingApi));
    // dispatch(fetchProducts(newArrivalApi));
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Container>
      <CategoryAndBannerSection />
      <BestSellingSection
        smallHeader="This Month"
        largeHeader="Best Selling"
        api={bestSellingApi}
      />
      <CustomImage src="/banner-2.jpg" alt="banner" height={450} mt={60} />
      <NewArrivalSection
        smallHeader="Our Products"
        largeHeader="New Arrival"
        api={newArrivalApi}
      />
      <BrowseCategorySection
        smallHeader="Categories"
        largeHeader="Browse By Category"
      />
      <CustomImage src="/banner-1.jpg" alt="banner" height={380} mt={64} />
      <InfoSection />
    </Container>
  );
}
