"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";

//mui
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Image from "next/image";
import Carousel from "react-material-ui-carousel/dist/components/Carousel";
import Container from "@mui/material/Container";


interface CategoryData {
  categoryId: number;
  name: string;
  imagePath: string;
  deletedAt: null;
  quantityProduct: number;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useRouter();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<CategoryData[]>(
          "https://g5-likelion-ecommerce.onrender.com/categories/all"
        );

        if (response) {
          const result = response.data;
          setCategories(result);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack direction="row">
      <MenuList sx={{ mt: 3 }}>
        {categories.map((category, i) => {
          const categoryRoute = category.name
            .toLocaleLowerCase()
            .replace(/ /g, "-");
          return (
            <MenuItem
              key={i}
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
      <Divider flexItem orientation="vertical" sx={{ mr: 5 }}></Divider>
      <Carousel sx={{ flex: 1, mt: 4 }}>
        {items.map((item, index) => (
          <Container key={index} disableGutters>
            <Image src={item.src} alt={item.alt} width={880} height={350} />
          </Container>
        ))}
      </Carousel>
    </Stack>
  );
}
