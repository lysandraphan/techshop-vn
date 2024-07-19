import { Fragment } from "react";

// component
import SectionHeader from "@/components/section-header/section-header.component";
import ProductList from "@/components/product-list/product-list.component";

interface NewArrivalSectionProps {
  api: string;
  smallHeader: string;
  largeHeader: string;
}

export default function NewArrivalSection({
  smallHeader,
  largeHeader,
  api,
}: NewArrivalSectionProps) {
  return (
    <Fragment>
      <SectionHeader smallHeader={smallHeader} largeHeader={largeHeader} />
      <ProductList api={api} height={240} />
    </Fragment>
  );
}
