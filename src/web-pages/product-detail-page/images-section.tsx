import { Fragment, useState } from "react";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
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
  // -------------------------- STATE --------------------------
  const [largeImage, setLargeImage] = useState(mainImage);
  const [sideImages, setSideImages] = useState(otherImages);

  // -------------------------- FUNCTION --------------------------
  const swapImagesHandler = (selected: string, index: number) => {
    setLargeImage(selected);
    setSideImages((prev) => {
      prev[index] = largeImage;
      return prev;
    });
  };

  // -------------------------- MAIN --------------------------
  return (
    <Fragment>
      <Grid item md={2}>
        <Stack direction="column" spacing={5}>
          {sideImages &&
            sideImages.map((image, index) => (
              <Box
                key={image}
                onClick={() => swapImagesHandler(image, index)}
                sx={{ cursor: "pointer" }}
              >
                <CustomImage src={image} alt={name} width={110} height={85} />
              </Box>
            ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={5}
        direction="column"
        display="flex"
        alignSelf="center"
        justifyItems="center"
      >
        {largeImage && (
          <CustomImage src={largeImage} alt={name} width="80%" height={350} />
        )}
      </Grid>
    </Fragment>
  );
}
