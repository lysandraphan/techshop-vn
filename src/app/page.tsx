// style
import "./page.module.css";

// component
import CategorySection from "@/components/category-section/category-section.component";
import ProductCard from "@/components/product-card/product-card.component";
import SectionHeader from "@/components/section-header/section-header.component";

export default function Home() {
  return (
    <div className="layout-container">
      <CategorySection />
      <SectionHeader
        smallHeader="This Month"
        largeHeader="Best Selling Products"
      />
      <ProductCard />
    </div>
  );
}
