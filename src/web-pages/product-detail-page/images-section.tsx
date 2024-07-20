import Carousel from "react-material-ui-carousel/dist/components/Carousel";

// mui
import Box from "@mui/material/Box";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

// interface
interface ImageSectionProps {
  mainImage: string;
  otherImages: string[];
  name: string;
}

// EXPORT DEFAULT
export default function ImageSection({
  mainImage,
  otherImages,
  name,
}: ImageSectionProps) {
  // -------------------------- VAR --------------------------
  const images = [mainImage, ...otherImages];

  // -------------------------- MAIN --------------------------
  return (
    <Carousel
      duration={1000}
      navButtonsAlwaysVisible
      navButtonsProps={{
        style: {
          backgroundColor: "#878686",
        },
      }}
      indicatorContainerProps={{
        style: {
          position: "relative",
          marginTop: 40,
          zIndex: 1,
        },
      }}
    >
      {images.map((image) => (
        <Box
          key={image}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CustomImage src={image} alt={name} width="80%" height={400} />
        </Box>
      ))}
    </Carousel>
  );
}
