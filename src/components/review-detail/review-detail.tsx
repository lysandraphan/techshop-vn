// internal
import { ReviewData } from "@/interface";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Avatar from "@mui/material/Avatar";

interface ReviewDetailProps {
  review: ReviewData;
}

export default function ReviewDetail({ review }: ReviewDetailProps) {
  return (
    <Stack spacing={1} bgcolor="primary.light" p={2} borderRadius={3} my={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ width: 30, height: 28 }}>
          {review.userFullname
            ? review.userFullname[0].toLocaleUpperCase()
            : "A"}
        </Avatar>
        <Typography fontWeight={600}>
          {review.userFullname ? review.userFullname : "Anonymous User"}
        </Typography>
      </Stack>
      <Rating
        name="text-feedback"
        value={review.score}
        readOnly
        precision={0.5}
        sx={{ fontSize: 20 }}
        emptyIcon={
          <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
        }
      />
      <Typography>{review.comment}</Typography>
    </Stack>
  );
}
