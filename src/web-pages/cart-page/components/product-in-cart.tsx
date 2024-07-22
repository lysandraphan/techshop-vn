"use client";
import { useRouter } from "next/navigation";

// internal
import { CartProduct } from "@/redux/features/cart-slice";
import { displayPrice } from "@/utils/functions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getProductDetailApi } from "@/api";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

// interface
interface ProductInCartProps {
  cartProduct: CartProduct;
  setSubTotalAll: Dispatch<SetStateAction<number>>;
}

// EXPORT DEFAULT
export default function ProductInCart({
  cartProduct,
  setSubTotalAll,
}: ProductInCartProps) {
  // -------------------------- STATE --------------------------
  const [quantity, setQuantity] = useState<number>(cartProduct.quantity);

  // -------------------------- VAR --------------------------
  const subtotal = cartProduct.price * quantity;

  const name =
    cartProduct.name.length > 65
      ? cartProduct.name.substring(0, 63) + "..."
      : cartProduct.name;

  const router = useRouter();

  // -------------------------- FUNCTION --------------------------
  const changeQuantity = (type: "increment" | "decrement") => {
    if (type === "decrement") {
      setQuantity((prev) => {
        return prev <= 0 ? 0 : --prev;
      });
      if (quantity > 0) setSubTotalAll((prev) => prev - cartProduct.price);
    } else {
      setQuantity((prev) => ++prev);
      setSubTotalAll((prev) => prev + cartProduct.price);
    }
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    setSubTotalAll((prev) => prev + subtotal);
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Stack direction="row" mt={2} mb={3}>
      <Grid container spacing={5} p={3} pr={6}>
        <Grid item md={7}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            onClick={() => router.push("/")}
            sx={{ cursor: "pointer" }}
          >
            <CustomImage
              src={cartProduct.imagePath}
              alt={name}
              width={50}
              height={50}
              mb={2}
            />
            <Typography fontSize={16}>{name}</Typography>
          </Stack>
        </Grid>
        <Grid item md={2} alignSelf="center">
          <Typography textAlign="center">
            {displayPrice(cartProduct.price)}
          </Typography>
        </Grid>
        <Grid item md={2} alignSelf="center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => changeQuantity("decrement")}
            >
              <ChevronLeftIcon fontSize="inherit" />
            </IconButton>
            <Typography textAlign="center">{quantity}</Typography>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => changeQuantity("increment")}
            >
              <ChevronRightIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item md={1} alignSelf="center">
          <Typography textAlign="center">{displayPrice(subtotal)}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
