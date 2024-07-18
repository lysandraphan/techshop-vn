"use client";
import { useState } from "react";

// internal
import { ReviewData, ReviewSummaryData } from "@/interface";

// mui
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@/components/tab-panel/tab-panel";

// component
import ProductDescription from "./components/product-description";
import ProductReview from "./components/product-review";

// interface
interface MoreDetailSectionProps {
  description: string;
  reviews: ReviewData[] | undefined;
  reviewSummary: ReviewSummaryData | undefined;
}

// EXPORT DEFAULT
export default function MoreDetailSection({
  description,
  reviews,
  reviewSummary
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
          reviewSummary={reviewSummary}
        />
      </TabPanel>
    </Box>
  );
}
