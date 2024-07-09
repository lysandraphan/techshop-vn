"use client";

import { useRouter } from "next/navigation";
import NextLink from "next/link";

// mui
import { Inter } from "next/font/google";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountIcon from "./account-icon/account-icon.component";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material";

const inter = Inter({
  subsets: ["latin"],
  weight: "700",
});

export default function Header() {
  const isLoggedIn = true; //test
  const history = useRouter();
  const theme = useTheme();

  const quantityStyle = {
    position: "absolute",
    top: 3,
    right: 0,
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 12,
    backgroundColor: `${theme.palette.secondary.main}`,
    color: "white",
    padding: 3,
  } as React.CSSProperties;

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
          Summer Sale For All Laptops And Free Delivery - OFF 30%
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
            <Stack
              direction="row"
              sx={{
                flex: 1,
                px: 2,
                py: 1,
                borderRadius: 1,
                bgcolor: "primary.light",
              }}
            >
              <Input
                type="text"
                placeholder="What are you looking for?"
                disableUnderline
                sx={{
                  flex: 1,
                  fontSize: 12,
                }}
              />
              <IconButton color="primary" onClick={() => {}}>
                <SearchIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/*-------------------------- Icon Button Group --------------------------*/}
          <Grid item md={2}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <IconButton
                color="primary"
                aria-label="cart"
                onClick={() => history.push("/wishlist")}
              >
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 }} />
                {isLoggedIn && <span style={quantityStyle}>4</span>}
              </IconButton>
              <IconButton
                color="primary"
                aria-label="cart"
                onClick={() => history.push("/cart")}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                {isLoggedIn && <span style={quantityStyle}>2</span>}
              </IconButton>
              <AccountIcon isLoggedIn={isLoggedIn} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </header>
  );
}
