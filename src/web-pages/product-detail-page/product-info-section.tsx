// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

// internal
import { ProductData } from "@/components/product-list/product-list.component";
import RatingInfo from "@/components/rating-info/rating-info";
import { displayPrice } from "@/components/product-card/product-card.component";

// interface
interface ProductInfoSection {
  product: ProductData;
}

// EXPORT DEFAULT
export default function ProductInfoSection({ product }: ProductInfoSection) {
  return (
    <Stack direction="column" alignItems="flex-start">
      <Typography variant="h4" fontSize={24} fontWeight={600} mb={2}>
        {product.name}
      </Typography>
      <RatingInfo
        ratingScore={product.ratingScore}
        ratingTotal={product.rateTotal}
      />
      <Typography
        variant="h5"
        fontSize={48}
        fontWeight={700}
        color="secondary.main"
        my={3}
      >
        ${displayPrice(product.price)}
      </Typography>
      <Button></Button>
    </Stack>
  );
}
