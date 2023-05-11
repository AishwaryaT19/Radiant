import Info from "../../modules/products/info";
import React from "react";
import gqlclient from "@/gql/client";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getProductNamesAndCategories, getSingleProduct } from "@/gql/queries";
import type { ProductProp } from "@/modules/products/types";

export default function Product({ data }: { data: ProductProp }) {
  return (
    <section id="product">
      <Info {...data} />
    </section>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const products: any =
//     (await gqlclient.request(getSingleProduct, {
//       productName: String(query.product).replaceAll("-", " "),
//     })) ?? {};
//   const product: ProductProp = products?.productsCollection?.items[0] ?? {};
//   return {
//     props: {
//       data: product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const ProductNamesArr: any = (
    (await gqlclient.request(getProductNamesAndCategories)) as any
  )?.productsCollection?.items?.map?.((elem: any) => {
    return {
      params: {
        product: elem?.name?.replaceAll(" ", "-").toLowerCase(),
        category: elem?.category?.title.replaceAll(" ", "-").toLowerCase(),
      },
    };
  });
  return {
    paths: ProductNamesArr,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const pro = params?.product;
  const products: any =
    (await gqlclient.request(getSingleProduct, {
      productName: String(pro).replaceAll("-", " "),
    })) ?? {};
  const product: ProductProp = products?.productsCollection?.items[0] ?? {};
  return {
    props: {
      data: product,
    },
    revalidate: 43200,
  };
};
