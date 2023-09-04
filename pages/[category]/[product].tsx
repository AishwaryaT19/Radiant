import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import gqlclient from "@/gql/client";
import { getProductNamesAndCategories, getSingleProduct } from "@/gql/queries";
import type { ProductProp } from "@/modules/products/types";
import Info from "../../modules/products/info";

export default function Product({ data }: { data: ProductProp }) {
  return (
    <section id="product">
      <Info {...data} />
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ProductNamesArr: any = // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((await gqlclient.request(getProductNamesAndCategories)) as any)?.productsCollection?.items?.map?.((elem: any) => {
      return {
        params: {
          product: elem?.name?.replaceAll(" ", "-").toLowerCase(),
          category: elem?.category?.title.replaceAll(" ", "-").toLowerCase()
        }
      };
    });
  return {
    paths: ProductNamesArr,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const pro = params?.product;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: any =
    (await gqlclient.request(getSingleProduct, {
      productName: String(pro).replaceAll("-", " ")
    })) ?? {};
  const product: ProductProp = products?.productsCollection?.items[0] ?? {};
  return {
    props: {
      data: product
    },
    revalidate: 43200
  };
};
