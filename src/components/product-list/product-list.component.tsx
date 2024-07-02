"use client";
import { useEffect, useState } from "react";
import axios from "axios";

//mui
import ProductCard from "@/components/product-card/product-card.component";
import Grid from "@mui/material/Grid";

interface ServerData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  items: ProductData[];
}

export interface ProductData {
  productId: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
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

export default function ProductList({ url }: { url: string }) {
  // -------------------------- STATE --------------------------
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- FUNCTION --------------------------
  async function getProducts() {
    try {
      setIsLoading(true);
      const response = await axios.get<ServerData>(url);
      const result = response.data.items;
      setProducts(result);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  }

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    getProducts();
  }, []);

  // -------------------------- MAIN --------------------------
  return (
    <Grid container spacing={4} mt={1}>
      {products?.map((product) => (
        <Grid item md={3} key={product.productId}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
