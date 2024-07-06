// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

interface InfoProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function Info({ src, alt, title, description }: InfoProps) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CustomImage src={src} alt={alt} width={80} height={80} mb={20} />
      <Typography mb={1} fontWeight={600} fontSize={16} textAlign="center">
        {title}
      </Typography>
      <Typography fontSize={12} textAlign="center">
        {description}
      </Typography>
    </Box>
  );
}
