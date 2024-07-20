"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import axios from "axios";

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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// component
import CustomImage from "@/components/custom-image/custom-image.component";
import { signInApi } from "@/api";

// EXPORT DEFAULT
export default function Login() {
  // -------------------------- STATE --------------------------
  const [showPassword, setShowPassword] = useState(false);
  // const [username, setShowPassword] = useState(false);
  // const [password, setShowPassword] = useState(false);

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
    // console.log({
    //   username: data.get("username"),
    //   password: data.get("password"),
    // });
    try {
      const response = await axios.post(signInApi, {
        username: data.get("username"),
        password: data.get("password"),
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signInHandler = () => {};

  // -------------------------- MAIN --------------------------
  return (
    <Container>
      <Grid container spacing={7} py={3} alignItems="center">
        <Grid item md={7}>
          <CustomImage src="/side-image.png" alt="Side Image" height="70vh" />
        </Grid>
        <Grid item md={5}>
          <Typography variant="h4" mb={2}>
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={signInSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* <Grid item md={5}>
          <Typography variant="h4" mb={5}>
            Log In
          </Typography>
          <Stack spacing={3}>
            <Input placeholder="Username"  />
            <Input
              placeholder="Password"
              id="standard-adornment-password"
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
          </Stack>
          <Stack spacing={3} mt={4}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={signInHandler}
            >
              Log in
            </Button>
          </Stack>

          <Stack alignItems="center" my={5}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              py={2}
            >
              <Typography>New to TechShop?</Typography>
              <Link
                href="/signup"
                component={NextLink}
                ml={2}
                fontWeight={500}
                fontSize={18}
              >
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
        </Grid> */}
      </Grid>
    </Container>
  );
}
