"use client";

//mui
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <footer>
      <Stack
        direction="column"
        bgcolor="#000"
        alignItems="center"
        py={2}
        color="primary.contrastText"
        divider={
          <Divider
            flexItem
            sx={{ mt: 3, mb: 3, backgroundColor: "primary.light" }}
          />
        }
      >
        <Container>
          <Grid container columnSpacing={10} mt={2} mb={1}>
            <Grid item md={4}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h5" fontWeight={600}>
                  TechShopVN
                </Typography>
                <Typography fontSize={14}>
                  111 Ho Chi Minh City, Vietnam
                </Typography>
                <Typography fontSize={14}>techshopvn@support.com</Typography>
                <Typography fontSize={14}>+84 999 999</Typography>
              </Stack>
            </Grid>
            <Grid item md={2.5}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h6" fontSize={18} fontWeight={600}>
                  Support
                </Typography>
                <Typography fontSize={14}>About</Typography>
                <Typography fontSize={14}>Contact</Typography>
              </Stack>
            </Grid>
            <Grid item md={2.5}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h6" fontSize={18} fontWeight={600}>
                  Quick Links
                </Typography>

                <Typography fontSize={14}>Privacy Policy</Typography>
                <Typography fontSize={14}>Terms Of Use</Typography>
                <Typography fontSize={14}>FAQ</Typography>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <Stack direction="column" spacing={1} alignItems="flex-start">
                <Typography variant="h6" fontSize={18} fontWeight={600}>
                  Stay Connected
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton sx={{ color: "white", pl: 0 }} onClick={() => {}}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton sx={{ color: "white" }} onClick={() => {}}>
                    <InstagramIcon />
                  </IconButton>
                  <IconButton sx={{ color: "white" }} onClick={() => {}}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton sx={{ color: "white" }} onClick={() => {}}>
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <Typography fontSize={12} mb={2}>
          Copyright 2024. All right reserved.
        </Typography>
      </Stack>
    </footer>
  );
}
