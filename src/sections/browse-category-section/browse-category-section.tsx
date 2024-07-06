import { Fragment } from "react";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";

// internal
import { CategoryData } from "@/interface";

// mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// component
import SectionHeader from "@/components/section-header/section-header.component";
import CustomImage from "@/components/custom-image/custom-image.component";

// variable
const carouselResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export default function BrowseCategorySection({
  categories,
  smallHeader,
  largeHeader,
}: {
  categories: CategoryData[];
  smallHeader: string;
  largeHeader: string;
}) {
  // -------------------------- VAR --------------------------
  const history = useRouter();

  // -------------------------- FUNCTION --------------------------
  const getCategoryRoute = (categoryName: string) => {
    return categoryName.toLocaleLowerCase().replace(/ /g, "-");
  };

  return (
    <Fragment>
      <SectionHeader smallHeader={smallHeader} largeHeader={largeHeader} />
      <div style={{ marginTop: 40 }}>
        <Carousel
          responsive={carouselResponsive}
          showDots={false}
          infinite={true}
          autoPlay={true}
          centerMode={true}
          containerClass="carousel-container"
          itemClass="carouselItem"
        >
          {categories.map((category) => (
            <Stack
              key={category.categoryId}
              alignItems="center"
              spacing={1}
              onClick={() =>
                history.push(`/categories/${getCategoryRoute(category.name)}`)
              }
              sx={{ cursor: "pointer" }}
            >
              <CustomImage
                src={category.imagePath}
                alt="banner"
                height={200}
              />
              <Typography>{category.name}</Typography>
            </Stack>
          ))}
        </Carousel>
      </div>
    </Fragment>
  );
}
