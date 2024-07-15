// mui
import Stack from "@mui/material/Stack";

// component
import Info from "@/components/info/info.component";

export default function InfoSection() {
  return (
    <Stack direction="row" justifyContent="center" spacing={10} my={8}>
      <Info
        src="/delivery-icon.png"
        alt="Delivery Icon"
        title="FREE AND FAST DELIVERY"
        description="Free delivery for all orders over $140"
      />
      <Info
        src="/customer-service-icon.png"
        alt="Customer Service"
        title="24/7 CUSTOMER SERVICE"
        description="Friendly 24/7 customer support"
      />
      <Info
        src="/guarantee-icon.png"
        alt="Guarantee Icon"
        title="MONEY BACK GUARANTEE"
        description="We return money within 30 days"
      />
    </Stack>
  );
}
