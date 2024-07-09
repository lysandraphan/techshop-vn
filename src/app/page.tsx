"use client";
import { useEffect, useState } from "react";

// internal
import { useAppDispatch } from "@/redux/hooks";
import { fetchCategories } from "@/redux/features/categories-slice";
import { fetchBanners } from "@/redux/features/banners-slice";

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

export default function Home() {
  // -------------------------- VAR --------------------------
  const bestSellingUrl =
    "https://g5-likelion-ecommerce.onrender.com/product/public/best-selling";

  const newArrivalUrl =
    "https://g5-likelion-ecommerce.onrender.com/product/public/new-arrival";

  const dispatch = useAppDispatch();

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchBanners())
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Container>
      <CategoryAndBannerSection />
      <BestSellingSection
        smallHeader="This Month"
        largeHeader="Best Selling Products"
        url={bestSellingUrl}
      />
      <CustomImage src="/banner-2.jpg" alt="banner" height={450} mt={50} />
      <NewArrivalSection
        smallHeader="Our Products"
        largeHeader="New Arrival"
        url={newArrivalUrl}
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
