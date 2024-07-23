import { useRouter } from "next/navigation";

// internal
import { displayPrice } from "@/utils/functions";
import { useAppSelector } from "@/redux/hooks";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

// interface
interface CouponAndCartTotalSectionProps {}

// EXPORT DEFAULT
export default function CouponAndCartTotalSection({}: CouponAndCartTotalSectionProps) {
  // -------------------------- VAR --------------------------
  const router = useRouter();

  const isLoadingRemove = useAppSelector((state) => state.cart.isLoadingRemove);

  const isLoadingUpdate = useAppSelector((state) => state.cart.isLoadingUpdate);

  const subTotal = useAppSelector((state) => state.cart.totalPrice);

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
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ px: 5, wordSpacing: 3 }}
            disabled={isLoadingRemove || isLoadingUpdate}
          >
            Apply Coupon
          </Button>
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
              <Typography>{displayPrice(subTotal)}</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Discount</Typography>
              <Typography>N/A</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography>{displayPrice(subTotal)}</Typography>
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
