import gqlclient from "@/gql/client";
import { getProductByCategories, getCategoryNames } from "@/gql/queries";
import HeroBanner from "@/modules/categories/hero-banner";
import Listings from "@/modules/categories/listings";
import type { ProductProps } from "@/modules/categories/types";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";

export default function Index(products: ProductProps) {
  return (
    <section id="categories">
      <div className="img-container">
        <Image
          fill
          sizes="100%"
          src="/assets/images/bublepink.png"
          alt="background"
        />
      </div>
      <HeroBanner products={products.products} />
      <Listings products={products.products} />
    </section>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const categories: any =
//     (await gqlclient.request(getProductByCategories, {
//       collectionType: String(query.category).replaceAll("-", " "),
//     })) ?? {};
//   const product = categories?.productsCollection?.items ?? [];
//   const forReturn: ProductProps = { products: product };
//   const products = forReturn.products;
//   return {
//     props: { products },
//     revalidate: 43200,
//   };
// };
export const getStaticPaths: GetStaticPaths = async () => {
  const categoryNamesArr: any = (
    (await gqlclient.request(getCategoryNames)) as any
  )?.categoriesCollection?.items?.map?.((elem: any) => {
    return {
      params: {
        category: elem?.title?.replaceAll(" ", "-").toLowerCase(),
      },
    };
  });
  return {
    paths: categoryNamesArr,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const cat = params?.category;
  const categories: any =
    (await gqlclient.request(getProductByCategories, {
      collectionType: String(cat).replaceAll("-", " "),
    })) ?? {};
  const product = categories?.productsCollection?.items ?? [];
  const forReturn: ProductProps = { products: product };
  const products = forReturn.products;
  return {
    props: { products: products },
    revalidate: 43200,
  };
};
