import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Banner from './Banner/index';
import Trademark from './Trademark/index';
import SliderHome from './Slider/index';
import ProductsType from './ProductsType/index';
import AllProduct from './AllProduct/index';
// Context
import { getProductType, getProductSlider, getProductAll } from 'features/Product/pathAPI';

export default function HomePage() {
    document.querySelector('title').innerHTML = 'Kaito Shop';
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    //Slider
    const dataSlider = useSelector(state => state.slider.listProductSlider);
    const loadingSlider = useSelector(state => state.slider.loading);
    // ProductsType
    const dataProductsType = useSelector(state => state.type.listProductSlider);
    const loadingProductsType = useSelector(state => state.type.loading);
    // list Product 
    const dataProductsList = useSelector(state => state.ListProduct.data);
    const loadingProductsList = useSelector(state => state.ListProduct.loading);
    const lengthProductsList = useSelector(state => state.ListProduct.length);
    //effApi
    useEffect(() => {
        const fetchTypeAPI = async () => {
            const paramsType = {
                name: 'Puma',
                page: 1,
                sort_price: 0
            }
            await dispatch(getProductType(paramsType));
            //
            const paramSlider = {
                name: 'Converse'
            }
            await dispatch(getProductSlider(paramSlider));
        }
        fetchTypeAPI();
    }, []);
    useEffect(() => {
        const fetchAPIListProduct = async () => {
            const params = {
                page: page
            }
            await dispatch(getProductAll(params));
        };
        fetchAPIListProduct();
    }, [page]);
    const onChangePage = pageNew => {
        setPage(pageNew + page)
    }

    return (
        <div className="group-home">
            <div className="home">
                <Banner />
                <Trademark />
                <ProductsType
                    data={dataProductsType}
                    loading={loadingProductsType}
                />
                <SliderHome
                    data={dataSlider}
                    loading={loadingSlider}
                />
                <AllProduct
                    data={dataProductsList}
                    loading={loadingProductsList}
                    lengthAllProduct={lengthProductsList}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    )
}