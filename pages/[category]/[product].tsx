import Info from "../../modules/products/info";
import React from "react";
import gqlclient from "@/gql/client";
import type { GetServerSideProps } from "next";
import { getSingleProduct } from "@/gql/queries";
import type { ProductProp } from "@/modules/products/types";

export default function Product({ data }: { data: ProductProp }) {
  return (
    <section id="product">
      <Info {...data} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products: any =
    (await gqlclient.request(getSingleProduct, {
      productName: String(query.product).replaceAll("-", " "),
    })) ?? {};
  const product: ProductProp = products?.productsCollection?.items[0] ?? {};
  return {
    props: {
      data: product,
    },
  };
};
