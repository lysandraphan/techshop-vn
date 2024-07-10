"use client";

// mui
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import {
  CategoryData,
  selectCategory,
} from "@/redux/features/categories-slice";
import FilterPrice from "@/components/filter-price/filter-price.component";

interface FilterSectionProps {
  categoryId: number;
  filteredCategory: number;
  changeFilteredCategory: (newFilterCategory: number) => void;
}

export default function FilterSection({
  categoryId,
  filteredCategory,
  changeFilteredCategory,
}: FilterSectionProps) {
  const categories = useAppSelector((state) => state.categories.categories);

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFilteredCategory(parseInt(event.target.value));
  };

  // const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value);
  // };
  console.log(filteredCategory);

  return (
    <Stack
      direction="column"
      divider={
        <Divider
          flexItem
          sx={{ mt: 3, mb: 3, backgroundColor: "primary.light" }}
        />
      }
    >
      <FormControl>
        <Typography mb={2} fontWeight={600}>
          CATEGORY
        </Typography>
        <RadioGroup
          aria-labelledby="category-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={filteredCategory}
          onChange={handleChangeFilter}
        >
          {categories.map((category: CategoryData) => (
            <FormControlLabel
              key={category.categoryId}
              value={category.categoryId}
              control={
                <Radio
                  size="small"
                  checked={category.categoryId === filteredCategory}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 12,
                    },
                  }}
                />
              }
              label={<Typography fontSize={12}>{category.name}</Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FilterPrice />
    </Stack>
  );
}
