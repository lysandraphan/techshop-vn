// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface TextInfoProps {
  fz?: number;
  label: string;
  text: string;
}

export default function TextInfo({ fz = 14, label, text }: TextInfoProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography fontWeight={500} fontSize={fz}>
        {label}:
      </Typography>
      <Typography fontSize={fz}> {text}</Typography>
    </Stack>
  );
}
