import React from "react";

export default function Categories({
  params,
}: {
  params: { categoryName: string };
}) {
  return <div> Category: {params.categoryName}</div>;
}
