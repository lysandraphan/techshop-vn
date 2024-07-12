"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import lodash from "lodash";

// internal
import { useAppDispatch } from "@/redux/hooks";
import {
  setDisableFilter,
  setTotalFilteredProducts,
  SortType,
} from "@/redux/features/filter-slice";

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
  sortValue?: SortType;
}

// EXPORT DEFAULT
export default function ProductList({
  api,
  isInCategory,
  filterPriceRange,
  sortValue,
}: ProductListProps) {
  // -------------------------- STATE --------------------------
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  async function getProducts() {
    try {
      setIsLoading(true);
      dispatch(setDisableFilter(true));

      const response = await axios.get(api);
      let result;
      if (isInCategory) {
        result = response.data.items as ProductData[];
      } else {
        result = response.data as ProductData[];
      }

      setProducts(result);
      setIsLoading(false);
      dispatch(setDisableFilter(false));
    } catch (error: any) {
      setIsLoading(false);
      dispatch(setDisableFilter(false));
      console.log(error.message);
    }
  }

  // Filter Products by Price
  const filterPrice = () => {
    if (products.length === 0) return;
    if (filterPriceRange) {
      const filtered = products.filter(
        (product) =>
          product.price >= filterPriceRange[0] &&
          product.price <= filterPriceRange[1]
      );
      setFilteredProducts(filtered);
      dispatch(setTotalFilteredProducts(filtered.length));
    } else {
      setFilteredProducts(products);
    }
  };

  // Sort Products
  const sortProducts = (sortValue: SortType) => {
    sortValue === "lowest" &&
      setProducts(lodash.orderBy(products, ["price"], ["asc"]));
    sortValue === "highest" &&
      setProducts(lodash.orderBy(products, ["price"], ["desc"]));
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterPrice();
  }, [filterPriceRange, products]);

  useEffect(() => {
    sortValue && sortProducts(sortValue);
  }, [sortValue]);

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
      {filteredProducts.length !== 0 ? (
        filteredProducts.map((product) => (
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
