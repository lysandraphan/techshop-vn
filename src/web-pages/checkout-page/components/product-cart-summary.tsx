// internal
import { CartProductData } from "@/redux/features/cart-slice";
import { displayPrice } from "@/utils/functions";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

// interface
interface ProductCartSummaryProps {
  cartProduct: CartProductData;
}

// EXPORT DEFAULT
export default function ProductCartSummary({
  cartProduct,
}: ProductCartSummaryProps) {
  // -------------------------- VAR --------------------------
  const name =
    cartProduct.name.length > 38
      ? cartProduct.name.substring(0, 35) + "..."
      : cartProduct.name;

  // -------------------------- MAIN --------------------------
  if (!cartProduct) return;
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <CustomImage
        src={cartProduct.imagePath}
        alt={cartProduct.name}
        width={60}
        height={50}
      />
      <Stack spacing={0.5}>
        <Typography fontSize={14}>{name}</Typography>
        <Stack direction="row" spacing={1}>
          <Typography fontSize={14}> {`${cartProduct.quantity} x`} </Typography>
          <Typography color="secondary" fontSize={14} fontWeight={600}>
            {displayPrice(cartProduct.price)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
