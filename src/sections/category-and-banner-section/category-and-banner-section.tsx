import { useRouter } from "next/navigation";
import Carousel from "react-material-ui-carousel/dist/components/Carousel";

// internal
import { BannerData } from "@/interface";
import { useAppSelector } from "@/redux/hooks";
import { getCategoryRoute } from "@/redux/features/categories-slice";

// mui
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// component
import CustomImage from "@/components/custom-image/custom-image.component";

export default function CategoryAndBannerSection({
  banners,
}: {
  banners: BannerData[];
}) {
  // -------------------------- VAR --------------------------
  const categories = useAppSelector((state) => state.categories.categories);

  const history = useRouter();

  // -------------------------- MAIN --------------------------
  return (
    <Stack
      direction="row"
      divider={<Divider flexItem orientation="vertical" sx={{ mr: 5 }} />}
    >
      <MenuList sx={{ mt: 3 }}>
        {categories && categories.map((category) => (
          <MenuItem
            key={category.categoryId}
            disableGutters
            onClick={() =>
              history.push(`/categories/${getCategoryRoute(category.name)}`)
            }
          >
            <ListItemText>{category.name}</ListItemText>
            <ListItemIcon sx={{ ml: 3 }}>
              <ChevronRightRoundedIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>
        ))}
      </MenuList>
      <Carousel
        sx={{ flex: 1, mt: 5 }}
        indicatorContainerProps={{
          style: {
            position: "relative",
            marginTop: -40,
            zIndex: 1,
          },
        }}
      >
        {banners.map((banner) => (
          <CustomImage
            key={banner.id}
            height={350}
            src={banner.imagePath}
            alt={banner.alt}
          />
        ))}
      </Carousel>
    </Stack>
  );
}
