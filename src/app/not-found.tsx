// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";

export default function Error404() {
  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" mt={10}>
        <ErrorIcon color="secondary" sx={{ fontSize: 80 }} />
        <Typography
          mt={5}
          mb={2}
          fontSize={20}
          fontWeight={500}
          textAlign="center"
        >
          Page Not Found
        </Typography>
        <Typography mb={5} textAlign="center">
          The page you try to access cannot be found. Please try another page.
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ py: 1, px: 5 }}
          startIcon={<HomeIcon />}
        >
          Home Page
        </Button>
      </Stack>
    </Container>
  );
}
