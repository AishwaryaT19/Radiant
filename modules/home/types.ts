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
