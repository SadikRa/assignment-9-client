export interface IOrder {
  email: string;
  orderInfo: OrderInfo[];
  totalPrice: number;
  customerInfo: CustomerInfo;
}

export interface OrderInfo {
  cartItemId?: string;
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  orderedQuantity: number;
  company?: string;
}

export interface CustomerInfo {
  name: string;
  number: string;
  city: string;
  colony: string;
  postOffice: string;
  subDistrict: string;
}
