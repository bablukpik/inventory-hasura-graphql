import { gql } from "@apollo/client";

export const GET_PRODUCTS_WITH_AGGREGATE = gql`
  query GetProductsWithAggregate {
    products_aggregate {
      aggregate {
        sum {
          stock
        }
        count
      }
    }
    products(order_by: { id: desc }) {
      id
      name
      description
      price
      stock
    }
  }
`;
