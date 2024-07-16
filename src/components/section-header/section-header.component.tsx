//mui
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface SectionHeaderProps {
  smallHeader: string;
  largeHeader?: string;
  noButton?: boolean;
}

export default function SectionHeader({
  smallHeader,
  largeHeader,
  noButton,
}: SectionHeaderProps) {
  return (
    <Stack direction="row" alignItems="flex-end">
      <Container disableGutters>
        <Stack direction="row" mt={10} alignItems="center">
          <Box
            sx={{
              width: 20,
              height: 45,
              borderRadius: 1,
              bgcolor: "secondary.main",
            }}
          />
          <Typography
            variant="h6"
            color="secondary"
            ml={1}
            fontSize={16}
            fontWeight={600}
            sx={{ letterSpacing: 1, wordSpacing: 3 }}
          >
            {smallHeader}
          </Typography>
        </Stack>
        {largeHeader && (
          <Typography
            variant="h4"
            mt={2}
            fontWeight={500}
            sx={{ letterSpacing: 0.5, wordSpacing: 3 }}
          >
            {largeHeader}
          </Typography>
        )}
      </Container>
      {!noButton && (
        <Container disableGutters sx={{ flex: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "max-content", px: 4, py: 1, mb: 1 }}
          >
            View All
          </Button>
        </Container>
      )}
    </Stack>
  );
}
