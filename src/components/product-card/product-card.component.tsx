"use client";
// internal
import { ProductData } from "../product-list/product-list.component";
import { useRouter } from "next/navigation";

//mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

// component
import CustomImage from "../custom-image/custom-image.component";

// interface
interface ProductCardProps {
  product: ProductData;
  isInCategory?: boolean;
}

// EXPORT DEFAULT
export default function ProductCard({
  product,
  isInCategory,
}: ProductCardProps) {
  // -------------------------- VAR --------------------------
  const router = useRouter();

  const stackSX = {
    transition: "transform ease-in 0.1s",
    willChange: "transform",
    "&:hover": {
      cursor: "pointer",
      transform: "translateY(-3px)",
    },
    border: "1px solid #fedfdf",
    borderRadius: 5,
  };

  // -------------------------- FUNCTION --------------------------
  const displayPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getProductRoute = () => {
    const categoryId = product.categoryDto.categoryId;
    const categoryName = product.categoryDto.name
      .toLocaleLowerCase()
      .replace(/ /g, "-");
    const productId = product.productId;
    const route = `/categories/${categoryName}/${categoryId}/products/${productId}`;
    console.log(route);
    return route;
  };

  // -------------------------- RENDER --------------------------
  // Render Product Card in Home Page (Best Selling, New Arrival)
  const renderProductCardNoBorder = () => {
    return (
      <Stack
        spacing={1}
        sx={stackSX}
        px={2}
        pb={2}
        onClick={() => router.push(getProductRoute())}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          width="inherit"
          height={200}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 1,
            mt: 0.7,
          }}
        >
          <Rating
            name="text-feedback"
            value={product.ratingScore}
            readOnly
            precision={0.5}
            sx={{ fontSize: 20 }}
            emptyIcon={
              <StarRateRoundedIcon
                style={{ opacity: 0.55 }}
                fontSize="inherit"
              />
            }
          />
          <Box sx={{ ml: 0.7, mb: -0.3, fontSize: 14 }}>
            ({product.rateTotal})
          </Box>
        </Box>
      </Stack>
    );
  };

  // Render Product Card in Category Page
  const renderProductCard = () => {
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
          height={180}
        >
          <CustomImage
            src={product.imagePath}
            alt={product.name}
            width="60%"
            height="50%"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 1,
            mt: 0.7,
          }}
        >
          <Rating
            name="text-feedback"
            value={product.ratingScore}
            readOnly
            precision={0.5}
            sx={{ fontSize: 15 }}
            emptyIcon={
              <StarRateRoundedIcon
                style={{ opacity: 0.55 }}
                fontSize="inherit"
              />
            }
          />
          <Box sx={{ ml: 0.7, mb: -0.3, fontSize: 10, color: "#808080" }}>
            ({product.rateTotal})
          </Box>
        </Box>

        <Typography
          fontSize={12}
          fontWeight={500}
          sx={{
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
  return isInCategory ? renderProductCard() : renderProductCardNoBorder();
}
