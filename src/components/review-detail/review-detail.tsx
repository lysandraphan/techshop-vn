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
  const formatDate = (date: string) => {
    date = new Date(Date.parse(date)).toDateString(); // format: Tue Jul 16 2024
    const tempDate = date.split(" ");
    const reviewDate = "• " + tempDate[1] + " " + tempDate[2] + ", " + tempDate[3];

    return reviewDate;
  };

  return (
    <Stack spacing={1} bgcolor="primary.light" p={2} borderRadius={3} my={2}>
      <Stack direction="row" alignItems="center">
        <Avatar sx={{ width: 30, height: 28 }}>
          {review.userFullname
            ? review.userFullname[0].toLocaleUpperCase()
            : "A"}
        </Avatar>
        <Typography fontWeight={600} fontSize={16} mx={1} mb={-0.5}>
          {review.userFullname ? review.userFullname : "Anonymous User"}
        </Typography>
        <Typography color="primary.dark" fontSize={12} mb={-0.7}>
          {formatDate(review.rateTime)}
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
