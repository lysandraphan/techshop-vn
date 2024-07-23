"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItemData, fetchCart } from "@/redux/features/cart-slice";

// mui
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import ProductInCart from "@/web-pages/cart-page/components/product-in-cart";
import CouponAndCartTotalSection from "@/web-pages/cart-page/coupon-and-cart-total-section";

// EXPORT DEFAULT
export default function Cart() {
  // -------------------------- STATE --------------------------
  // const [subTotalAll, setSubTotalAll] = useState<number>(0);

  // -------------------------- VAR --------------------------
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const isLoadingRemove = useAppSelector((state) => state.cart.isLoadingRemove);

  const cartItems = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  // console.log(subTotalAll);

  // -------------------------- FUNCTION --------------------------
  const updateCartHandler = () => {};

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

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
                cartId={cartItem.cartId}
                cartProduct={cartItem.product}
                // setSubTotalAll={setSubTotalAll}
              />
            ))}
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={5} mb={8}>
            <Button
              variant="outlined"
              disabled={isLoadingRemove}
              onClick={() => router.back()}
            >
              Return To Shop
            </Button>
            <Button
              variant="outlined"
              disabled={isLoadingRemove}
              onClick={updateCartHandler}
            >
              Update Cart
            </Button>
          </Stack>

          <CouponAndCartTotalSection
          // subTotalAll={subTotalAll}
          />
        </Fragment>
      ) : (
        <LoadingFallback message="No Item In Cart." />
      )}
    </Container>
  );
}
