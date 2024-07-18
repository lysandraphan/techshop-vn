import { useEffect } from "react";
import RatingSummary from "@keyvaluesystems/react-star-rating-summary";

// internal
import { ReviewData, ReviewSummaryData } from "@/interface";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import { Container } from "@mui/material";
import ReviewDetail from "@/components/review-detail/review-detail";

// interface
interface ProductReviewProps {
  reviews: ReviewData[] | undefined;
  reviewSummary: ReviewSummaryData | undefined;
}

export default function ProductReview({
  reviews,
  reviewSummary,
}: ProductReviewProps) {

  // -------------------------- MAIN --------------------------
  //   if (!reviews || reviews.length === 0)
  //     return <LoadingFallback message="No Reviews Found." />;
  return (
    <Stack>
      <Container maxWidth="xs" sx={{ my: 3 }}>
        <RatingSummary
          ratings={reviewSummary}
          barColors={{
            5: "#FAAF00",
            4: "#FAAF00",
            3: "#FAAF00",
            2: "#FAAF00",
            1: "#FAAF00",
          }}
          ratingAverageIconProps={{
            fillColor: "#FAAF00",
          }}
          renderLabel={(ratingId: string) => (
            <Stack direction="row">
              <StarRateRoundedIcon
                style={{ opacity: 0.55 }}
                fontSize="inherit"
                sx={{ color: "#f98000" }}
              />
              <Typography ml={0.3} mr={1} fontSize={12}>
                {ratingId}
              </Typography>
            </Stack>
          )}
        />
      </Container>
   
      {reviews &&
        reviews.map((review) => (
          <ReviewDetail key={review.id} review={review} />
        ))}
    </Stack>
  );
}
