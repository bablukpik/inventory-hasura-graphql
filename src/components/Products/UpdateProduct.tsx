import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, message, Modal } from "antd";
import { UpdateProductProps, Product } from "./types";
import { UPDATE_PRODUCTS_BY_PK } from "./mutations";
import { GET_PRODUCTS_WITH_AGGREGATE } from "./queries";
import { validateNonZero } from "../../utils/validation.util";

function UpdateProduct({ open, onCancel, product }: UpdateProductProps) {
  const [form] = Form.useForm();
  const [updateProduct] = useMutation(UPDATE_PRODUCTS_BY_PK, {
    refetchQueries: [{ query: GET_PRODUCTS_WITH_AGGREGATE }],
  });

  useEffect(() => {
    if (product) {
      const modifiedProduct = {
        ...product,
        price: product.price.toString().replace("$", ""),
      };
      form.setFieldsValue(modifiedProduct);
    }
  }, [form, product]);

  const handleSubmit = async (formValues: Product) => {
    try {
      const payload = { ...formValues, id: product?.id}
      await updateProduct({
        variables: payload,
      });
      form.resetFields();
      message.success("Product updated successfully!");
    } catch (error: any) {
      message.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title="Update Product"
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Required" },
              { validator: validateNonZero },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: "Required" },
              { validator: validateNonZero },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: ".5rem",
            }}
          >
            <Button htmlType="reset">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateProduct;
