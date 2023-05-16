import { createSlice } from '@reduxjs/toolkit';

import { E_SCALAPAY_CURRENCY, E_SCALAPAY_PRODUCT, E_SCALAPAY_FREQUENCY_TYPE } from '../common/constants';
import * as utils from '../common/utils';

import { OrderType } from '../model';

interface IOrderState extends OrderType {}

const initialState: IOrderState = {
  consumer: {
    phoneNumber: undefined,
    givenNames: '',
    surname: '',
    email: undefined,
  },

  billing: {
    phoneNumber: undefined,
    countryCode: '',
    name: '',
    postcode: '',
    suburb: undefined,
    line1: '',
  },

  shipping: {
    phoneNumber: undefined,
    countryCode: '',
    name: '',
    postcode: '',
    suburb: undefined,
    line1: '',
  },

  items: [],

  discounts: undefined,

  shippingAmount: {
    amount: '',
    currency: E_SCALAPAY_CURRENCY.EUR,
  },

  taxAmount: {
    amount: '',
    currency: E_SCALAPAY_CURRENCY.EUR,
  },

  product: E_SCALAPAY_PRODUCT.PAY_IN_3,

  frequency: {
    number: 1,
    frequencyType: E_SCALAPAY_FREQUENCY_TYPE.MONTHLY,
  },
};

const OrderSlice = createSlice({
  name: 'Order',

  initialState: initialState,

  reducers: {
    saveConsumer(state, action) {
      const { phoneNumber, givenNames, surname, email } = action.payload;

      state.consumer = { phoneNumber, givenNames, surname, email };
    },

    saveBilling(state, action) {
      const { phoneNumber, countryCode, name, postcode, suburb, line1 } = action.payload;

      // TODO
      if (
        utils.isEmptyString(countryCode) ||
        utils.isEmptyString(name) ||
        utils.isEmptyString(postcode) ||
        utils.isEmptyString(line1)
      ) {
        state.billing = undefined;
      } else {
        state.billing = { phoneNumber, countryCode, name, postcode, suburb, line1 };
      }
    },

    saveShipping(state, action) {
      const { phoneNumber, countryCode, name, postcode, suburb, line1 } = action.payload;

      state.shipping = { phoneNumber, countryCode, name, postcode, suburb, line1 };
    },

    saveNewItem(state, action) {
      const { gtin, quantity, price, name, category, subcategory, sku, brand } = action.payload;

      const t_item = state.items;
      t_item.push({
        gtin,
        quantity,
        price,
        name,
        category,
        subcategory,
        sku,
        brand,
      });

      state.items = t_item;
    },

    saveNewDiscount(state, action) {
      const { amount, currency, displayName } = action.payload;

      // TODO
      if (utils.isEmptyString(amount)) {
        state.discounts = undefined;
      }

      let t_discounts = state.discounts;
      if (!t_discounts) {
        t_discounts = [];
      }
      t_discounts.push({
        amount: {
          amount,
          currency,
        },
        displayName,
      });
      state.discounts = t_discounts;
    },

    saveShippingAmount(state, action) {
      const { amount } = action.payload;

      if (utils.isEmptyString(amount)) {
        state.shippingAmount = undefined;
      }

      state.shippingAmount = {
        amount,
        currency: E_SCALAPAY_CURRENCY.EUR,
      };
    },

    saveTaxAmount(state, action) {
      const { amount } = action.payload;

      if (utils.isEmptyString(amount)) {
        state.taxAmount = undefined;
      }

      state.taxAmount = {
        amount,
        currency: E_SCALAPAY_CURRENCY.EUR,
      };
    },

    saveProduct(state, action) {
      const { product } = action.payload;

      state.product = product;
    },

    saveFrequency(state, action) {
      const { number } = action.payload;

      state.frequency = {
        number,
        frequencyType: E_SCALAPAY_FREQUENCY_TYPE.MONTHLY,
      };
    },

    reset(state, action) {
      // TODO
    },
  },
});

export type OrderState = IOrderState;

export const {
  saveConsumer,
  saveBilling,
  saveShipping,
  saveNewItem,
  saveNewDiscount,
  saveShippingAmount,
  saveTaxAmount,
  saveProduct,
  saveFrequency,
} = OrderSlice.actions;

export default OrderSlice.reducer;
