"use client";
import { useState } from "react";

// mui
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@/components/tab-panel/tab-panel";

// component
import ProductDescription from "./components/product-description";
import ProductReview from "./components/product-review";
import { ReviewData } from "@/interface";

// interface
interface MoreDetailSectionProps {
  description: string;
  reviews: ReviewData[] | undefined;
  ratingScore: number;
  ratingTotal: number;
}

// EXPORT DEFAULT
export default function MoreDetailSection({
  description,
  reviews,
  ratingScore,
  ratingTotal,
}: MoreDetailSectionProps) {
  // -------------------------- STATE --------------------------
  const [tabValue, setTabValue] = useState(0);

  // -------------------------- FUNCTION --------------------------
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        value={tabValue}
        onChange={handleChange}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="DESCRIPTION" />
        <Tab label="REVIEW" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <ProductDescription description={description} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ProductReview
          reviews={reviews}
          ratingScore={ratingScore}
          ratingTotal={ratingTotal}
        />
      </TabPanel>
    </Box>
  );
}
