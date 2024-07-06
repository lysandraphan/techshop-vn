"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// style
import "./page.module.css";
import "react-multi-carousel/lib/styles.css";

import { BannerData, CategoryData } from "@/interface";

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
  // -------------------------- STATE --------------------------
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const categoriesUrl =
    "https://g5-likelion-ecommerce.onrender.com/categories/public/all";

  const bannersUrl =
    "https://g5-likelion-ecommerce.onrender.com/banner-images/public/all";

  const bestSellingUrl =
    "https://g5-likelion-ecommerce.onrender.com/product/public/best-selling";

  const newArrivalUrl =
    "https://g5-likelion-ecommerce.onrender.com/product/public/new-arrival";

  // -------------------------- FUNCTION --------------------------
  async function getCategories() {
    try {
      setIsLoading(true);
      // const response = await axios.get<CategoryData[]>(categoriesUrl);
      const response = await fetch(`${categoriesUrl}`, {
        cache: "force-cache",
      });
      // const result = response.data;
      const result = (await response.json()) as CategoryData[];
      setCategories(result);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  }
  async function getBanners() {
    try {
      setIsLoading(true);
      // const response = await axios.get<CategoryData[]>(categoriesUrl);
      const response = await fetch(`${bannersUrl}`, {
        cache: "force-cache",
      });
      // const result = response.data;
      const result = (await response.json()) as BannerData[];
      setBanners(result);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  }

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    getCategories();
    getBanners();
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Container>
      <CategoryAndBannerSection categories={categories} banners={banners} />
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
        categories={categories}
      />
      <CustomImage
        src="/banner-3.jpg"
        alt="banner"
        height={450}
        mt={50}
      />
      <InfoSection />
    </Container>
  );
}
