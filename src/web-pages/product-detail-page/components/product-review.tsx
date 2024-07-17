// internal
import { ReviewData } from "@/interface";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import RateChart from "@/components/rate-chart/rate-chart";

// interface
interface ProductReviewProps {
  reviews: ReviewData[] | undefined;
  ratingScore: number;
  ratingTotal: number;
}

export default function ProductReview({
  reviews,
  ratingScore,
  ratingTotal,
}: ProductReviewProps) {
  if (!reviews || reviews.length === 0)
    return <LoadingFallback message="No Reviews Found." />;
  return (
    <Grid container columnSpacing={7} mt={1} mb={5}>
      <Grid item md={6}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            {ratingScore}/5
          </Typography>
          <Rating
            name="text-feedback"
            value={ratingScore}
            readOnly
            precision={0.5}
            sx={{ fontSize: 40 }}
            emptyIcon={
              <StarRateRoundedIcon
                style={{ opacity: 0.55 }}
                fontSize="inherit"
              />
            }
          />
          <Typography color="primary.dark">
            {ratingTotal} people rated this product.
          </Typography>
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Stack spacing={2}>
          <RateChart />
        </Stack>
      </Grid>
    </Grid>
  );
}
