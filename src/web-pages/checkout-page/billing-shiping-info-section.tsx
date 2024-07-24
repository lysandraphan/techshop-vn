import { Dispatch, SetStateAction, useState } from "react";

// internal
import { OrderBillingInfoData } from "@/interface";

// mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";

// interface
interface BillingShippingInfoSectionProps {
  setOrderBillingInfo: Dispatch<SetStateAction<OrderBillingInfoData | undefined>>;
}

// EXPORT DEFAULT
export default function BillingShippingInfoSection({
  setOrderBillingInfo,
}: BillingShippingInfoSectionProps) {
  // -------------------------- STATE --------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [apartment, setAppartment] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const [submit, setSubmit] = useState(false);

  // -------------------------- VAR --------------------------
  const labelColorSX = { color: "rgba(0, 0, 0, 0.6)" };

  // -------------------------- FUNCTION --------------------------
  const submitHandler = () => {
    setSubmit(true);
    if (
      firstName &&
      lastName &&
      phoneNumber &&
      addressLine1 &&
      suburb &&
      city &&
      region &&
      country
    ) {
      setOrderBillingInfo({
        firstName,
        lastName,
        phoneNumber,
        apartment,
        addressLine1,
        addressLine2,
        suburb,
        city,
        region,
        country,
      });
    }
  };

  // -------------------------- MAIN --------------------------
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: 1,
      }}
      component="form"
      id="billing-and-shipping-info-form"
    >
      <Grid container spacing={3} mb={7} px={5} pt={4}>
        <Grid item xs={12} md={12}>
          <Typography fontWeight={500} fontSize={20} mb={2}>
            Billing & Shipping Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={labelColorSX}>First name *</Typography>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="Lysa (Thao)"
            autoComplete="first name"
            required
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={labelColorSX}>Last name *</Typography>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Phan"
            autoComplete="last name"
            required
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={labelColorSX}>Phone number *</Typography>
          <OutlinedInput
            id="phone-number"
            name="phone-number"
            type="phone-number"
            placeholder="09090909"
            autoComplete="phone number"
            required
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={labelColorSX}>Apartment / Company</Typography>
          <OutlinedInput
            id="apartment-company"
            name="apartment-company"
            type="apartment-company"
            placeholder="Unit number, name (optional)"
            autoComplete="apartment company"
            fullWidth
            value={apartment}
            onChange={(e) => setAppartment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={labelColorSX}>Address line 1 *</Typography>
          <OutlinedInput
            id="address1"
            name="address1"
            type="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            required
            fullWidth
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={labelColorSX}>Address line 2</Typography>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            placeholder="Ward, suite, etc. (optional)"
            autoComplete="shipping address-line2"
            fullWidth
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Suburb / District *</Typography>
          <OutlinedInput
            id="suburb"
            name="suburb"
            type="suburb"
            placeholder="Silverdale"
            autoComplete="shipping suburb"
            required
            fullWidth
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>City *</Typography>
          <OutlinedInput
            id="city"
            name="city"
            type="city"
            placeholder="Hamilton"
            autoComplete="shipping city"
            required
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Region / State *</Typography>
          <OutlinedInput
            id="region"
            name="region"
            type="region"
            placeholder="Waikato"
            autoComplete="region"
            required
            fullWidth
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Country *</Typography>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            placeholder="New Zealand"
            autoComplete="shipping country"
            required
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" mt={1} ml={-1} mb={-1}>
            <Checkbox
              name="saveAddress"
              value={submit}
              onChange={submit ? () => {} : submitHandler}
            />
            <Typography>Use this address for billing and shipping.</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
