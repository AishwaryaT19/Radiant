import React from "react";
import type { GetStaticProps } from "next";
import gqlclient from "@/gql/client";
import { getCategories } from "@/gql/queries";
import Contact from "@/modules/home/contact";
import Testimonials from "@/modules/home/testimonials";
import type { CategoryPropType } from "@/modules/home/types";
import About from "@modules/home/about";
import Categories from "@modules/home/categories";
import LandingBanner from "@modules/home/landing-banner";

export interface HomeProps {
  category: CategoryPropType;
}
export default function Home({ category }: HomeProps) {
  return (
    <section id="Home">
      <LandingBanner />
      <Categories data={category} />
      <About />
      <Testimonials />
      <Contact />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories: any = (await gqlclient.request(getCategories)) ?? {};
  const category = categories?.categoriesCollection?.items ?? [];
  const forReturn: HomeProps = { category: category };
  return {
    props: forReturn,
    revalidate: 172800
  };
};
