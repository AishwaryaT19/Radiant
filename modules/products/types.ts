import type { Document } from "@contentful/rich-text-types";
export interface ProductImage {
  imgUrl: string;
}

export interface ProductProp {
  sys: {
    id: string;
  };
  name: string;
  productDescription: {
    json: Document;
  };
  price: number;
  sale: boolean;
  salePrice: number;
  imagesCollection: {
    items: {
      url: string;
    }[];
  };
}
