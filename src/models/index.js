// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { OrderProduct, Product, Order, CartProduct } = initSchema(schema);

export {
  OrderProduct,
  Product,
  Order,
  CartProduct
};