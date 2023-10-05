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

export const UPDATE_PRODUCTS_BY_PK = gql`
  mutation UpdateProductsByPk(
    $id: Int!
    $name: String!
    $description: String!
    $price: numeric!
    $stock: Int!
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: {
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

export const DELETE_PRODUCTS_BY_PK = gql`
  mutation DeleteProductsByPk ($id: Int!) {
    delete_products_by_pk(id: $id) {
      name
    }
  }
`;
