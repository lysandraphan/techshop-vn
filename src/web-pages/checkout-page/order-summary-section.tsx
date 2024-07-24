"use client";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItemData, fetchCart } from "@/redux/features/cart-slice";
import {
  OrderBillingInfoData,
  OrderInfoData,
  OrderSummaryData,
} from "@/interface";
import { createOrderApi, getOrderApi } from "@/api";
import { displayPrice, getToken } from "@/utils/functions";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

// component
import ProductCartSummary from "./components/product-cart-summary";
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";

// interface
interface OrderSummaryProps {
  orderBillingInfo: OrderBillingInfoData | undefined;
}

// EXPORT DEFAULT
export default function OrderSummary({ orderBillingInfo }: OrderSummaryProps) {
  // -------------------------- STATE --------------------------
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  // -------------------------- VAR --------------------------
  const fz = 12;

  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart.cart);

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const subTotal = useAppSelector((state) => state.cart.totalPrice);

  const discountPrice = useAppSelector((state) => state.cart.discountPrice);

  const totalFinalPrice = useAppSelector((state) => state.cart.totalFinalPrice);

  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  const getOrderSummaryInfo = () => {
    if (!cartItems) return;
    const result = cartItems.map((cartItem: CartItemData) => {
      return {
        productId: cartItem.product.productId,
        quantity: cartItem.product.quantity,
        price: cartItem.product.price,
      };
    });
    return result;
  };

  const placeOrderSubmit = async () => {
    const orderSummaryInfo: OrderSummaryData[] = getOrderSummaryInfo();

    if (!orderBillingInfo || !orderSummaryInfo) return;

    const orderInfo: OrderInfoData = {
      ...orderBillingInfo,
      orderDetailRequests: orderSummaryInfo,
      totalPrice: totalFinalPrice,
      currency: "USD",
    };
    console.log(orderInfo);

    const abortController = new AbortController();

    // post order
    try {
      setIsLoadingOrder(true);
      const response = await axios.post(createOrderApi, orderInfo, {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      setIsLoadingOrder(false);
      if (response.status === 201) {
        router.push("/cart/checkout/payment");
      }
    } catch (error: any) {
      setIsLoadingOrder(false);
      if (!abortController.signal.aborted) {
        console.log(error.message);
      }
    }
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   getOrderSummaryDetail();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cartItems]);

  // test fetch Order Detail
  // useEffect(() => {
  //   try {
  //     setIsLoadingOrder(true);
  //     const abortController = new AbortController();
  //     const response = await axios.get(getOrderApi(accountId), {
  //       signal: abortController.signal,
  //       headers: {
  //         Authorization: `Bearer ${getToken}`,
  //       },
  //     });
  //     setIsLoadingOrder(false);
  //     console.log("Data");
  //     console.log(response.data);
  //     // router.push("/cart/checkout/success");
  //   } catch (error: any) {
  //     setIsLoadingOrder(false);
  //     console.log(error.message);
  //   }
  // // }, []);

  useEffect(() => {
    console.log("Order Info");
    console.log(orderBillingInfo);
  }, [orderBillingInfo]);

  // -------------------------- MAIN --------------------------
  return (
    <Stack
      mb={10}
      px={5}
      py={4}
      width="100%"
      spacing={4}
      border="1px solid"
      borderColor="primary.dark"
      borderRadius={1}
    >
      <Typography fontWeight={500} fontSize={20}>
        Order Summary
      </Typography>

      {isLoading || !cartItems || cartItems.length === 0 ? (
        <LoadingFallback />
      ) : (
        <Fragment>
          {cartItems.map((cartItem: CartItemData) => (
            <ProductCartSummary
              key={cartItem.cartId}
              cartProduct={cartItem.product}
            />
          ))}

          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={fz}>Subtotal</Typography>
              <Typography fontSize={fz}>{displayPrice(subTotal)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={fz}>Shipping</Typography>
              <Typography fontSize={fz}>Free</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={fz}>Discount</Typography>
              <Typography fontSize={fz}>
                {discountPrice === 0 ? "N/A" : displayPrice(discountPrice)}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={16} fontWeight={600}>
                Total
              </Typography>
              <Typography fontSize={16} fontWeight={600}>
                {displayPrice(totalFinalPrice)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" pb={2}>
            {isLoadingOrder ? (
              <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                startIcon={<SaveIcon />}
                fullWidth
                sx={{ py: 2, wordSpacing: 5, letterSpacing: 0.7, fontSize: 16 }}
              >
                <span>Placing Order</span>
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 2, wordSpacing: 5, letterSpacing: 0.7, fontSize: 16 }}
                onClick={placeOrderSubmit}
              >
                Place Order
              </Button>
            )}
          </Stack>
        </Fragment>
      )}
    </Stack>
  );
}
