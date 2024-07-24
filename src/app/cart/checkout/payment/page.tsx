"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// internal
import { paypalApi } from "@/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { displayPrice, getToken } from "@/utils/functions";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Container from "@mui/material/Container";
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import { resetCart } from "@/redux/features/cart-slice";

export default function Payment() {
  // -------------------------- STATE --------------------------
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [description, setDescription] = useState("TechShopVN");

  // -------------------------- VAR --------------------------
  const labelColorSX = { color: "rgba(0, 0, 0, 0.6)" };

  const totalFinalPrice = useAppSelector((state) => state.cart.totalFinalPrice);

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  const paymentHandler = async () => {
    const abortController = new AbortController();
    try {
      setIsLoadingPayment(true);
      const response = await axios.post(
        paypalApi,
        {
          method: "paypal",
          amount: `${totalFinalPrice}`,
          currency: "USD",
          description,
        },
        {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      const approvalUrl = response.data.approvalUrl;
      //   window.open(approvalUrl, "newwindow", "width=1000,height=800,top=100");
      window.location.href = approvalUrl;
      dispatch(resetCart());
      setIsLoadingPayment(false);
      console.log(response);
    } catch (error: any) {
      setIsLoadingPayment(false);
      if (!abortController.signal.aborted) {
        console.log(error.message);
      }
    }
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {}, []);

  // -------------------------- MAIN --------------------------
  if (isLoading || totalFinalPrice === 0) return <LoadingFallback />;
  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" my={10}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "primary.dark",
            borderRadius: 1,
            p: 5,
            mb: 5,
            width: 500,
          }}
        >
          <Typography
            mb={5}
            fontSize={25}
            fontWeight={500}
            textAlign="center"
            sx={{ wordSpacing: 5 }}
          >
            Pay with PayPal
          </Typography>
          <Grid container alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Stack direction="row" spacing={2}>
                <Typography sx={labelColorSX}>Amount:</Typography>
                <Typography fontWeight={500}>
                  {displayPrice(totalFinalPrice)} USD
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Typography sx={labelColorSX} mt={2}>
                Description
              </Typography>
              <OutlinedInput
                id="method"
                name="method"
                placeholder="TechShopVN"
                required
                fullWidth
                multiline
                minRows={3}
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="center" mt={5}>
            {isLoadingPayment ? (
              <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                startIcon={<SaveIcon />}
                fullWidth
                sx={{ py: 2, wordSpacing: 5, fontSize: 16 }}
              >
                <span>Processing</span>
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 2, wordSpacing: 5, fontSize: 16 }}
                onClick={paymentHandler}
                disabled={isLoading || totalFinalPrice === 0}
              >
                Pay
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
