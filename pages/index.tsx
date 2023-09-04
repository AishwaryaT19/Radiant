import React, { useEffect } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import gqlclient from "@/gql/client";
import { getAboutData, getCategories, getTestimonials, getLandingPageData } from "@/gql/queries";
import { useSetCart } from "@/hooks/use-cart";
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
  const { query } = useRouter();
  const setCart = useSetCart();
  useEffect(() => {
    if (query?.order === "success" && query?.uid) {
      axios
        .post(`/api/send-email?uid=${query.uid}`, {
          uid: query.uid
        })
        .then(() => {
          setCart({});
        })
        .catch(() => {
          //
        });
    }
    if (query?.canceled && query?.uid) {
      axios
        .post(`/api/clear-entry?uid=${query.uid}`, {
          uid: query.uid
        })
        .catch(() => {
          //
        });
    }
  }, [query, setCart]);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryCollection: any = (await gqlclient.request(getCategories)) ?? {};
  const categories = categoryCollection.categoriesCollection?.items ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testimonialCollection: any = (await gqlclient.request(getTestimonials)) ?? {};
  const testimonials = testimonialCollection?.testimonialsCollection?.items ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aboutCollection: any = (await gqlclient.request(getAboutData)) ?? [];
  const aboutData = aboutCollection?.aboutCollection?.items ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
