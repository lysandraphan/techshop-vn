import RatingSummary from "@keyvaluesystems/react-star-rating-summary";

// internal
import { ReviewData } from "@/interface";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Avatar from "@mui/material/Avatar";

// component
import LoadingFallback from "@/components/loading-fallback/loading-fallback.component";
import { Container } from "@mui/material";

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
  const ratingValues = {
    5: 2,
    4: 0,
    3: 1,
    2: 0,
    1: 0,
  };

  //   if (!reviews || reviews.length === 0)
  //     return <LoadingFallback message="No Reviews Found." />;
  return (
    <Stack>
      <Container maxWidth="xs" sx={{ my: 3 }}>
        <RatingSummary
          ratings={ratingValues}
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
      <Stack spacing={1} bgcolor="primary.light" p={2} borderRadius={3} my={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 30, height: 28 }}>T</Avatar>
          <Typography fontWeight={600}>Thao P.</Typography>
        </Stack>
        <Rating
          name="text-feedback"
          value={5}
          readOnly
          precision={0.5}
          sx={{ fontSize: 20 }}
          emptyIcon={
            <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
          }
        />
        <Typography>
          This camera is awesome! Small size, lightweight and waterproof
          capability. Plus, so easy to use! I can take it everywhere I go
          without the worry of damage. Picture quality is excellent and having
          the displays on the camera gives you the confidence to get the perfect
          shot!
        </Typography>
      </Stack>
      <Stack spacing={1} bgcolor="primary.light" p={2} borderRadius={3} my={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 30, height: 28 }}>L</Avatar>
          <Typography fontWeight={600}>Lysa L.</Typography>
        </Stack>
        <Rating
          name="text-feedback"
          value={5}
          readOnly
          precision={0.5}
          sx={{ fontSize: 20 }}
          emptyIcon={
            <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
          }
        />
        <Typography>
          If you are looking for a high quality, compact, budget friendly, easy
          to use action camera; then look no further my friend. Right off the
          bat, once you open the box, Akaso gives you about 90% of the equipment
          you will need to place the camera pretty much anywhere. I absolutely
          love the wireless wrist remote, which comes in handy when you are in
          the middle of your activity. They even give you an extra battery so
          you can keep the action going without waiting for a full charge. Brave
          8 Lite feels durable and sturdy so you know it can survive a harsh
          fall incase you drop it by accident. The video looks absolutely
          incredible, especially when you have it set to 4K at 60 frames per
          second, and I love all the different options you have from HDR,
          time-lapse, slow motion, etc. One of the best parts I think is the
          AKASO GO App. Not only are you able to control Brave 8 Lite with your
          phone, but you are able to edit videos on the go with the App. It is
          so convenient and useful especially when you have to post on social
          medial right away. I also gotta mention the Akaso App community is
          awesome!
        </Typography>
      </Stack>
      <Stack spacing={1} bgcolor="primary.light" p={2} borderRadius={3} my={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 30, height: 28 }}>M</Avatar>
          <Typography fontWeight={600}>Min A.</Typography>
        </Stack>
        <Rating
          name="text-feedback"
          value={3.5}
          readOnly
          precision={0.5}
          sx={{ fontSize: 20 }}
          emptyIcon={
            <StarRateRoundedIcon style={{ opacity: 0.55 }} fontSize="inherit" />
          }
        />
        <Typography>
          I was excited to try this camera. As soon as it came out of the box,
          all of the background on the image screen was a pink/purple haze. I
          then did a test recording to see if it was just the view finder and
          the recording was pink/purple as well. I even did a factory reset to
          no avail. I know there is a dive setting on some of the other devices,
          but not this one. Maybe I go unlucky with a faulty device, but this is
          going back.
        </Typography>
      </Stack>
    </Stack>
  );
}
