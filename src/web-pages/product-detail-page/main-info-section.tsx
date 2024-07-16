// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";


// internal
import { ProductData } from "@/components/product-list/product-list.component";
import RatingInfo from "@/components/rating-info/rating-info";
import { displayPrice } from "@/components/product-card/product-card.component";
import DeliveryInfoBox from "@/components/delivery-info-box/delivery-info-box";

// interface
interface MainInfoSectionProps {
  product: ProductData;
}

// EXPORT DEFAULT
export default function MainInfoSection({ product }: MainInfoSectionProps) {
  return (
    <Stack direction="column">
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
      <Stack direction="row" spacing={2} mb={5}>
        <Button variant="outlined">
          <FavoriteBorderOutlinedIcon />
        </Button>
        <Button variant="contained" color="secondary" fullWidth={true} size="large">
          Add To Cart
        </Button>
      </Stack>
        <DeliveryInfoBox />
    </Stack>
  );
}
