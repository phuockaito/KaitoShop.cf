import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
// API
import { getProductId } from "features/Product/pathAPI";
import { updateToProduct } from 'features/Admin/Product/pathAPI';
//Component
import LoadingPage from 'loading/index';
import FormProduct from '../FormProduct/index';
import NotFount from 'routesDom/Page/NotFount/index';
//Css
import './style.css'
export default function EditProduct() {
  const dispatch = useDispatch();
  const { id_product } = useRouteMatch().params;
  //state
  const [valuesEdit, setValuesEdit] = useState(1);
  const dataProductsEdit = useSelector(state => state.productId.product);
  const length = useSelector(state => state.productId.length);
  const loading = useSelector(state => state.productId.loading);
  // dispatch action
  const actionGetProductId = id => dispatch(getProductId(id));
  const actionUpdateProduct = (data, token) => dispatch(updateToProduct(data, token));
  console.log(dataProductsEdit)
  console.log(length)
  useEffect(() => {
    actionGetProductId(id_product);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    if (id_product) {
      const { name, price, sex, key, NSX, collections, productType, description, poster, color, size } = dataProductsEdit;
      const data = {
        price: price,
        name: name,
        sex: sex,
        key: key,
        NSX: NSX,
        collections: collections,
        productType: productType,
        description: description,
        poster: poster,
        color: color,
        size: size
      }
      setValuesEdit(data);
    }
  }, [id_product]);
  return (
    <div className="ground-edit-product">
      <div className="container-edit-product">
        {loading && <LoadingPage />}
        {(!loading && dataProductsEdit) ? <FormProduct
          id_product={id_product}
          valuesEdit={valuesEdit}
          actionUpdateProduct={actionUpdateProduct}
        />
          :
          <NotFount />
        }
      </div>
    </div>
  )
};

