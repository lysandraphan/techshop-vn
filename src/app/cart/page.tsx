"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// internal
import { getCartApi } from "@/api";
import { useFetchHook } from "@/custom-hooks/use-fetch-hook";
import { useAppSelector } from "@/redux/hooks";
import { getToken } from "../utils/functions";

// mui
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

// component
import CustomImage from "@/components/custom-image/custom-image.component";
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";

// EXPORT DEFAULT
export default function Cart() {
  // -------------------------- VAR --------------------------
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);

  // let [data, fetchApi, abortController, isLoading, error] =
  //   useFetchHook<CartData>(getToken);

  // const cart = data?.data;

  // -------------------------- EFFECT --------------------------
  // useEffect(() => {
  //   fetchApi(getCartApi(user.accountId));
  // }, []);

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  // -------------------------- MAIN --------------------------
  // if (isLoading) return <LoadingFallback />;
  // if (error)
  //   return (
  //     <LoadingFallback message="Error occurred while fetching cart detail." />
  //   );
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
      <Stack direction="row" mt={7} boxShadow="0 1px 10px #d7d7d7">
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

      <Stack direction="row" mt={7} mb={3} boxShadow="0 1px 10px #d7d7d7">
        <Grid container spacing={5} p={3} pr={6}>
          <Grid item md={7}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CustomImage
                src="/product.webp"
                alt="product"
                width={50}
                height={50}
                mb={2}
              />
              <Typography fontSize={16}>
                Olympus Tough TG-6 Waterproof Camera, Red
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2} alignSelf="center">
            <Typography textAlign="center">$650</Typography>
          </Grid>
          <Grid item md={2} alignSelf="center">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <IconButton aria-label="delete" size="small">
                <ChevronLeftIcon fontSize="inherit" />
              </IconButton>
              <Typography textAlign="center">2</Typography>
              <IconButton aria-label="delete" size="small">
                <ChevronRightIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item md={1} alignSelf="center">
            <Typography textAlign="center">$1,300</Typography>
          </Grid>
        </Grid>
      </Stack>

      <Stack direction="row" mt={7} mb={3} boxShadow="0 1px 10px #d7d7d7">
        <Grid container spacing={5} p={3} pr={6}>
          <Grid item md={7}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CustomImage
                src="/product.webp"
                alt="product"
                width={50}
                height={50}
                mb={2}
              />
              <Typography fontSize={16}>
                Olympus Tough TG-6 Waterproof Camera, Red
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={2} alignSelf="center">
            <Typography textAlign="center">$650</Typography>
          </Grid>
          <Grid item md={2} alignSelf="center">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <IconButton aria-label="delete" size="small">
                <ChevronLeftIcon fontSize="inherit" />
              </IconButton>
              <Typography textAlign="center">2</Typography>
              <IconButton aria-label="delete" size="small">
                <ChevronRightIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item md={1} alignSelf="center">
            <Typography textAlign="center">$1,300</Typography>
          </Grid>
        </Grid>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={5} mb={8}>
        <Button variant="outlined" onClick={() => router.back()}>
          Return To Shop
        </Button>
        <Button variant="outlined">Update Cart</Button>
      </Stack>

      <Grid container>
        <Grid item md={7}>
          <Stack direction="row" height={50} spacing={2} mb={5}>
            <TextField
              id="coupon-input-field"
              label="Coupon Code"
              variant="outlined"
              maxRows={1}
              size="medium"
              inputProps={{ sx: { fontSize: 13 }, enterKeyHint: "go" }}
              InputLabelProps={{ sx: { fontSize: 14 } }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ px: 5, wordSpacing: 3 }}
            >
              Apply Coupon
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack
            mb={10}
            p={3}
            spacing={4}
            border="1px solid"
            borderColor="primary.dark"
            borderRadius={1}
          >
            <Typography fontWeight={500} fontSize={20}>
              Cart Total
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>$2,600</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography>Total</Typography>
                <Typography>$2,600</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: "50%", height: 50 }}
                onClick={() => router.push("/cart/checkout")}
              >
                Checkout
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
