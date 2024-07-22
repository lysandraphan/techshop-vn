"use client";

// internal
import { ProductData } from "@/interface";
import { displayPrice } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart-slice";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// component
import RatingInfo from "@/components/rating-info/rating-info";
import DeliveryInfoBox from "./components/delivery-info-box";

// interface
interface MainInfoSectionProps {
  product: ProductData;
}

// EXPORT DEFAULT
export default function MainInfoSection({ product }: MainInfoSectionProps) {
  // -------------------------- VAR --------------------------
  const user = useAppSelector((state) => state.user.user);

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  const addToCartHandler = () => {
    const productId = product.productId;
    const accountId = user?.accountId;
    dispatch(addToCart({ productId, accountId }));
  };

  // -------------------------- MAIN --------------------------
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
        {displayPrice(product.price)}
      </Typography>
      <Stack direction="row" spacing={2} mb={5}>
        <Button variant="outlined">
          <FavoriteBorderOutlinedIcon />
        </Button>
        {isLoading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <span>Adding To Cart</span>
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            fullWidth={true}
            size="large"
            onClick={addToCartHandler}
          >
            Add To Cart
          </Button>
        )}
      </Stack>
      <DeliveryInfoBox />
    </Stack>
  );
}
