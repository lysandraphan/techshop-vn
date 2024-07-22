"use client"

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

export default function ProductInCart() {
  return (
    <Stack direction="row" mt={2} mb={3}>
      <Grid container spacing={5} p={3} pr={6}>
        <Grid item md={7}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomImage
              src="/product.webp"
              alt="product"
              width={50}
              height={50}
              mb={2}
            />
            <Typography fontSize={16}>
              Olympus Tough TG-6 Waterproof Camera, Red
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={2} alignSelf="center">
          <Typography textAlign="center">$650</Typography>
        </Grid>
        <Grid item md={2} alignSelf="center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <IconButton aria-label="delete" size="small">
              <ChevronLeftIcon fontSize="inherit" />
            </IconButton>
            <Typography textAlign="center">2</Typography>
            <IconButton aria-label="delete" size="small">
              <ChevronRightIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item md={1} alignSelf="center">
          <Typography textAlign="center">$1,300</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
