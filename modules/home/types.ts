export interface CategoryType {
  title: string;
  imgUrl: string;
}
export interface TestimonialType {
  name: string;
  imgUrl: string;
  testimonial: string;
}
export interface CategoryArrayType {
  title: string;
  bannerimage: {
    url: string;
  };
}
export type CategoryPropType = CategoryArrayType[];
export interface CategoryProps {
  data: CategoryPropType;
}

export interface TestimonialArrayType {
  user: string;
  feedback: string;
  profilePicture?: {
    url: string;
  };
}

export type TestimonialPropType = TestimonialArrayType[];
export interface TestimonialProps {
  data: TestimonialPropType;
}

export interface AboutArrayType {
  description: string;
  image?: {
    url: string;
  };
  buttonLink: string;
  buttonText: string;
}

export type AboutPropType = AboutArrayType[];

export interface AboutProps {
  data: AboutPropType;
}

export interface LandingArrayType {
  heading: string;
  subHeading: string;
  buttonLink: string;
  buttonText: string;
}

export type LandingPropType = LandingArrayType[];

export interface LandingProps {
  data: LandingPropType;
}
