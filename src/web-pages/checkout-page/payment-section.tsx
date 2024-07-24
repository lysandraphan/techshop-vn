import axios from "axios";
import { useState } from "react";

// internal
import { paypalApi } from "@/api";
import { useAppSelector } from "@/redux/hooks";
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
import LinearProgress from "@mui/material/LinearProgress";

export default function PaymentSection() {
  // -------------------------- STATE --------------------------
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [description, setDescription] = useState("");

  // -------------------------- VAR --------------------------
  const labelColorSX = { color: "rgba(0, 0, 0, 0.6)" };

  const totalFinalPrice = useAppSelector((state) => state.cart.totalFinalPrice);

  const isLoading = useAppSelector((state) => state.cart.isLoading);

  // -------------------------- FUNCTION --------------------------
  const paymentHandler = async () => {
    const abortController = new AbortController();
    try {
      setIsLoadingOrder(true);
      const response = await axios.post(
        paypalApi,
        {
          method: "paypal",
          amount: `${totalFinalPrice}`,
          currency: "NZD",
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
      window.open(
        approvalUrl,
        "newwindow",
        "width=1000,height=800,top=100"
      );
      //   window.location.href = approvalUrl;
      setIsLoadingOrder(false);
      console.log(response);
    } catch (error: any) {
      setIsLoadingOrder(false);
      if (!abortController.signal.aborted) {
        console.log(error.message);
      }
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: 1,
        p: 5,
        mb: 5,
      }}
      component="form"
      id="paypal-form"
    >
      <Typography fontWeight={500} fontSize={20} mb={4} mt={-0.7}>
        PayPal
      </Typography>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item md={12}>
          <Typography sx={labelColorSX}>Amount</Typography>
          <OutlinedInput
            id="method"
            name="method"
            value={displayPrice(totalFinalPrice)}
            required
            fullWidth
            disabled
          />
        </Grid>
        <Grid item md={12}>
          <Typography sx={labelColorSX}>Currency</Typography>
          <OutlinedInput
            id="method"
            name="method"
            value="NZD"
            required
            fullWidth
            disabled
          />
        </Grid>
        <Grid item md={12}>
          <Typography sx={labelColorSX}>Description</Typography>
          <OutlinedInput
            id="method"
            name="method"
            placeholder="TechShopVN"
            required
            fullWidth
            multiline
            minRows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      {(isLoading || totalFinalPrice === 0) && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress />
        </Box>
      )}
      <Stack direction="row" justifyContent="center" mt={5}>
        {isLoadingOrder ? (
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
            Pay with Paypal
          </Button>
        )}
      </Stack>
    </Box>
  );
}
