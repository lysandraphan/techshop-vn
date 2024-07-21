// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

export default function OrderSummary() {
  const fz = 12;
  return (
    <Stack
      mb={10}
      px={5}
      py={4}
      width={500}
      spacing={4}
      border="1px solid"
      borderColor="primary.dark"
      borderRadius={1}
    >
      <Typography fontWeight={500} fontSize={20}>
        Order Summary
      </Typography>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <CustomImage src="/product.webp" alt="Product" width={60} height={50} />
        <Stack spacing={0.5}>
          <Typography noWrap>
            Olympus Tough TG-6 Waterproof Camera, Red
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography fontSize={14}> 1 x </Typography>
            <Typography color="secondary" fontSize={14} fontWeight={600}>
              $1,300
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <CustomImage src="/product.webp" alt="Product" width={60} height={50} />
        <Stack spacing={0.5}>
          <Typography noWrap>
            Olympus Tough TG-6 Waterproof Camera, Red
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography fontSize={14}> 1 x </Typography>
            <Typography color="secondary" fontSize={14} fontWeight={600}>
              $1,300
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={fz}>Subtotal</Typography>
          <Typography fontSize={fz}>$2,600</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={fz}>Shipping</Typography>
          <Typography fontSize={fz}>Free</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={fz}>Discount</Typography>
          <Typography fontSize={fz}>$260</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={16} fontWeight={600}>
            Total
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            $2,340
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ py: 2, wordSpacing: 5, fontSize: 16 }}
        >
          Place Order
        </Button>
      </Stack>
    </Stack>
  );
}
