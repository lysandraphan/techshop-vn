import Image from "next/image";

// style
import "./page.module.css";

// component
import CategorySection from "@/components/category-section/category-section.component";
import SectionHeader from "@/components/section-header/section-header.component";
import ProductList from "@/components/product-list/product-list.component";

export default function Home() {
  // -------------------------- VAR --------------------------
  const bestSellingUrl =
    "https://g5-likelion-ecommerce.onrender.com/product/9/paginate?page=1&pageSize=10&accountId=-1";

  const newArrivalUrl = "";

  return (
    <div className="layout-container">
      <CategorySection />
      <SectionHeader
        smallHeader="This Month"
        largeHeader="Best Selling Products"
      />
      <ProductList url={bestSellingUrl} />
      <div
        style={{
          marginTop: 50,
          width: "100%",
          height: 450,
          position: "relative",
        }}
      >
        <Image src="/banner-2.jpg" alt="product" fill />
      </div>
      <SectionHeader smallHeader="Our Products" largeHeader="New Arrival" />
      <ProductList url={bestSellingUrl} />
      <ProductList url={bestSellingUrl} />
    </div>
  );
}
