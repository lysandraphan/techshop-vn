import { Fragment } from "react";

// component
import SectionHeader from "../../components/section-header/section-header.component";
import ProductList from "../../components/product-list/product-list.component";

interface BestSellingSectionProps {
  url: string;
  smallHeader: string;
  largeHeader: string;
}

export default function BestSellingSection({
  smallHeader,
  largeHeader,
  url,
}: BestSellingSectionProps) {
  return (
    <Fragment>
      <SectionHeader smallHeader={smallHeader} largeHeader={largeHeader} />
      <ProductList url={url} />
    </Fragment>
  );
}
