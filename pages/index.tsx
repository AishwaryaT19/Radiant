import React from "react";
import type { GetStaticProps } from "next";
import gqlclient from "@/gql/client";
import { getAboutData, getCategories, getTestimonials, getLandingPageData } from "@/gql/queries";
import Contact from "@/modules/home/contact";
import Testimonials from "@/modules/home/testimonials";
import type { AboutPropType, CategoryPropType, LandingPropType, TestimonialPropType } from "@/modules/home/types";
import About from "@modules/home/about";
import Categories from "@modules/home/categories";
import LandingBanner from "@modules/home/landing-banner";

export interface HomeProps {
  categories: CategoryPropType;
  testimonials: TestimonialPropType;
  aboutData: AboutPropType;
  landingPageData: LandingPropType;
}
export default function Home({ categories, testimonials, aboutData, landingPageData }: HomeProps) {
  return (
    <section id="Home">
      <LandingBanner data={landingPageData} />
      <Categories data={categories} />
      <About data={aboutData} />
      <Testimonials data={testimonials} />
      <Contact />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categoryCollection: any = (await gqlclient.request(getCategories)) ?? {};
  const categories = categoryCollection.categoriesCollection?.items ?? [];
  const testimonialCollection: any = (await gqlclient.request(getTestimonials)) ?? {};
  const testimonials = testimonialCollection?.testimonialsCollection?.items ?? [];
  const aboutCollection: any = (await gqlclient.request(getAboutData)) ?? [];
  const aboutData = aboutCollection?.aboutCollection?.items ?? [];
  const landingPageDataCollection: any = (await gqlclient.request(getLandingPageData)) ?? {};
  const landingPageData = landingPageDataCollection?.landingPageCollection?.items ?? [];
  const forReturn: HomeProps = {
    categories: categories,
    testimonials: testimonials,
    aboutData: aboutData,
    landingPageData: landingPageData
  };
  return {
    props: forReturn,
    revalidate: 172800
  };
};
