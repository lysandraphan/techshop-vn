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
import LoadingFallback from "../loading-fallback/loading-fallback.component";

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
  brand: {
    id: number;
    name: string;
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
  selectedBrandIds?: number[];
  sortValue?: SortType;
  searchQuery?: string;
}

// EXPORT DEFAULT
export default function ProductList({
  api,
  isInCategory,
  filterPriceRange,
  selectedBrandIds,
  sortValue,
  searchQuery,
}: ProductListProps) {
  // -------------------------- STATE --------------------------
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
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

  // Filter Products by Brand
  const filterBrand = () => {
    if (products.length === 0) return;
    if (selectedBrandIds && selectedBrandIds.length !== 0) {
      const filtered = products.filter((product) =>
        selectedBrandIds?.includes(product.brand.id)
      );
      setFilteredProducts(filtered);
      dispatch(setTotalFilteredProducts(filtered.length));
    } else {
      setFilteredProducts(products);
    }
  };

  // Sort Products
  const sortProducts = (sortValue: SortType | undefined) => {
    if (!sortValue) return;
    sortValue === "lowest" &&
      setProducts(lodash.orderBy(products, ["price"], ["asc"]));
    sortValue === "highest" &&
      setProducts(lodash.orderBy(products, ["price"], ["desc"]));
    sortValue === "best" &&
      setProducts(
        lodash.orderBy(products, ["ratingScore", "ratingTotal"], ["desc"])
      );
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        dispatch(setDisableFilter(true));

        const response = await axios.get(api, {
          signal: abortController.signal,
        });
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
        // only log error/call dispatch when we know the fetch was not aborted
        if (!abortController.signal.aborted) {
          console.log(error.message);
        }
      }
    };

    fetchProducts();

    // Clean up
    return () => {
      abortController.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  useEffect(() => {
    filterPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPriceRange, products]);

  useEffect(() => {
    filterBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrandIds, products]);

  useEffect(() => {
    sortProducts(sortValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, products]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) => {
        return product.name
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // -------------------------- MAIN --------------------------
  if (isLoading) return <LoadingFallback />;

  return (
    <Grid container columnSpacing={3} rowSpacing={3} mt={1}>
      {filteredProducts.length !== 0 ? (
        filteredProducts.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.productId}>
            <ProductCard product={product} isInCategory={isInCategory} />
          </Grid>
        ))
      ) : (
        <LoadingFallback
          fallback
          message="
          No Product Found"
        />
      )}
    </Grid>
  );
}
