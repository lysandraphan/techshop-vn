"use client";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RatingInfo from "@/components/rating-info/rating-info";
import TabPanel from "@/components/tab-panel/tab-panel";
import ProductDescription from "@/components/product-description/product-description";

// interface
interface MoreDetailSectionProps {
  description: string;
  ratingScore: number;
  ratingTotal: number;
}

// EXPORT DEFAULT
export default function MoreDetailSection({
  description,
  ratingScore,
  ratingTotal,
}: MoreDetailSectionProps) {
  // -------------------------- STATE --------------------------
  const [value, setValue] = useState(0);

  // -------------------------- FUNCTION --------------------------
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  // -------------------------- MAIN --------------------------
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.dark",
        borderRadius: 2,
        mt: 7,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="DESCRIPTION" />
        <Tab label="REVIEW" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <ProductDescription description={description} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RatingInfo ratingScore={ratingScore} ratingTotal={ratingTotal} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}