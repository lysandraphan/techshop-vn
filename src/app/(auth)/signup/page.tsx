"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NextLink from "next/link";
import axios from "axios";

// internal
import { signUpApi } from "@/api";

// mui
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

export default function Signup() {
  // -------------------------- STATE --------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const router = useRouter();

  // -------------------------- FUNCTION --------------------------
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Sign up
  const signUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const firstName = data.get("firstname") as string;
    const lastName = data.get("lastname") as string;
    const phoneNumber = data.get("phonenumber") as string;
    const password = data.get("password") as string;
    const confirmpassword = data.get("confirmpassword") as string;

    if (password !== confirmpassword) {
      toast.error("Password not match.");
      return;
    }

    if (isNaN(parseInt(phoneNumber))) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Signing up...");
      const response = await axios.post(signUpApi, {
        role: ["USER"],
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });
      toast.success("Succesfully signed up.");
      setIsLoading(false);
      router.push("/login");
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  // -------------------------- MAIN --------------------------
  return (
    <Container>
      <Grid container spacing={7} py={3} alignItems="center">
        <Grid item md={7}>
          <CustomImage src="/side-image.png" alt="Side Image" height="70vh" />
        </Grid>
        <Grid item md={5}>
          <Typography variant="h5" mb={3} fontWeight={500}>
            Sign Up
          </Typography>
          <Stack
            component="form"
            id="sign-up-form"
            onSubmit={signUpSubmit}
            spacing={4}
          >
            <Input
              placeholder="Email"
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <Input
              placeholder="First Name"
              fullWidth
              id="firstname"
              name="firstname"
              autoComplete="firstname"
            />
            <Input
              placeholder="Last Name"
              fullWidth
              id="lastname"
              name="lastname"
              autoComplete="lastname"
            />
            <Input
              placeholder="Phone Number"
              fullWidth
              id="phonenumber"
              name="phonenumber"
              type="tel"
              autoComplete="phonenumber"
            />
            <Input
              placeholder="Password"
              fullWidth
              required
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Input
              placeholder="Confirm Password"
              fullWidth
              required
              name="confirmpassword"
              id="confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {isLoading ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>Log In</span>
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign Up
              </Button>
            )}
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              py={2}
            >
              <Typography>Already have an account?</Typography>
              <Link href="/login" component={NextLink} ml={2} fontSize={18}>
                Log In
              </Link>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
