import { gql, useQuery } from "@apollo/client";
import Statistic from "antd/es/statistic/Statistic";
import { Table, Button, Card, Row, Col } from "antd";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const GET_PRODUCTS_WITH_AGGREGATE = gql`
  query GetProductsWithAggregate {
    products_aggregate {
      aggregate {
        sum {
          stock
        }
        count
      }
    }
    products {
      id
      name
      description
      price
      stock
    }
  }
`;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

export function Products(): JSX.Element {
  const { loading, error, data } = useQuery(GET_PRODUCTS_WITH_AGGREGATE, {
    fetchPolicy: "cache-and-network",
  });

  const totalCount = data?.products_aggregate?.aggregate?.count ?? 0;
  const totalStock = data?.products_aggregate?.aggregate?.sum?.stock ?? 0;
  const totalValue =
    data?.products?.reduce?.((acc: number, product: Product) => {
      return acc + Number(product?.stock ?? 0) * Number(product?.price ?? 0);
    }, 0) ?? 0;

  const rows: Product[] =
    data?.products?.map?.((product: Product) => ({
      key: product?.id,
      name: product?.name,
      price: `$${product?.price}`,
      stock: product?.stock,
      value: `$${Number(product?.stock ?? 0) * Number(product?.price ?? 0)}`,
    })) || [];

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total products"
              value={`$${totalCount}`}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Stock"
              value={`$${totalStock}`}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Value"
              value={`$${totalValue}`}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
      <br />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Products</h2>
          <Button type="primary">Add Products</Button>
        </div>
        <Table columns={columns} dataSource={rows} loading={loading} />
        {/* <AddUserModal
          showForm={open}
          onCancel={handleCancelForm}
          onAddUser={handleAddUser}
        /> */}
      </Card>
    </>
  );
}
