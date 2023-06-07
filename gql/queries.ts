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

export const getTestimonials = gql`
  query {
    testimonialsCollection {
      items {
        user
        feedback
        profilePicture {
          url
        }
      }
    }
  }
`;

export const getProductByCategories = gql`
  query ($collectionType: String!) {
    productsCollection(where: { category: { title_contains: $collectionType } }) {
      items {
        name
        bannnerImage {
          url
        }
        salePercent
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
        salePercent
        imagesCollection(limit: 4) {
          items {
            url
          }
        }
      }
    }
  }
`;

export const checkForEmail = gql`
  query ($email: String!) {
    userCollection(where: { email: $email }) {
      items {
        name
        image
        addressBuilding
        addressCity
        addressLandmark
        addressStreet
        addressState
        addressPincode
        phoneNumber
      }
    }
  }
`;
export const checkForCredentials = gql`
  query ($email: String!, $password: String!) {
    userCollection(where: { email: $email, password: $password }) {
      items {
        name
        image
        addressBuilding
        addressCity
        addressLandmark
        addressStreet
        addressState
        addressPincode
        phoneNumber
      }
    }
  }
`;

export const getCategoryNames = gql`
  query {
    categoriesCollection {
      items {
        title
      }
    }
  }
`;

export const getProductNamesAndCategories = gql`
  query {
    productsCollection {
      items {
        name
        category {
          title
        }
      }
    }
  }
`;

export const getAboutData = gql`
  query {
    aboutCollection(limit: 1) {
      items {
        description
        image {
          url
        }
        buttonText
        buttonLink
      }
    }
  }
`;

export const getLandingPageData = gql`
  query {
    landingPageCollection(limit: 1) {
      items {
        heading
        subHeading
        buttonText
        buttonLink
      }
    }
  }
`;
