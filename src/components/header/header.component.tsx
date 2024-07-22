"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cart-slice";

// mui
import { Inter } from "next/font/google";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";

// component
import SearchBar from "../search-bar/search-bar";
import AccountSection from "./account-section/account-section";

const inter = Inter({
  subsets: ["latin"],
  weight: "700",
});

export default function Header() {
  // -------------------------- STATE --------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCartItems, setTotalCartItem] = useState(0);

  // -------------------------- VAR --------------------------
  const user = useAppSelector((state) => state.user.user);
  const accountId = user?.accountId;
  const router = useRouter();

  // let [cart, fetchApi, abortController, isLoading, error] =
  //   useFetchHook<CartData>(getToken);

  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.cart.total);

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchCart({ accountId }));
  }, [accountId]);

  useEffect(() => {
    setTotalCartItem(total);
  }, [total]);

  // useEffect(() => {
  //   if (cartItems) {
  //     const totalItems = cartItems.reduce(
  //       (total: number, cartItem: CartItemData) => {
  //         return total + cartItem.product.quantity;
  //       },
  //       0
  //     );
  //     setTotalCartItem(totalItems);
  //   }
  // }, [cartItems]);

  // useEffect(() => {
  //   fetchApi(getCartApi(user.accountId));
  //   return () => {
  //     abortController.abort();
  //   };
  // }, []);

  // Count total items with quantity in Cart
  // useEffect(() => {
  //   if (cart?.data) {
  //     const cartItems = cart.data;
  //     const totalItems = cartItems.reduce((total, cartItem) => {
  //       return total + cartItem.product.quantity;
  //     }, 0);
  //     setTotalCartItem(totalItems);
  //   }
  // }, [cart]);

  // -------------------------- MAIN --------------------------
  return (
    <header>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        py={2}
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        <Typography fontSize={14} color="primary.contrastText">
          Summer Sale For All Camera And Free Delivery - OFF 20%
        </Typography>
        <Link
          href="/"
          component={NextLink}
          color="primary.contrastText"
          ml={2}
          fontWeight={600}
          fontSize={14}
        >
          Shop Now
        </Link>
      </Stack>

      <Container>
        <Grid container spacing={2} py={3} alignItems="center">
          {/*-------------------------- Brand Logo --------------------------*/}
          <Grid item md={3}>
            <Link
              href="/"
              component={NextLink}
              fontFamily={inter.style.fontFamily}
              underline="none"
              color="primary"
              fontSize={28}
            >
              TechShopVn
            </Link>
          </Grid>

          {/*-------------------------- Search Bar --------------------------*/}
          <Grid item md={7}>
            <SearchBar
              setSearchQuery={setSearchQuery}
              bgcolor
              placeholder="What are you looking for?"
              py
            />
          </Grid>

          {/*-------------------------- Icon Button Group --------------------------*/}
          <Grid item md={2}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {user ? (
                <Badge
                  badgeContent={100}
                  max={99}
                  color="secondary"
                  onClick={() => router.push("/wishlist")}
                  sx={{ cursor: "pointer" }}
                >
                  <FavoriteBorderOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 30 }}
                  />
                </Badge>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="cart"
                  onClick={() => router.push("/wishlist")}
                >
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 }} />
                </IconButton>
              )}
              {totalCartItems > 0 && user ? (
                <Badge
                  badgeContent={totalCartItems}
                  max={99}
                  color="secondary"
                  sx={{ ml: 3, mr: 2.5, cursor: "pointer" }}
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingCartOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 30 }}
                  />
                </Badge>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="cart"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                </IconButton>
              )}
              <AccountSection user={user} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </header>
  );
}
