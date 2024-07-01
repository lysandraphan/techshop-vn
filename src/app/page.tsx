import CategorySection from "@/components/category-section/category-section.component";

import "./page.module.css";

//mui
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Container className="layout-container">
      <CategorySection />
      <Stack direction="row" mt={5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 20,
            height: 45,
            borderRadius: 1,
            bgcolor: "secondary.main",
          }}
        />
        <Typography variant="h6" color="secondary" ml={1}>
          This Month
        </Typography>
      </Stack>
    </Container>
  );
}
