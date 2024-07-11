"use client";
import { useEffect, useState } from "react";
import axios from "axios";

//mui
import ProductCard from "@/components/product-card/product-card.component";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// interface
export interface ProductData {
  productId: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
  ratingScore: number;
  rateTotal: number;
  categoryDto: {
    categoryId: number;
    name: string;
    imagePath: string;
    deletedAt: null;
    quantityProduct: null;
  };
  createdAt: string;
  deletedAt: null;
  inWishList: false;
  imagePath: string;
  imagesPath: [];
}

interface ProductListProps {
  api: string;
  isInCategory?: boolean;
  filterPriceRange?: [number, number];
}

// EXPORT DEFAULT
export default function ProductList({
  api,
  isInCategory,
  filterPriceRange,
}: ProductListProps) {
  // -------------------------- STATE --------------------------
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- FUNCTION --------------------------
  async function getProducts() {
    try {
      setIsLoading(true);
      const response = await axios.get(api);
      let result;
      if (isInCategory) {
        result = response.data.items as ProductData[];
      } else {
        result = response.data as ProductData[];
      }

      // filter price
      if (filterPriceRange) {
        const filteredProduct = result.filter(
          (product) =>
            product.price >= filterPriceRange[0] &&
            product.price <= filterPriceRange[1]
        );
        setProducts(filteredProduct);
      } else {
        setProducts(result);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  }

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    getProducts();
  }, [filterPriceRange]);

  // -------------------------- MAIN --------------------------
  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Grid container columnSpacing={3} rowSpacing={3} mt={1}>
      {products.length !== 0 ? (
        products.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.productId}>
            <ProductCard product={product} isInCategory={isInCategory} />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            p: 5,
          }}
        >
          No Product Found
        </Box>
      )}
    </Grid>
  );
}
