import Image from "next/image";

import { ProductData } from "../product-list/product-list.component";

//mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import CustomImage from "../custom-image/custom-image.component";

interface ProductCardProps {
  product: ProductData;
  isInCategory?: boolean;
}

export default function ProductCard({
  product,
  isInCategory,
}: ProductCardProps) {
  // -------------------------- VAR --------------------------s
  const stackSX = {
    transition: "transform ease-in 0.1s",
    willChange: "transform",
    "&:hover": {
      cursor: "pointer",
      transform: "translateY(-3px)",
    },
  };
  
  // -------------------------- FUNCTION --------------------------
  function displayPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // -------------------------- MAIN --------------------------
  return (
    <Stack
      spacing={1}
      sx={stackSX}
      px={2}
      pb={2}
      border={isInCategory ? "2px solid #E4E7E9" : "none"}
      borderRadius={isInCategory ? 2 : 0}
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
          width="60%"
          height="60%"
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
            <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
          }
        />
        <Box sx={{ ml: 0.7, mb: -0.3, fontSize: 14 }}>
          ({product.rateTotal})
        </Box>
      </Box>
    </Stack>
  );
}
