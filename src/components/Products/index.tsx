import { useQuery } from "@apollo/client";
import Statistic from "antd/es/statistic/Statistic";
import { Table, Button, Card, Row, Col, Space } from "antd";
import AddProduct from "./AddProduct";
import { useState } from "react";
import { Product } from "./types";
import { GET_PRODUCTS_WITH_AGGREGATE } from "./queries";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateProduct from "./UpdateProduct";

function Products() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { loading, error, data } = useQuery(GET_PRODUCTS_WITH_AGGREGATE);

  const totalCount = data?.products_aggregate?.aggregate?.count ?? 0;
  const totalStock = data?.products_aggregate?.aggregate?.sum?.stock ?? 0;
  const totalValue =
    data?.products?.reduce?.((acc: number, product: Product) => {
      return acc + Number(product?.stock ?? 0) * Number(product?.price ?? 0);
    }, 0) ?? 0;

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
  };

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
    {
      title: "Action",
      key: "action",
      render: (product: Product) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(product)}
          />
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteClick(product)}
          />
        </Space>
      ),
    },
  ];

  const rows: Product[] =
    data?.products?.map?.((product: Product) => ({
      key: product?.id,
      id: product?.id,
      name: product?.name,
      description: product?.description,
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
            <Statistic title="Total products" value={totalCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Stock" value={totalStock} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Value" value={`$${totalValue}`} />
          </Card>
        </Col>
      </Row>
      <br />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Products</h2>
          <Button onClick={handleAddClick} type="primary">
            Add Products
          </Button>
        </div>
        <Table columns={columns} dataSource={rows} loading={loading} />
        <AddProduct open={addModalOpen} onCancel={handleModalClose} />
        <UpdateProduct open={updateModalOpen} onCancel={handleModalClose} product={selectedProduct} />
      </Card>
    </>
  );
}

export default Products;
