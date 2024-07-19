"use client";
import { useEffect, useState } from "react";
import lodash from "lodash";
import RatingSummary from "@keyvaluesystems/react-star-rating-summary";

// internal
import { ReviewData, ReviewSummaryData } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSortReviewOrder,
  SortReviewType,
} from "@/redux/features/sort-slice";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
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
  // -------------------------- STATE --------------------------
  const [reviewList, setReviewList] = useState<ReviewData[] | undefined>(
    reviews
  );

  // -------------------------- VAR --------------------------
  const sortReviewOrder = useAppSelector((state) => state.sort.sortReviewOrder);

  const dispatch = useAppDispatch();

  const fzSX = { fontSize: 16 };
  
  // -------------------------- FUNCTION --------------------------
  const selectSortHandler = (event: SelectChangeEvent) => {
    dispatch(setSortReviewOrder(event.target.value as SortReviewType));
  };

  // Sort Review
  const sortReviews = (sortReviewOrder: SortReviewType | undefined) => {
    if (!reviews || reviews.length === 0 || sortReviewOrder === "default")
      return;
    sortReviewOrder === "lowest" &&
      setReviewList(lodash.orderBy(reviews, ["score"], ["asc"]));
    sortReviewOrder === "highest" &&
      setReviewList(lodash.orderBy(reviews, ["score"], ["desc"]));
    sortReviewOrder === "recent" &&
      setReviewList(lodash.orderBy(reviews, ["rateTime"], ["desc"]));
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(setSortReviewOrder("default"));
  }, []);

  useEffect(() => {
    sortReviews(sortReviewOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortReviewOrder]);

  // -------------------------- MAIN --------------------------
  if (!reviews || reviews.length === 0)
    return <LoadingFallback message="No Reviews Found." />;
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={18} fontWeight={600} mb={-1.5}>
          1-3 of 3 Reviews
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 170 }}>
          <Select
            value={sortReviewOrder}
            onChange={selectSortHandler}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              fontSize: 12,
              color: "primary.dark",
              "& .MuiSelect-select": {
                pl: 2,
                py: 1.5,
              },
            }}
          >
            <MenuItem value="default" disabled sx={fzSX}>
              Sort by
            </MenuItem>
            <MenuItem value="recent" sx={fzSX}>
              Most Recent
            </MenuItem>
            <MenuItem value="highest" sx={fzSX}>
              Highest Rating
            </MenuItem>
            <MenuItem value="lowest" sx={fzSX}>
              Lowest Rating
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {reviewList &&
        reviewList.map((review) => (
          <ReviewDetail key={review.id} review={review} />
        ))}
    </Stack>
  );
}
