"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NextLink from "next/link";
import axios from "axios";

// internal
import { forgotPasswordApi } from "@/api";

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

// EXPORT DEFAULT
export default function ForgotPassword() {
  // -------------------------- STATE --------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- FUNCTION --------------------------
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const emailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const newPassword = data.get("password") as string;
    try {
      setIsLoading(true);
      await axios.post(forgotPasswordApi, {
        email,
        newPassword,
      });
      toast.success("Succesfully signed up.");
      setIsLoading(false);
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
          <Typography variant="h5" mb={2} fontWeight={500}>
            Forgot Password?
          </Typography>
          <Typography mb={4} fontSize={13}>
            Enter the email address associated with your account.
          </Typography>
          <Stack
            component="form"
            id="forget-password-form"
            onSubmit={emailSubmit}
            spacing={4}
          >
            <Input
              placeholder="Email"
              type="email"
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Input
              placeholder="New Password"
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
            {isLoading ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>Sending Email</span>
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Send Email
              </Button>
            )}
          </Stack>
          <Stack alignItems="center" my={5}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              py={2}
            >
              <Typography fontSize={14}>Already have an account?</Typography>
              <Link href="/login" component={NextLink} ml={2} fontSize={18}>
                Log In
              </Link>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              py={2}
            >
              <Typography fontSize={14}>New to TechShopVn?</Typography>
              <Link href="/signup" component={NextLink} ml={2} fontSize={18}>
                Create account
              </Link>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
