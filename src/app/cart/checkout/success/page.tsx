// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

export default function OrderSuccess() {
  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" mt={10}>
        <CheckCircleIcon color="secondary" sx={{ fontSize: 80 }} />
        <Typography
          mt={5}
          mb={2}
          fontSize={20}
          fontWeight={500}
          textAlign="center"
        >
          Your order is successfully placed.
        </Typography>
        <Typography mb={5} textAlign="center">
          Thank you for your purchase! Please check your email for order
          confirmation.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ py: 1, px: 3 }}
            startIcon={<HomeIcon />}
          >
            Home Page
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ py: 1, px: 3 }}
            endIcon={<ChecklistRtlIcon />}
          >
            View Order
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
