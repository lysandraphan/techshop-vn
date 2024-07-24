import { useEffect, useState } from "react";

// mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "@/redux/hooks";

export default function EditProfileSection() {
  // -------------------------- STATE --------------------------
  const [email, setEmail] = useState("");
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

  // -------------------------- VAR --------------------------
  const labelColorSX = { color: "rgba(0, 0, 0, 0.6)" };

  const user = useAppSelector((state) => state.user.user);

  // -------------------------- FUNCTION --------------------------
  const submitHandler = () => {};

  useEffect(() => {
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phoneNumber);
    setAppartment(user.apartment);
    setAddressLine1(user.addressLine1);
    setAddressLine2(user.addressLine2);
    setSuburb(user.suburb);
    setCity(user.city);
    setRegion(user.region);
    setCountry(user.country);
  }, [user]);

  // -------------------------- MAIN --------------------------
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: 1,
      }}
      component="form"
      id="edit-user-info-form"
      onSubmit={submitHandler}
    >
      <Grid container spacing={3} mb={7} px={5} pt={4}>
        <Grid item xs={12} md={12}>
          <Typography fontWeight={500} fontSize={20} mb={2}>
            Billing & Shipping Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography sx={labelColorSX}>First name</Typography>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            autoComplete="first name"
            required
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography sx={labelColorSX}>Last name</Typography>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            autoComplete="last name"
            required
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={labelColorSX}>Email</Typography>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={labelColorSX}>Phone number</Typography>
          <OutlinedInput
            id="phone-number"
            name="phone-number"
            type="phone-number"
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
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Address line 1</Typography>
          <OutlinedInput
            id="address1"
            name="address1"
            type="address1"
            autoComplete="shipping address-line1"
            required
            fullWidth
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Address line 2</Typography>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            autoComplete="shipping address-line2"
            fullWidth
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Suburb / District</Typography>
          <OutlinedInput
            id="suburb"
            name="suburb"
            type="suburb"
            autoComplete="shipping suburb"
            required
            fullWidth
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>City</Typography>
          <OutlinedInput
            id="city"
            name="city"
            type="city"
            autoComplete="shipping city"
            required
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Region / State</Typography>
          <OutlinedInput
            id="region"
            name="region"
            type="region"
            autoComplete="region"
            required
            fullWidth
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={labelColorSX}>Country</Typography>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            autoComplete="shipping country"
            required
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            mt={1}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ py: 1.5, width: "30%" }}
              type="submit"
            >
              Update
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
