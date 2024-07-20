"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signIn } from "@/redux/features/user-slice";

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
export default function Login() {
  // -------------------------- STATE --------------------------
  const [showPassword, setShowPassword] = useState(false);

  // -------------------------- VAR --------------------------
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  const router = useRouter();

  // -------------------------- FUNCTION --------------------------
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    dispatch(signIn({ username, password }));
    router.push("/");
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
            Log In
          </Typography>
          <Stack
            component="form"
            id="sign-in-form"
            onSubmit={signInSubmit}
            spacing={4}
          >
            <Input
              placeholder="Username"
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
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
                Log In
              </Button>
            )}
          </Stack>
          <Stack alignItems="center" my={5} spacing={2}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              py={2}
            >
              <Typography>New to TechShopVn?</Typography>
              <Link href="/signup" component={NextLink} ml={2} fontSize={18}>
                Create account
              </Link>
            </Stack>
            <Link
              href="/forget-password"
              component={NextLink}
              underline="none"
              color="primary.dark"
            >
              Forget Password?
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
