// mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

// interface
interface BillingShippingInfoSectionProps {
  // orderInfo: {
  //   firstName: string;
  //   lastName: string;
  //   phoneNumber: string;
  //   apartment: string;
  //   addressLine1: string;
  //   addressLine2: string;
  //   suburb: string;
  //   city: string;
  //   region: string;
  //   country: string;
  // };
}

// EXPORT DEFAULT
export default function BillingShippingInfoSection({
  // orderInfo,
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

  // -------------------------- FUNCTION --------------------------
  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  // -------------------------- EFFECT --------------------------
  // useEffect(() => {
  // if (
  //   firstName &&
  //   lastName &&
  //   phoneNumber &&
  //   apartment &&
  //   addressLine1 &&
  //   addressLine2 &&
  //   suburb &&
  //   city &&
  //   region &&
  //   country
  // ) {
  //   orderInfo = {
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     apartment,
  //     addressLine1,
  //     addressLine2,
  //     suburb,
  //     city,
  //     region,
  //     country,
  //   };
  //   console.log(orderInfo);
  // }
  // }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: 1,
      }}
      // component="form"
      // id="billing-and-shipping-info-form"
    >
      <Grid container spacing={3} mb={10} px={5} pt={4}>
        <FormGrid item xs={12} md={12}>
          <Typography fontWeight={500} fontSize={20} mb={2}>
            Billing & Shipping Information
          </Typography>
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="Lysa (Thao)"
            autoComplete="first name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Phan"
            autoComplete="last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="apartmemt-name" required>
            Phone Number
          </FormLabel>
          <OutlinedInput
            id="phone-number"
            name="phone-number"
            type="phone-number"
            placeholder="0909#####"
            autoComplete="phone number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="apartmemt-name">Apartment / Company</FormLabel>
          <OutlinedInput
            id="apartment-company"
            name="apartment-company"
            type="apartment-company"
            placeholder="Unit number, name (optional)"
            autoComplete="apartment company"
            value={apartment}
            onChange={(e) => setAppartment(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address1" required>
            Address line 1
          </FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            type="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            required
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address2">Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            placeholder="Ward, suite, etc. (optional)"
            autoComplete="shipping address-line2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="suburb" required>
            Suburb / District
          </FormLabel>
          <OutlinedInput
            id="suburb"
            name="suburb"
            type="suburb"
            placeholder="Dinsdale"
            autoComplete="Suburb"
            required
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="city"
            placeholder="Hamilton"
            autoComplete="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoFocus
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="region" required>
            Region / State
          </FormLabel>
          <OutlinedInput
            id="region"
            name="region"
            type="region"
            placeholder="Waikato"
            autoComplete="region"
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            placeholder="New Zealand"
            autoComplete="shipping country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            autoFocus
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Save this address for faster checkout next time"
          />
        </FormGrid>
      </Grid>
    </Box>
  );
}
