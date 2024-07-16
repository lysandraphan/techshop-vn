// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

interface IconTextProps {
  icon: JSX.Element;
  fz?: number;
  text: string;
}

export default function IconText({ icon, fz = 14, text }: IconTextProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton color="secondary" sx={{ minHeight: 0, minWidth: 0, p: 0 }}>
        {icon}
      </IconButton>
      <Typography fontSize={fz}>{text}</Typography>
    </Stack>
  );
}
