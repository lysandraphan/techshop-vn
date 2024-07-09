"use client";

// mui
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { selectCategory } from "@/redux/features/categories-slice";

export default function FilterSection({ categoryId }: { categoryId: number }) {
  const [value, setValue] = useState("female");
  const categories = useAppSelector((state) => state.categories.categories);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
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
        <FormLabel id="demo-controlled-radio-buttons-group">CATEGORY</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <FormControlLabel
              key={category.categoryId}
              value={category.name}
              control={<Radio size="small" />}
              label={category.name}
              sx={{ fontSize: 10 }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
