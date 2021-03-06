import { lazy } from 'react';
const Home = lazy(() => import('component/homePage/index'));
const Trademark = lazy(() => import('./Page/Trademark/index'));
const DetailProducts = lazy(() => import('./Page/DetailProducts/index'));
const TrademarkType = lazy(() => import('./Page/TrademarkType/index'));
const Search = lazy(() => import('./Page/Search/index'));
const Login = lazy(() => import('./Page/Login/index'));
const Register = lazy(() => import('./Page/Register/index'));
const CartProduct = lazy(() => import('./Page/CartProduct/index'));
const NotFount = lazy(() => import('./Page/NotFount/index'));
const HistoryComment = lazy(() => import('./Page/HistoryComment/index'));
const HistoryCart = lazy(() => import('./Page/HistoryCart/index'));
const Page = [

    {
        path: '/',
        exact: true,
        main: Home,
    },
    {
        path: '/search/:keyWord',
        exact: true,
        main: Search,
    },
    {
        path: '/product/:name_Trademark',
        exact: true,
        main: Trademark,
    },
    {
        path: '/:key/:nsx/:name/:_id',
        exact: true,
        main: DetailProducts,
    },
    {
        path: '/products/:key/:NSX',
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
        path: '/history-comment',
        exact: true,
        main: HistoryComment,
    },
    {
        path: '/history-cart',
        exact: true,
        main: HistoryCart,
    },
    {
        path: '*',
        exact: true,
        main: NotFount
    }
];
export default Page;