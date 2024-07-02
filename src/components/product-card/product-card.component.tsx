import Image from "next/image";

import { ProductData } from "../product-list/product-list.component";

//mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export default function ProductCard({ product }: { product: ProductData }) {
  const stackSX = {
    transition: "transform ease-in 0.1s",
    willChange: "transform",
    "&:hover": {
      cursor: "pointer",
      transform: "translateY(-3px)",
    },
  };

  return (
    <Stack spacing={1} sx={stackSX}>
      <div style={{ width: "100%", height: 280, position: "relative" }}>
        <Image src="/product.jpg" alt="product" fill />
      </div>

      <Typography fontSize={18} fontWeight={500}>
        {product.name}
      </Typography>
      <Typography fontSize={18} color="secondary" fontWeight={500}>
        ${product.price}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
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
        <Box sx={{ ml: 0.7, mb:-0.3, fontSize: 14 }}>(95)</Box>
      </Box>
    </Stack>
  );
}
