"use client";
import { useRouter } from "next/navigation";

// internal
import {
  CartItemData,
  CartProductData,
  removeItemFromCart,
  incrementCartItem,
  decrementCartItem,
} from "@/redux/features/cart-slice";
import { displayPrice, getProductRoute } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

// interface
interface ProductInCartProps {
  cartItem: CartItemData;
  cartId: number;
  cartProduct: CartProductData;
}

// EXPORT DEFAULT
export default function ProductInCart({
  cartItem,
  cartId,
  cartProduct,
}: ProductInCartProps) {
  // -------------------------- VAR --------------------------
  const name =
    cartProduct.name.length > 60
      ? cartProduct.name.substring(0, 57) + "..."
      : cartProduct.name;

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isLoadingRemove = useAppSelector((state) => state.cart.isLoadingRemove);

  const removingCartId = useAppSelector((state) => state.cart.removingCartId);

  const isLoadingUpdate = useAppSelector((state) => state.cart.isLoadingUpdate);

  const isLoadingCoupon = useAppSelector((state) => state.cart.isLoadingCoupon);

  // -------------------------- FUNCTION --------------------------
  const changeQuantity = (actionType: "increment" | "decrement") => {
    if (isLoadingRemove || isLoadingUpdate || isLoadingCoupon) return;
    if (actionType === "decrement") {
      if (cartItem.product.quantity > 1) dispatch(decrementCartItem(cartItem));
    } else {
      dispatch(incrementCartItem(cartItem));
    }
  };

  // Remove product in Cart
  const removeProductHandler = async () => {
    if (isLoadingRemove || isLoadingUpdate || isLoadingCoupon) return;
    dispatch(removeItemFromCart({ cartId }));
  };

  // -------------------------- MAIN --------------------------
  return (
    <Stack direction="row" mt={2} mb={3}>
      <Grid container spacing={3} px={4}>
        <Grid item md={7}>
          <Stack direction="row" alignItems="center">
            <Stack
              direction="row"
              alignItems="center"
              onClick={() =>
                router.push(
                  getProductRoute(
                    cartProduct.categoryDto.name,
                    cartProduct.categoryDto.categoryId,
                    cartProduct.productId
                  )
                )
              }
              sx={{
                cursor: "pointer",
                "&:hover .MuiTypography-root": {
                  color: "secondary.main",
                },
              }}
            >
              <CustomImage
                src={cartProduct.imagePath}
                alt={name}
                width={50}
                height={50}
                mb={2}
              />
              <Typography fontSize={16} ml={2} mr={1}>
                {name}
              </Typography>
            </Stack>
            {isLoadingRemove && removingCartId === cartId ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
              ></LoadingButton>
            ) : (
              <Tooltip title="Remove" placement="top" arrow>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={removeProductHandler}
                >
                  <CancelOutlinedIcon
                    fontSize="inherit"
                    sx={{
                      color: "primary.dark",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Grid>
        <Grid item md={2} alignSelf="center">
          <Typography textAlign="center">
            {displayPrice(cartProduct.price)}
          </Typography>
        </Grid>
        <Grid item md={2} alignSelf="center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <IconButton
              aria-label="decrement"
              size="small"
              onClick={() => changeQuantity("decrement")}
            >
              <ChevronLeftIcon fontSize="inherit" />
            </IconButton>
            <Typography textAlign="center">{cartProduct.quantity}</Typography>
            <IconButton
              aria-label="increment"
              size="small"
              onClick={() => changeQuantity("increment")}
            >
              <ChevronRightIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item md={1} alignSelf="center">
          <Typography textAlign="center">
            {displayPrice(cartProduct.subTotal)}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
