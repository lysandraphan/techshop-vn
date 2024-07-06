import Image from "next/image";

import { ProductData } from "../product-list/product-list.component";

//mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import CustomImage from "../custom-image/custom-image.component";

export default function ProductCard({ product }: { product: ProductData }) {
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
    <Stack spacing={1} sx={stackSX}>
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
      <Typography fontSize={16} fontWeight={500}>
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
          value={4.5}
          readOnly
          precision={0.5}
          sx={{ fontSize: 20 }}
          emptyIcon={
            <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
          }
        />
        <Box sx={{ ml: 0.7, mb: -0.3, fontSize: 14 }}>(95)</Box>
      </Box>
    </Stack>
  );
}
