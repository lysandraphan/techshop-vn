"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import lodash from "lodash";

// internal
import { useAppDispatch } from "@/redux/hooks";
import {
  setDisableFilter,
  setTotalFilteredProducts,
} from "@/redux/features/filter-slice";
import { SortProductType } from "@/redux/features/sort-slice";

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
  sortProductOrder?: SortProductType;
  searchQuery?: string;
}

// EXPORT DEFAULT
export default function ProductList({
  api,
  isInCategory,
  filterPriceRange,
  selectedBrandIds,
  sortProductOrder,
  searchQuery,
}: ProductListProps) {
  // -------------------------- STATE --------------------------
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- VAR --------------------------
  const dispatch = useAppDispatch();

  // -------------------------- FUNCTION --------------------------
  // Filter Products by Price & Brand
  const filterPriceAndBrands = () => {
    if (products.length === 0) return;

    let filtered = [];

    if (filterPriceRange && selectedBrandIds && selectedBrandIds.length !== 0) {
      filtered = products.filter(
        (product) =>
          product.price >= filterPriceRange[0] &&
          product.price <= filterPriceRange[1] &&
          selectedBrandIds?.includes(product.brand.id)
      );
    } else if (filterPriceRange) {
      filtered = products.filter(
        (product) =>
          product.price >= filterPriceRange[0] &&
          product.price <= filterPriceRange[1]
      );
    } else if (selectedBrandIds && selectedBrandIds.length !== 0) {
      filtered = products.filter((product) =>
        selectedBrandIds?.includes(product.brand.id)
      );
    } else {
      filtered = products;
    }
    setFilteredProducts(filtered);
    dispatch(setTotalFilteredProducts(filtered.length));

    if (sortProductOrder && sortProductOrder !== "default") {
      sortProductList(sortProductOrder, filtered);
    }
  };

  // Sort Products
  const sortProductList = (
    sortProductOrder: SortProductType | undefined,
    productlist: ProductData[]
  ) => {
    sortProductOrder === "lowest" &&
      setFilteredProducts(lodash.orderBy(productlist, ["price"], ["asc"]));
    sortProductOrder === "highest" &&
      setFilteredProducts(lodash.orderBy(productlist, ["price"], ["desc"]));
    sortProductOrder === "top" &&
      setFilteredProducts(
        lodash.orderBy(productlist, ["ratingScore", "ratingTotal"], ["desc"])
      );
  };

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        isInCategory && dispatch(setDisableFilter(true));

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
        isInCategory && dispatch(setDisableFilter(false));
      } catch (error: any) {
        setIsLoading(false);
        isInCategory && dispatch(setDisableFilter(false));
        // only log error/call dispatch when we know the fetch was not aborted
        if (!abortController.signal.aborted) {
          console.log(error.message);
        } else {
          console.log("Fetch request aborted.");
        }
      }
    };

    fetchProducts();

    // Clean up
    return () => {
      abortController.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterPriceAndBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPriceRange, selectedBrandIds, products]);

  useEffect(() => {
    if (filteredProducts.length !== 0) {
      sortProductList(sortProductOrder, filteredProducts);
    } else {
      products.length !== 0 && sortProductList(sortProductOrder, products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortProductOrder]);

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
