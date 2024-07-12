"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import Carousel from "react-material-ui-carousel/dist/components/Carousel";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CategoryData,
  getCategoryRoute,
} from "@/redux/features/categories-slice";
import { BannerData, fetchBanners } from "@/redux/features/banners-slice";

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

const CategoryAndBannerSection = () => {
  // -------------------------- VAR --------------------------
  const categories = useAppSelector((state) => state.categories.categories);
  const isLoading = useAppSelector((state) => state.categories.isLoading);
  const banners = useAppSelector((state) => state.banners.banners);

  const history = useRouter();

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchBanners())
  // }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Stack
      direction="row"
      divider={<Divider flexItem orientation="vertical" sx={{ mr: 5 }} />}
    >
      <MenuList sx={{ mt: 3 }}>
        {categories &&
          categories.map((category: CategoryData) => (
            <MenuItem
              key={category.categoryId}
              disableGutters
              onClick={() =>
                history.push(
                  getCategoryRoute(category.name, category.categoryId)
                )
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
        {banners.map((banner: BannerData) => (
          <CustomImage
            key={banner.id}
            height={300}
            src={banner.imagePath}
            alt={banner.alt}
          />
        ))}
      </Carousel>
    </Stack>
  );
};

export default CategoryAndBannerSection;
