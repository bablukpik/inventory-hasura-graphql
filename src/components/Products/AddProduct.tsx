import { useMutation } from "@apollo/client";
import { Form, Input, Button, message, Modal } from "antd";
import { AddProductProps, Product } from "./types";
import { ADD_PRODUCT } from "./mutations";
import { GET_PRODUCTS_WITH_AGGREGATE } from "./queries";
import { validateNonZero } from "../../utils/validation.util";

function AddProduct({ open, onCancel }: AddProductProps) {
  const [form] = Form.useForm();

  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS_WITH_AGGREGATE }],
  });

  const handleSubmit = async (values: Omit<Product, "id">) => {
    try {
      await addProduct({
        variables: {
          ...values,
        },
      });
      form.resetFields();
      message.success("Product added successfully!");
    } catch (error: any) {
      message.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title="Add New Product"
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

export default AddProduct;
