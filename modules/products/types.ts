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
  salePercent: number | null;
  imagesCollection: {
    items: {
      url: string;
    }[];
  };
}
