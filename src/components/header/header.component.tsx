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
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const inter = Inter({
  subsets: ["latin"],
  weight: "700",
});

export default function Header() {
  const isLoggedIn = false; //test
  const history = useRouter();

  return (
    <Fragment>
      <Stack className="sale-banner" direction="row">
        <Typography>
          Summer Sale For All Laptops And Free Delivery - OFF 30%
        </Typography>
        <span>
          <Link href="/" className="shop-link">
            Shop Now
          </Link>
        </span>
      </Stack>

      <Container className="layout-container">
        <Stack direction="row" my={4} sx={{ alignItems: "center" }}>
          <span>
            <Link href="/" className={`brand-logo ${inter.className}`}>
              TechShopVn
            </Link>
          </span>

          {/*-------------------------- Search bar --------------------------*/}
          <Stack direction="row" ml={12} mr={4} className="search-bar">
            <input type="text" placeholder="What are you looking for?" />
            <IconButton color="primary" onClick={() => {}}>
              <SearchIcon />
            </IconButton>
          </Stack>

          {/*-------------------------- Icon Button Group --------------------------*/}
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
        </Stack>
      </Container>
      <Divider />
    </Fragment>
  );
}
