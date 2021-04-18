import { lazy } from 'react';
const Cart = lazy(() => import('./Cart/index'));
const ProductManagement = lazy(() => import('./Product/ProductManagement/index'));
const EditProduct = lazy(() => import('./Product/EditProduct/index'));
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
    main: ProductManagement
  },
  {
    path: '/admin-edit-product/:id_product',
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