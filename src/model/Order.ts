import { E_SCALAPAY_GTIN, E_SCALAPAY_CURRENCY, E_SCALAPAY_PRODUCT } from '../common/constants';

interface IAmount {
  amount: string;
  currency: E_SCALAPAY_CURRENCY;
}

type Amount = IAmount;

interface IContactInfo {
  phoneNumber?: string;
  countryCode: string;
  name: string;
  postcode: string;
  suburb?: string;
  line1: string;
}

type ContactInfo = IContactInfo;

interface IOrderItem {
  gtin?: E_SCALAPAY_GTIN;
  quantity: number;
  price: Amount;
  name: string;
  category: string;
  subcategory?: Array<string>;
  sku: string;
  brand?: string;
}

type OrderItem = IOrderItem;

interface IDiscountItem {
  amount: Amount;
  displayName?: string;
}

type DiscountItem = IDiscountItem;

interface IOrder {
  consumer: {
    phoneNumber?: string;
    givenNames: string;
    surname: string;
    email?: string;
  };

  billing?: ContactInfo;

  shipping: ContactInfo;

  items: Array<OrderItem>;

  discounts?: Array<DiscountItem>;

  shippingAmount?: Amount;

  taxAmount?: Amount;

  product?: E_SCALAPAY_PRODUCT;

  frequency?: {
    number: number;
    frequencyType: string;
  };
}

export type OrderType = IOrder;

export default class Order implements IOrder {
  public consumer: {
    phoneNumber?: string;
    givenNames: string;
    surname: string;
    email?: string;
  };

  public billing?: ContactInfo;

  public shipping: ContactInfo;

  public items: Array<OrderItem>;

  public discounts?: Array<DiscountItem>;

  public shippingAmount?: Amount;

  public taxAmount?: Amount;

  public product?: E_SCALAPAY_PRODUCT;

  public frequency?: {
    number: number;
    frequencyType: string;
  };

  constructor() {
    this.consumer = {
      givenNames: '',
      surname: '',
    };

    this.shipping = {
      countryCode: '',
      name: '',
      postcode: '',
      line1: '',
    };

    this.items = [];
  }
}
