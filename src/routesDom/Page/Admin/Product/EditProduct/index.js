import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
// API
import { getProductId } from "features/Product/pathAPI";
//Component
import FormProduct from '../FormProduct/index';
import './style.css'
export default function EditProduct() {
  const dispatch = useDispatch();
  const { id_product } = useRouteMatch().params;
  //state
  const [valuesEdit, setValuesEdit] = useState(1);
  const dataProductsEdit = useSelector(state => state.productId.data);
  const loading = useSelector(state => state.productId.loading);
  // dispatch action
  const actionGetProductId = id => dispatch(getProductId(id));
  // useEffect
  useEffect(() => {
    actionGetProductId(id_product);
  }, []);
  useEffect(() => {
    if (dataProductsEdit.length > 0) {
      const { name, price } = dataProductsEdit[0];
      setValuesEdit(price);
    }
  }, [dataProductsEdit.length > 0]);
  return (
    <div className="ground-edit-product">
      <div className="container-edit-product">
        <FormProduct
          id_product={id_product}
          valuesEdit={valuesEdit}
        />
      </div>
    </div>
  )
}

