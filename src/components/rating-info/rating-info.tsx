// mui
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

// rating
interface RatingInfoProps {
  ratingScore: number;
  ratingTotal: number;
}

export default function RatingInfo({
  ratingScore,
  ratingTotal,
}: RatingInfoProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: 1,
        mt: 0.7,
      }}
    >
      <Rating
        name="text-feedback"
        value={ratingScore}
        readOnly
        precision={0.5}
        sx={{ fontSize: 20 }}
        emptyIcon={
          <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
        }
      />
      <Box sx={{ ml: 0.7, mb: -0.3, fontSize: 14, color: "primary.dark" }}>({ratingTotal})</Box>
    </Box>
  );
}
