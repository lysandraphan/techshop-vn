"use client";
import NextLink from "next/link";

// mui
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CustomImage from "@/components/custom-image/custom-image.component";

export default function Checkout() {
  const fz = 12;

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 5 }}>
        <Link underline="hover" color="inherit" component={NextLink} href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={NextLink}
          href="/cart"
        >
          Cart
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          aria-current="page"
          component={NextLink}
          href="/cart/checkout"
        >
          Checkout
        </Link>
      </Breadcrumbs>
      <Grid container spacing={5}>
        <Grid item md={8}>
          <Typography
            variant="h4"
            mt={2}
            fontWeight={500}
            sx={{ letterSpacing: 0.5, wordSpacing: 3 }}
          >
            Billing & Shipping Information
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Stack
            mb={10}
            p={3}
            width={500}
            spacing={4}
            border="1px solid"
            borderColor="primary.dark"
            borderRadius={1}
          >
            <Typography fontWeight={500} fontSize={20}>
              Order Summary
            </Typography>

            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <CustomImage
                src="/product.webp"
                alt="Product"
                width={60}
                height={50}
              />
              <Stack spacing={0.5}>
                <Typography noWrap>
                  Olympus Tough TG-6 Waterproof Camera, Red
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography fontSize={14}> 1 x </Typography>
                  <Typography color="secondary" fontSize={14} fontWeight={600}>
                    $1,300
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <CustomImage
                src="/product.webp"
                alt="Product"
                width={60}
                height={50}
              />
              <Stack spacing={0.5}>
                <Typography noWrap>
                  Olympus Tough TG-6 Waterproof Camera, Red
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography fontSize={14}> 1 x </Typography>
                  <Typography color="secondary" fontSize={14} fontWeight={600}>
                    $1,300
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fz}>Subtotal</Typography>
                <Typography fontSize={fz}>$2,600</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fz}>Shipping</Typography>
                <Typography fontSize={fz}>Free</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={fz}>Discount</Typography>
                <Typography fontSize={fz}>$260</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={16} fontWeight={600}>
                  Total
                </Typography>
                <Typography fontSize={16} fontWeight={600}>
                  $2,340
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 2, wordSpacing: 5, fontSize: 16 }}
              >
                Place Order
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
