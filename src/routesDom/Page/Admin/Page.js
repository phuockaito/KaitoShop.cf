import { lazy } from 'react';
const Cart = lazy(() => import('./Cart/index'));
const Product = lazy(() => import('./Product/EditProduct/index'));
const EditProduct = lazy(() => import('./Product/EditProduct/EditProduct'));
const NewProduct = lazy(() => import('./Product/NewProduct/index'));
const Page = [
  {
    path: '/admin-cart',
    exact: true,
    main: Cart,
  },
  // product
  {
    path: '/admin-product',
    exact: true,
    main: Product
  },
  {
    path: '/admin-product/:_id',
    exact: true,
    main: EditProduct
  },
  {
    path: '/admin-new-product',
    exact: true,
    main: NewProduct
  }
];
export default Page;