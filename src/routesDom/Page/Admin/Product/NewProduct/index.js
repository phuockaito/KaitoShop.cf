import { useDispatch } from 'react-redux';
//Component
import FormProduct from '../FormProduct/index';
//Api
import { postAddProduct } from 'features/Admin/Product/pathAPI';
// Css
import './style.css';
export default function NewProduct() {
  const dispatch = useDispatch();
  // dispatch api
  const actionPostAddProduct = (data, image, token) => dispatch(postAddProduct(data, image, token));
  //state

  return (
    <div className="ground-new-product">
      <div className="container-new-product">
        <FormProduct actionPostAddProduct={actionPostAddProduct} />
      </div>
    </div>
  )
}
