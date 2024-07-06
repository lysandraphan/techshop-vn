// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

export default function InfoSection() {
  return (
    <Stack direction="row" justifyContent="center" spacing={10} my={8}>
      {/* -------------------------- Delivery Info -------------------------- */}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CustomImage
          src="/delivery-icon.png"
          alt="Delivery Icon"
          width={80}
          height={80}
          mb={20}
        />
        <Typography mb={1} fontWeight={600} fontSize={16}>
          FREE AND FAST DELIVERY
        </Typography>
        <Typography fontSize={12}>
          Free delivery for all orders over $140
        </Typography>
      </Box>
      {/* -------------------------- Customer Service Info -------------------------- */}

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CustomImage
          src="/customer-service-icon.png"
          alt="Customer Service"
          width={80}
          height={80}
          mb={20}
        />
        <Typography mb={1} fontWeight={600} fontSize={16}>
          24/7 CUSTOMER SERVICE
        </Typography>
        <Typography fontSize={12}>Friendly 24/7 customer support</Typography>
      </Box>
      {/* -------------------------- Guarantee Info -------------------------- */}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CustomImage
          src="/guarantee-icon.png"
          alt="Guarantee Icon"
          width={80}
          height={80}
          mb={20}
        />
        <Typography mb={1} fontWeight={600} fontSize={16}>
          MONEY BACK GUARANTEE
        </Typography>
        <Typography fontSize={12}>We return money within 30 days</Typography>
      </Box>
    </Stack>
  );
}
