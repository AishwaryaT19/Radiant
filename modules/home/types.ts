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

// export interface TestimonialArrayType {
//   user: string;
//   feedback: string;
//   profilePicture: {
//     url: string;
//   };
// }
// export type TestimonialPropType = TestimonialArrayType[];
// export interface TestimonialProps {
//   tests: TestimonialPropType;
// }
