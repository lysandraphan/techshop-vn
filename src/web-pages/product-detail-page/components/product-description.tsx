// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";

// component
import IconText from "../../../components/icon-text/icon-text";
import TextInfo from "../../../components/text-info/text-info";

// interface
interface ProductDescriptionProps {
  description: string;
}

// EXPORT DEFAULT
export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const titleFS = 16;
  const paraFS = 14;
  const iconFS = 20;

  return (
    <Grid container columnSpacing={7} mt={1} mb={5}>
      <Grid item md={5.5}>
        <Typography fontSize={titleFS} fontWeight={600} mb={2}>
          Description
        </Typography>
        <Typography fontSize={paraFS} textAlign="justify">
          {description.length < 1000
            ? description
            : description.substring(0, 1000) + "..."}
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography fontSize={titleFS} fontWeight={600} mb={2}>
          Feature
        </Typography>
        <Stack spacing={2}>
          <IconText
            text="Free 1 year warranty"
            icon={<LocalPoliceOutlinedIcon sx={{ fontSize: iconFS }} />}
          />
          <IconText
            text="Free shipping & Fast delivery"
            icon={<LocalShippingOutlinedIcon sx={{ fontSize: iconFS }} />}
          />
          <IconText
            text="100% Money-back guarantee"
            icon={<CurrencyExchangeOutlinedIcon sx={{ fontSize: iconFS }} />}
          />
          <IconText
            text="24/7 Customer support"
            icon={<SupportAgentOutlinedIcon sx={{ fontSize: iconFS }} />}
          />
          <IconText
            text="Secure Payment Method"
            icon={<CreditScoreOutlinedIcon sx={{ fontSize: iconFS }} />}
          />
        </Stack>
      </Grid>
      <Grid item md={3.5}>
        <Typography fontSize={titleFS} fontWeight={600} mb={2}>
          Shipping Information
        </Typography>
        <Stack spacing={2}>
          <TextInfo label="Local Delivery" text="3-4 days | $9.90" />
          <TextInfo label="Nationwide Delivery" text="4-6 days | $19.90" />
          <TextInfo label="Rural Delivery" text="up to a week | $29.90" />
          <TextInfo label="* Express Shipping" text="2-3 days | $39.90" />
          <TextInfo label="* Overnight Shipping" text="1 day | $49.90" />
        </Stack>
      </Grid>
    </Grid>
  );
}
