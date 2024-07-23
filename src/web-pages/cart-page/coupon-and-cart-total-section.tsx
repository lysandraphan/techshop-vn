import { useState } from "react";
import { useRouter } from "next/navigation";

// internal
import { displayPrice } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCoupon } from "@/redux/features/cart-slice";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";

// interface
interface CouponAndCartTotalSectionProps {}

// EXPORT DEFAULT
export default function CouponAndCartTotalSection({}: CouponAndCartTotalSectionProps) {
  // -------------------------- STATE --------------------------
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);

  // -------------------------- VAR --------------------------
  const router = useRouter();

  const isLoadingRemove = useAppSelector((state) => state.cart.isLoadingRemove);

  const isLoadingUpdate = useAppSelector((state) => state.cart.isLoadingUpdate);

  const isLoadingCoupon = useAppSelector((state) => state.cart.isLoadingCoupon);

  const subTotal = useAppSelector((state) => state.cart.totalPrice);

  const discountPrice = useAppSelector((state) => state.cart.discountPrice);

  const totalFinalPrice = useAppSelector((state) => state.cart.totalFinalPrice);

  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  const applyCouponHandler = async () => {
    if (couponCode) {
      await dispatch(fetchCoupon({ couponCode }));
      setCouponCode("");
      setAppliedCoupons((prev) => [...prev, couponCode]);
    }
  };

  const handleDeleteCoupon = (couponCode: string) => {
    console.info("You clicked the delete icon.");
  };

  // -------------------------- MAIN --------------------------
  return (
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
            value={couponCode}
            onChange={(event) => {
              setCouponCode(event.target.value);
            }}
          />
          {isLoadingCoupon ? (
            <LoadingButton
              loading
              loadingPosition="start"
              variant="outlined"
              startIcon={<SaveIcon />}
              sx={{ px: 5, wordSpacing: 3 }}
            >
              <span>Applying Coupon</span>
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{ px: 5, wordSpacing: 3 }}
              disabled={isLoadingRemove || isLoadingUpdate}
              onClick={applyCouponHandler}
            >
              Apply Coupon
            </Button>
          )}
        </Stack>
        <Stack direction="row" spacing={1} mt={-2} mb={5}>
          {appliedCoupons.length !== 0 &&
            appliedCoupons.map((appliedCoupon) => (
              <Chip
                key={appliedCoupon}
                label={appliedCoupon}
                onDelete={() => handleDeleteCoupon(appliedCoupon)}
              />
            ))}
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
              <Typography>
                {subTotal ? displayPrice(subTotal) : "$0"}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Discount</Typography>
              <Typography>
                {discountPrice ? displayPrice(discountPrice) : "N/A"}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography>{displayPrice(totalFinalPrice)}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "50%", height: 50 }}
              disabled={isLoadingRemove || isLoadingUpdate}
              onClick={() => router.push("/cart/checkout")}
            >
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
