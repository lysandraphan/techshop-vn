//mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <footer>
      <Stack
        direction="row"
        bgcolor="#000"
        justifyContent="center"
        py={2}
      >
        <Typography fontSize={14} color="primary.contrastText">
          Copyright 2024. All right reserved.
        </Typography>
      </Stack>
    </footer>
  );
}
