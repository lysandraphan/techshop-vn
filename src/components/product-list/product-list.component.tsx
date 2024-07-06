"use client";
import { useEffect, useState } from "react";
import axios from "axios";

//mui
import ProductCard from "@/components/product-card/product-card.component";
import Grid from "@mui/material/Grid";

export interface ProductData {
  productId: number;
  name: string;
  quantity: number;
  description: string;
  price: number;
  ratingScrore: number;
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

export default function ProductList({ url }: { url: string }) {
  // -------------------------- STATE --------------------------
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------- FUNCTION --------------------------
  async function getProducts() {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      const result = response.data as ProductData[];
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
    <Grid container spacing={5} mt={1}>
      {products?.map((product) => (
        <Grid item xs={6} sm={4} md={3} key={product.productId}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
