import { Fragment } from "react";

// component
import SectionHeader from "@/components/section-header/section-header.component";
import ProductList from "@/components/product-list/product-list.component";

interface NewArrivalSectionProps {
  url: string;
  smallHeader: string;
  largeHeader: string;
}

export default function NewArrivalSection({
  smallHeader,
  largeHeader,
  url,
}: NewArrivalSectionProps) {
  return (
    <Fragment>
      <SectionHeader smallHeader={smallHeader} largeHeader={largeHeader} />
      <ProductList url={url} />
    </Fragment>
  );
}
