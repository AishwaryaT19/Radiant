import { gql } from "graphql-request";
export const getCategories = gql`
  query {
    categoriesCollection {
      items {
        title
        bannerimage {
          url
        }
      }
    }
  }
`;

export const getProductByCategories = gql`
  query ($collectionType: String!) {
    productsCollection(
      where: { category: { title_contains: $collectionType } }
    ) {
      items {
        name
        bannnerImage {
          url
        }
        sale
        salePrice
        price
        category {
          title
          description
          bannerimage {
            url
          }
        }
      }
    }
  }
`;

export const getSingleProduct = gql`
  query ($productName: String!) {
    productsCollection(where: { name_contains: $productName }, limit: 1) {
      items {
        sys {
          id
        }
        name
        productDescription {
          json
        }
        price
        sale
        salePrice
        imagesCollection(limit: 4) {
          items {
            url
          }
        }
      }
    }
  }
`;
