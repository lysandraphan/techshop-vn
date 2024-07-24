"use client";
import { useRouter } from "next/navigation";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function ResetPasswordSuccess() {
  const router = useRouter();
  return (
    <Container>
      <Stack justifyContent="center" alignItems="center" mt={10}>
        <CheckCircleOutlineOutlinedIcon
          sx={{ fontSize: 80, color: "#2DB224" }}
        />
        <Typography
          mt={5}
          mb={2}
          fontSize={20}
          fontWeight={500}
          textAlign="center"
        >
          Successfully reset your password.
        </Typography>
        <Typography mb={5} textAlign="center">
          Enjoy online shopping at TechShopVN with various tech product.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ py: 1, px: 3 }}
            startIcon={<HomeIcon />}
            onClick={() => router.push("/")}
          >
            Home Page
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
