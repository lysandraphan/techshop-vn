"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Carousel from "react-material-ui-carousel/dist/components/Carousel";

//mui
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface CategoryData {
  categoryId: number;
  name: string;
  imagePath: string;
  deletedAt: null;
  quantityProduct: number;
}

export default function CategorySection() {
  // -------------------------- STATE --------------------------
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const history = useRouter();

  const url = "https://g5-likelion-ecommerce.onrender.com/categories/all";

  //test data
  var items = [
    {
      src: "/banner-1.jpg",
      alt: "Advertisement Banner 1",
    },
    {
      src: "/banner-2.jpg",
      alt: "Advertisement Banner 2",
    },
    {
      src: "/banner-3.jpg",
      alt: "Advertisement Banner 3",
    },
  ];

  // -------------------------- FUNCTION --------------------------
  async function getCategories() {
    try {
      setIsLoading(true);
      const response = await axios.get<CategoryData[]>(url);
      const result = response.data;
      setCategories(result);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  }

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    getCategories();
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Stack
      direction="row"
      divider={<Divider flexItem orientation="vertical" sx={{ mr: 5 }} />}
    >
      <MenuList sx={{ mt: 3 }}>
        {categories?.map((category) => {
          const categoryRoute = category.name
            .toLocaleLowerCase()
            .replace(/ /g, "-");
          return (
            <MenuItem
              key={category.categoryId}
              disableGutters
              onClick={() => history.push(`/categories/${categoryRoute}`)}
            >
              <ListItemText>{category.name}</ListItemText>
              <ListItemIcon sx={{ ml: 3 }}>
                <ChevronRightRoundedIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          );
        })}
      </MenuList>
      <Carousel sx={{ flex: 1, mt: 5 }}>
        {items.map((item, index) => (
          <Image
            key={index}
            src={item.src}
            alt={item.alt}
            width={1000}
            height={350}
          />
        ))}
      </Carousel>
    </Stack>
  );
}
