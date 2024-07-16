// mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LoopIcon from "@mui/icons-material/Loop";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Divider from "@mui/material/Divider";

export default function DeliveryInfoBox() {
  return (
    <Stack
      divider={<Divider flexItem sx={{ my: 2, mx: 0 }} />}
      sx={{
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: "3px",
        px: 3,
        py: 2,
      }}
    >
      <Box>
        <Stack direction="row" spacing={3} alignItems="center">
          <LocalShippingOutlinedIcon fontSize="large" />
          <Stack>
            <Typography variant="h6" fontSize={16}>
              Free Delivery
            </Typography>
            <Typography fontSize={14}>
              Enter your postal code for Delivery Avaibility
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" spacing={3} alignItems="center">
          <LoopIcon fontSize="large" />
          <Stack>
            <Typography variant="h6" fontSize={16}>
              Free Delivery
            </Typography>
            <Typography fontSize={14}>
              Enter your postal code for Delivery Avaibility
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
