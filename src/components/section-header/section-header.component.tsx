//mui
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface SectionHeaderProps {
  smallHeader: string;
  largeHeader: string;
}

export default function SectionHeader({
  smallHeader,
  largeHeader,
}: SectionHeaderProps) {
  return (
    <Stack direction="row" sx={{ alignItems: "flex-end" }}>
      <Container disableGutters>
        <Stack direction="row" mt={10} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 20,
              height: 45,
              borderRadius: 1,
              bgcolor: "secondary.main",
            }}
          />
          <Typography variant="h6" color="secondary" ml={1} fontSize={15}>
            {smallHeader}
          </Typography>
        </Stack>
        <Typography variant="h4" mt={2} fontWeight={500}>
          {largeHeader}
        </Typography>
      </Container>
      <Container disableGutters sx={{ flex: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "max-content", px: 4, py: 1 }}
        >
          View All
        </Button>
      </Container>
    </Stack>
  );
}
