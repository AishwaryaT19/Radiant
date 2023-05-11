import React from "react";
import LandingBanner from "@modules/home/landing-banner";
import Categories from "@modules/home/categories";
import About from "@modules/home/about";
import Testimonials from "@/modules/home/testimonials";
import Contact from "@/modules/home/contact";
import gqlclient from "@/gql/client";
import { getCategories } from "@/gql/queries";
import type { GetStaticProps } from "next";
import type { CategoryPropType } from "@/modules/home/types";
import Login from "@/components/login";

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
      <Login />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories: any = (await gqlclient.request(getCategories)) ?? {};
  const category = categories?.categoriesCollection?.items ?? [];
  const forReturn: HomeProps = { category: category };
  return {
    props: forReturn,
    revalidate: 172800,
  };
};
