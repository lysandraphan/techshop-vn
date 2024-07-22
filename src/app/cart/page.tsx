"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cart-slice";

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
  // -------------------------- VAR --------------------------
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);
  const accountId = user?.accountId;

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const cart = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCart({ accountId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // useEffect(() => {
  //   fetchApi(getCartApi(user.accountId));
  // }, []);

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;
  // if (!cart) return <LoadingFallback message="No Item In Cart." />;
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

      <Stack
        boxShadow="0 1px 10px #d7d7d7"
        mt={7}
        divider={<Divider flexItem />}
      >
        <Stack direction="row">
          <Grid container spacing={5} p={3} pr={6}>
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
        <ProductInCart />
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={5} mb={8}>
        <Button variant="outlined" onClick={() => router.back()}>
          Return To Shop
        </Button>
        <Button variant="outlined">Update Cart</Button>
      </Stack>

      <CouponAndCartTotalSection />
    </Container>
  );
}
