import { Fragment } from "react";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// internal
import { useAppSelector } from "@/redux/hooks";
import {
  CategoryData,
  getCategoryRoute,
} from "@/redux/features/categories-slice";

// mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// component
import SectionHeader from "@/components/section-header/section-header.component";
import CustomImage from "@/components/custom-image/custom-image.component";

// variable
const carouselResponsive = {
  lg: {
    breakpoint: { max: 4000, min: 1200 },
    items: 5,
  },
  md: {
    breakpoint: { max: 1200, min: 900 },
    items: 4,
  },
  sm: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
  },
  xs: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

// EXPORT DEFAULT
export default function BrowseCategorySection({
  smallHeader,
  largeHeader,
}: {
  smallHeader: string;
  largeHeader: string;
}) {
  // -------------------------- VAR --------------------------
  const categories = useAppSelector((state) => state.categories.categories);

  const router = useRouter();

  // -------------------------- MAIN --------------------------
  return (
    <Fragment>
      <SectionHeader smallHeader={smallHeader} largeHeader={largeHeader} />
      <div style={{ marginTop: 50 }}>
        <Carousel
          responsive={carouselResponsive}
          showDots={false}
          infinite={true}
          autoPlay={true}
          centerMode={true}
          containerClass="carousel-container"
          itemClass="carouselItem"
        >
          {categories &&
            categories.map((category: CategoryData) => (
              <Stack
                key={category.categoryId}
                alignItems="center"
                spacing={1}
                onClick={() =>
                  router.push(
                    getCategoryRoute(category.name, category.categoryId)
                  )
                }
                sx={{ cursor: "pointer" }}
              >
                <CustomImage
                  src={category.imagePath}
                  alt="banner"
                  width="70%"
                  height={130}
                />
                <Typography textAlign="center">{category.name}</Typography>
              </Stack>
            ))}
        </Carousel>
      </div>
    </Fragment>
  );
}
