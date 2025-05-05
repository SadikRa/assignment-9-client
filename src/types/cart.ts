export interface IOrder {
  email: string;
  orderInfo: OrderInfo[];
  totalPrice: number;
  customerInfo: CustomerInfo;
}

export interface OrderInfo {
  cartItemId?: string;
  meal_id: string;
  name: string;
  description: string;
  baseOptions: string;
  proteinOptions: string;
  extras: string[];
  dietaryPreferences: string;
  productId: string;
  price: number;
  calories: number;
  imgUrl: string[];
  orderedQuantity: number;
}

export interface CustomerInfo {
  name: string;
  number: string;
  city: string;
  colony: string;
  postOffice: string;
  subDistrict: string;
}
