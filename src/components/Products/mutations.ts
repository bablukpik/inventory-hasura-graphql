import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProductMutation(
    $name: String!
    $description: String!
    $price: numeric!
    $stock: Int!
  ) {
    insert_products_one(
      object: {
        name: $name
        description: $description
        price: $price
        stock: $stock
      }
    ) {
      id
      name
      description
      price
      stock
    }
  }
`;
