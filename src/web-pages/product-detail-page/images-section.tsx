// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// component
import CustomImage from "@/components/custom-image/custom-image.component";
import { Fragment } from "react";

// interface
interface ImageSectionProps {
  mainImage: string;
  images: string[];
  name: string;
}

export default function ImageSection({
  mainImage,
  images,
  name,
}: ImageSectionProps) {
  return (
    <Fragment>
      <Grid item md={2}>
        <Stack
          direction="column"
          spacing={5}
        >
          {images &&
            images.map((image, index) => (
              <CustomImage
                key={index}
                src={image}
                alt={name}
                width={130}
                height={100}
              />
            ))}
        </Stack>
      </Grid>
      <Grid item md={5} direction="column" alignSelf="center">
        <CustomImage src={mainImage} alt={name} height={350} />
      </Grid>
    </Fragment>
  );
}