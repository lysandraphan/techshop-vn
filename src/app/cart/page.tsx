"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CartItemData,
  fetchCart,
  updateCart,
} from "@/redux/features/cart-slice";

// mui
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import ProductInCart from "@/web-pages/cart-page/components/product-in-cart";
import CouponAndCartTotalSection from "@/web-pages/cart-page/coupon-and-cart-total-section";

// EXPORT DEFAULT
export default function Cart() {
  // -------------------------- VAR --------------------------
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const isLoadingRemove = useAppSelector((state) => state.cart.isLoadingRemove);

  const isLoadingUpdate = useAppSelector((state) => state.cart.isLoadingUpdate);

  const cartItems = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  const updateCartHandler = () => {
    dispatch(updateCart({ cartItems }));
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 5 }}>
        <Link underline="hover" color="inherit" component={NextLink} href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          aria-current="page"
          component={NextLink}
          href="/cart"
        >
          Cart
        </Link>
      </Breadcrumbs>

      {cartItems && cartItems.length !== 0 ? (
        <Fragment>
          <Stack
            boxShadow="0 1px 10px #d7d7d7"
            mt={7}
            divider={<Divider flexItem />}
          >
            <Stack direction="row">
              <Grid container spacing={3} px={4} py={3}>
                <Grid item md={7}>
                  <Typography fontWeight={500}>Product</Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography textAlign="center" fontWeight={500}>
                    Price
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography textAlign="center" fontWeight={500}>
                    Quantity
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography textAlign="center" fontWeight={500}>
                    Subtotal
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            {cartItems.map((cartItem: CartItemData) => (
              <ProductInCart
                key={cartItem.cartId}
                cartItem={cartItem}
                cartId={cartItem.cartId}
                cartProduct={cartItem.product}
              />
            ))}
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={5} mb={8}>
            <Button
              variant="outlined"
              disabled={isLoadingRemove || isLoadingUpdate}
              onClick={() => router.back()}
            >
              Return To Shop
            </Button>

            {isLoadingUpdate ? (
              <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                <span>Updating Cart</span>
              </LoadingButton>
            ) : (
              <Button
                variant="outlined"
                disabled={isLoadingRemove || isLoadingUpdate}
                onClick={updateCartHandler}
              >
                Update Cart
              </Button>
            )}
          </Stack>

          <CouponAndCartTotalSection />
        </Fragment>
      ) : (
        <LoadingFallback message="No Item In Cart." />
      )}
    </Container>
  );
}
