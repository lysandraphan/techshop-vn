import React from "react";

export default function Categories({
  params,
}: {
  params: { categoryName: string };
}) {
  return <div>Categories {params.categoryName}</div>;
}
