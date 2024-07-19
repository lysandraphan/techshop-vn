"use client";
// internal
import { useRouter } from "next/navigation";
import { ProductData } from "@/interface";

//mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// component
import CustomImage from "../custom-image/custom-image.component";
import RatingInfo from "../rating-info/rating-info";

// interface
interface ProductCardProps {
  product: ProductData;
  isInCategory?: boolean;
  height?: number;
}

// function
export const displayPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// EXPORT DEFAULT
export default function ProductCard({
  product,
  isInCategory,
  height = 200,
}: ProductCardProps) {
  // -------------------------- VAR --------------------------
  const router = useRouter();

  const stackSX = {
    transition: "transform ease-in 0.1s",
    willChange: "transform",
    "&:hover": {
      cursor: "pointer",
      transform: "translateY(-5px)",
      borderWidth: "3px",
    },
  };

  // -------------------------- FUNCTION --------------------------
  const getProductRoute = () => {
    const categoryId = product.categoryDto.categoryId;
    const categoryName = product.categoryDto.name
      .toLocaleLowerCase()
      .replace(/ /g, "-");
    const productId = product.productId;
    const route = `/categories/${categoryName}/${categoryId}/products/${productId}`;
    return route;
  };

  // -------------------------- RENDER --------------------------
  // Render Product Card in Home Page (Best Selling, New Arrival)
  const renderProductCard = () => {
    return (
      <Stack
        spacing={1}
        sx={stackSX}
        px={2}
        pb={2}
        border="2px solid #FEDFDF"
        borderRadius={2}
        onClick={() => router.push(getProductRoute())}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          width="inherit"
          height={height}
        >
          <CustomImage
            src={product.imagePath}
            alt={product.name}
            width="70%"
            height="70%"
          />
        </Box>
        <Typography
          fontSize={16}
          fontWeight={500}
          sx={{
            letterSpacing: 0.5,
            wordSpacing: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        <Typography fontSize={16} color="secondary" fontWeight={500}>
          ${displayPrice(product.price)}
        </Typography>
        <RatingInfo
          ratingScore={product.ratingScore}
          ratingTotal={product.rateTotal}
        />
      </Stack>
    );
  };

  // Render Product Card in Category Page
  const renderProductCardInCategory = () => {
    return (
      <Stack
        spacing={1}
        sx={stackSX}
        px={2}
        pb={2}
        border="2px solid #E4E7E9"
        borderRadius={2}
        onClick={() => router.push(getProductRoute())}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          width="inherit"
          height={height}
        >
          <CustomImage
            src={product.imagePath}
            alt={product.name}
            width="60%"
            height="50%"
          />
        </Box>
        <RatingInfo
          ratingScore={product.ratingScore}
          ratingTotal={product.rateTotal}
          smallSize
        />
        <Typography
          fontSize={13}
          fontWeight={500}
          sx={{
            letterSpacing: 0.5,
            wordSpacing: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        <Typography fontSize={14} color="secondary" fontWeight={500}>
          ${displayPrice(product.price)}
        </Typography>
      </Stack>
    );
  };

  // -------------------------- MAIN --------------------------
  return isInCategory ? renderProductCardInCategory() : renderProductCard();
}
