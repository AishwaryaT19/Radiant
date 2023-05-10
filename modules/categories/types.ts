export interface ProductType {
  name: string;
  imgUrl: string;
  price: number;
}

export interface ProductType {
  name: string;
  bannerImage: {
    url: string;
  };
  salePercent: number;
  price: number;
  category: {
    title: string;
    description: string;
    bannerimage: {
      url: string;
    };
  };
}
export type ProductPropType = ProductType[];

export interface ProductProps {
  products: ProductPropType;
}
