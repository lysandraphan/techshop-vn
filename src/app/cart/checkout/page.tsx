"use client";
import NextLink from "next/link";
import { useState } from "react";

// internal
import { OrderBillingInfoData } from "@/interface";

// mui
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";

// component
import OrderSummary from "@/web-pages/checkout-page/order-summary-section";
import BillingShippingInfoSection from "@/web-pages/checkout-page/billing-shiping-info-section";

export default function Checkout() {
  const [orderBillingInfo, setOderBillingInfo] = useState<
    OrderBillingInfoData | undefined
  >();

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
        <Grid item xs={12} md={7} mb={7}>
          <BillingShippingInfoSection
            setOrderBillingInfo={setOderBillingInfo}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderSummary orderBillingInfo={orderBillingInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}
