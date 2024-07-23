"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartItemData, fetchCart } from "@/redux/features/cart-slice";

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
import { displayPrice, getToken } from "@/utils/functions";
import { createOrderApi, getOrderApi } from "@/api";
import axios from "axios";

// EXPORT DEFAULT
export default function OrderSummary() {
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
  const getOrderSummaryDetail = () => {
    if (!cartItems) return;
    const result = cartItems.map((cartItem: CartItemData) => {
      return {
        productId: cartItem.product.productId,
        quantity: cartItem.product.quantity,
        price: cartItem.product.price,
      };
    });
    // console.log(result);
    return result;
  };

  const placeOrderSubmit = async () => {
    console.log("Submit");
    // const data = new FormData(event.currentTarget);
    // const firstName = data.get("first-name") as string;
    // const lastName = data.get("last-name") as string;
    // const phoneNumber = data.get("phone-number") as string;
    // const apartment = data.get("apartment-company") as string;
    // const addressLine1 = data.get("address1") as string;
    // const addressLine2 = data.get("address2") as string;
    // const suburb = data.get("suburb") as string;
    // const city = data.get("city") as string;
    // const region = data.get("region") as string;
    // const country = data.get("country") as string;

    // const orderInfo = {
    //   firstName,
    //   lastName,
    //   phoneNumber,
    //   apartment,
    //   addressLine1,
    //   addressLine2,
    //   suburb,
    //   city,
    //   region,
    //   country,
    // };

    const orderInfo = {
      firstName: "Thao",
      lastName: "Phan",
      phoneNumber: "090912345",
      apartment: "Unit 3",
      addressLine1: "123 Street",
      addressLine2: "Ward ABC",
      suburb: "Silverdale",
      city: "Hamilton",
      region: "Waikato",
      country: "New Zealand",
      currency: "VND",
      paymentType: "CREDIT_CARD",
      status: 0,
      description: "string",
      couponId: 0,
      orderDetailRequests: getOrderSummaryDetail(),
    };

    console.log(orderInfo);

    // try {
    //   setIsLoadingOrder(true);
    //   await axios.post(createOrderApi, orderInfo, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   });
    //   setIsLoadingOrder(false);
    //   // router.push("/cart/checkout/success");
    // } catch (error: any) {
    //   setIsLoadingOrder(false);
    //   console.log(error.message);
    // }

    //test
    const accountId = 15;

    const abortController = new AbortController();
    const token = getToken;
    console.log("TOken");
    console.log(token);

    try {
      setIsLoadingOrder(true);
      const re = await axios.get(getOrderApi(accountId), {
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      setIsLoadingOrder(false);
      console.log("Data");
      console.log(re.data);
      // router.push("/cart/checkout/success");
    } catch (error: any) {
      setIsLoadingOrder(false);
      console.log(error.message);
    }

    // if success
    // router.push("/cart/checkout/success");
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrderSummaryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  // test
  useEffect(() => {
    // async () => {
    //   try {
    //     setIsLoadingOrder(true);
    //     const re = await axios.get(getOrderApi(115), {
    //       headers: {
    //         Authorization: `Bearer ${getToken}`,
    //       },
    //     });
    //     setIsLoadingOrder(false);
    //     console.log(re.data);
    //     // router.push("/cart/checkout/success");
    //   } catch (error: any) {
    //     setIsLoadingOrder(false);
    //     console.log(error.message);
    //   }
    // };
  }, []);

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;
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

      {cartItems &&
        cartItems.length !== 0 &&
        cartItems.map((cartItem: CartItemData) => (
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
          <Typography fontSize={fz}>{displayPrice(discountPrice)}</Typography>
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
      <Stack direction="row" justifyContent="center">
        {isLoadingOrder ? (
          <LoadingButton
            loading
            loadingPosition="start"
            variant="outlined"
            startIcon={<SaveIcon />}
            sx={{ py: 2, wordSpacing: 5, letterSpacing: 0.7, fontSize: 16 }}
          >
            <span>Placing Order</span>
          </LoadingButton>
        ) : (
          <Button
            form="billing-and-shipping-info-form"
            type="submit"
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
    </Stack>
  );
}
