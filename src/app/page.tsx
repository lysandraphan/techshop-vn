"use client";
import { useEffect } from "react";

// internal
import { useAppDispatch } from "@/redux/hooks";
import { fetchCategories } from "@/redux/features/categories-slice";
import { fetchBanners } from "@/redux/features/banners-slice";
import { fetchBrands } from "@/redux/features/brands-slice";
import { bestSellingApi, newArrivalApi } from "@/api";

// style
import "./page.module.css";
import "react-multi-carousel/lib/styles.css";

// mui
import Container from "@mui/material/Container";

// component
import CustomImage from "@/components/custom-image/custom-image.component";
import CategoryAndBannerSection from "@/sections/category-and-banner-section/category-and-banner-section";
import BestSellingSection from "@/sections/best-selling-section/best-selling-section";
import BrowseCategorySection from "@/sections/browse-category-section/browse-category-section";
import NewArrivalSection from "@/sections/new-arrival-section/new-arrival-section";
import InfoSection from "@/sections/info-section/info-section";
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
      <CustomImage src="/banner-2.jpg" alt="banner" height={450} mt={50} />
      <NewArrivalSection
        smallHeader="Our Products"
        largeHeader="New Arrival"
        api={newArrivalApi}
      />
      <BrowseCategorySection
        smallHeader="Categories"
        largeHeader="Browse By Category"
      />
      <CustomImage src="/banner-3.jpg" alt="banner" height={450} mt={50} />
      <InfoSection />
    </Container>
  );
}
