"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// style
import "./header.styles.scss";

// mui
import { Inter } from "next/font/google";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountIcon from "./account-icon/account-icon.component";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const inter = Inter({
  subsets: ["latin"],
  weight: "700",
});

export default function Header() {
  const isLoggedIn = true; //test
  const history = useRouter();

  return (
    <header>
      <Stack className="sale-banner" direction="row">
        <Typography fontSize={14}>
          Summer Sale For All Laptops And Free Delivery - OFF 30%
        </Typography>
        <Link href="/" className="shop-link">
          Shop Now
        </Link>
      </Stack>

      <div className="layout-container">
        <Grid container spacing={2} py={3} alignItems="center">
          <Grid item sm={2}>
            <Link href="/" className={`brand-logo ${inter.className}`}>
              TechShopVn
            </Link>
          </Grid>

          <Grid item sm={8}>
            <Stack direction="row" ml={2} mr={4} className="search-bar">
              <input type="text" placeholder="What are you looking for?" />
              <IconButton color="primary" onClick={() => {}}>
                <SearchIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item sm={2}>
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                aria-label="cart"
                onClick={() => history.push("/wishlist")}
              >
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 }} />
                {isLoggedIn && <span className="quantity">4</span>}
              </IconButton>
              <IconButton
                color="primary"
                aria-label="cart"
                onClick={() => history.push("/cart")}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                {isLoggedIn && <span className="quantity">2</span>}
              </IconButton>
              <AccountIcon isLoggedIn={isLoggedIn} />
            </Stack>
          </Grid>
        </Grid>
      </div>
      <Divider />
    </header>
  );
}
