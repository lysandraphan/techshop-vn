import { Fragment } from "react";

// component
import ProductList from "@/components/product-list/product-list.component";
import SectionHeader from "@/components/section-header/section-header.component";

interface BestSellingSectionProps {
  api: string;
  smallHeader: string;
  largeHeader: string;
}

export default function BestSellingSection({
  smallHeader,
  largeHeader,
  api,
}: BestSellingSectionProps) {
  return (
    <Fragment>
      <SectionHeader smallHeader={smallHeader} largeHeader={largeHeader} />
      <ProductList api={api} height={240} />
    </Fragment>
  );
}
