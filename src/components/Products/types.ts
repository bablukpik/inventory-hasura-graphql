export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface AddProductProps {
  open: boolean;
  onCancel: () => void;
}

export interface UpdateProductProps extends AddProductProps {
  product: Product | null;
}
