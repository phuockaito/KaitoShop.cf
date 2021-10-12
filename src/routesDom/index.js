import { lazy } from 'react';
const Home = lazy(() => import('component/homePage/index'));
const Trademark = lazy(() => import('./Page/Trademark/index'));
const DetailProducts = lazy(() => import('./Page/DetailProducts/index'));
const TrademarkType = lazy(() => import('./Page/TrademarkType/index'));
const Search = lazy(() => import('./Page/Search/index'));
const Login = lazy(() => import('./Page/Login/index'));
const Register = lazy(() => import('./Page/Register/index'));
const CartProduct = lazy(() => import('./Page/CartProduct/index'));
const HistoryComment = lazy(() => import('./Page/HistoryComment/index'));
const HistoryCart = lazy(() => import('./Page/HistoryCart/index'));
const ActiveEmail = lazy(() => import('./Page/Register/ActiveEmail'));
const ForgotPassword = lazy(() => import('./Page/Login/ForgotPassword'));
const Page = [

  {
    path: '/',
    exact: true,
    main: Home,
  },
  {
    path: '/search',
    exact: true,
    main: Search,
  },
  {
    path: '/product',
    exact: true,
    main: Trademark,
  },
  {
    path: '/detail-products',
    exact: true,
    main: DetailProducts,
  },
  {
    path: '/product-type',
    exact: true,
    main: TrademarkType,
  },
  {
    path: '/cart',
    exact: true,
    main: CartProduct,
  },
  {
    path: '/login',
    exact: true,
    main: Login,
  },
  {
    path: '/register',
    exact: true,
    main: Register,
  },
  {
    path: '/user/active-email/:accessToken',
    expect: true,
    main: ActiveEmail
  },
  {
    path: '/user/reset-password/:accessToken',
    expect: true,
    main: ForgotPassword
  },
  {
    path: '/history-comment',
    exact: true,
    main: HistoryComment,
  },
  {
    path: '/history-cart',
    exact: true,
    main: HistoryCart,
  }
];
export default Page;