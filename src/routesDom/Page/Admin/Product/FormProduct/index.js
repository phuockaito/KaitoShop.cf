import { useState, useEffect, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, InputNumber, Select, Row, Col, Radio, Tag, Upload, Modal, notification } from 'antd';
// product
import MenuProduct from './MenuProduct';
import SizeProduct from './SizeProduct';
// userContext
import { UserContext } from 'contexts/UserContext';
// Css
import styleForm from './styleForm';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export default function FormProduct({ actionPostAddProduct, id_product, valuesEdit, actionUpdateProduct }) {

  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  //state
  const state = useContext(UserContext);
  const [token] = state.token;
  const [keyProduct, setKeyProduct] = useState('');
  const [productLine, setProductLine] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [linkNewProduct, setLinkNewProduct] = useState('');
  const [colorDefault, setColorDefault] = useState([]);
  const [fileListImage, setFileListImage] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // useEffect
  useEffect(() => {
    form.resetFields(["NSX"]);
  }, [keyProduct]);
  useEffect(() => {
    if (valuesEdit) {
      form.setFieldsValue(valuesEdit);
      const { color, poster, key, NSX } = valuesEdit;
      setColorDefault([color]);
      setKeyProduct(key);
      setProductLine(NSX);
      if (poster) {
        setFileListImage(poster);
      }
    };
  }, [valuesEdit]);
  useEffect(() => {
    form.setFieldsValue({ NSX: productLine });
  }, [productLine]);
  //function from add and edit
  const onFinish = async (values) => {
    try {
      if (values) {
        const { name, size, price, sex, collections, productType, key, NSX, description } = values;
        const formData = new FormData();
        if (id_product) {
          setLoading(true)
          const imageOld = [];
          if (fileListImage.length < 4) {
            notification['error']({
              message: 'Thông Báo',
              description:
                'Vui lòng tải lên 4 ảnh',
            });
          }
          else {
            for (let index = 0; index < fileListImage.length; index++) {
              const element = fileListImage[index];
              if (element.uid) {
                formData.append('poster', fileListImage[index].originFileObj);
              }
              if (element.url) {
                imageOld.push(fileListImage[index])
              }
            }
            const productUpdate = { name, size, price, sex, color: colorDefault, description, collections, productType, key, NSX, imageOld: imageOld, id_product: id_product };
            formData.append('product', JSON.stringify(productUpdate));
            const resultProduct = await actionUpdateProduct(formData, token);
            const resProduct = unwrapResult(resultProduct);
            if (resProduct) {
              setLoading(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              let linkProduct = resProduct.product;
              setLinkNewProduct(`/detail-products?id_product=${linkProduct._id}&key=${linkProduct.key}`)
              notification['success']({
                message: 'Thông Báo !',
                description: 'Cập nhật thành công '
              });
            }
          }
        }
        // add product
        if (!id_product) {
          setLoading(true)
          const productAdd = { name, size, price, sex, color: colorDefault, description, collections, productType, key, NSX };
          // append data product
          for (var index = 0; index < fileListImage.length; index++) {
            formData.append('poster', fileListImage[index].originFileObj);
          }
          formData.append('product', JSON.stringify(productAdd));
          // Check Api Request
          const resultProduct = await actionPostAddProduct(formData, token);
          const resProduct = unwrapResult(resultProduct);
          if (resProduct) {
            setLoading(false);
            form.resetFields();
            setFileListImage([]);
            setColorDefault([]);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            let linkProduct = resProduct.product;
            setLinkNewProduct(`/detail-products?id_product=${linkProduct._id}&key=${linkProduct.key}`)
            notification['success']({
              message: 'Thông Báo !',
              description: 'Thêm mới thành công'
            });
          }
        };
      }
    } catch (error) {
      console.log(error)
    };
  };
  const onChangeProduct = key => {
    setKeyProduct(key);
  };
  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue && colorDefault.indexOf(inputValue) === -1) {
      setColorDefault([...colorDefault, inputValue]);
      setInputValue('');
      setInputVisible(false);
    } else {
      setInputVisible(false);
      setInputValue('');
    }
  };
  const onCloseColor = color => {
    console.log(color)
    const newColor = colorDefault.filter(tag => tag !== color);
    setColorDefault(newColor);
  };
  // image
  const handlePreview = async file => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    } catch (error) {
      console.log(error)
    }
  };
  const handleChange = f => {
    const { file, fileList, event } = f;
    let isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
    let isLt2M = file.size / 1024 / 1024 < 2;
    if (id_product) {
      //---------------delete image---------------
      if (file && fileList.length === 0 || file && fileList.length > 0 && !event) {
        const newImage = [...fileListImage];
        const index = newImage.findIndex(image => image.id === file.id);
        newImage.splice(index, 1);
        setFileListImage(newImage);
      }
      //---------------add image---------------
      if (fileList.length > 0 && event) {
        if (!isJpgOrPng) {
          notification['error']({
            message: 'Thông Báo',
            description:
              'Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG !',
          });
        }
        if (!isLt2M) {
          notification['error']({
            message: 'Thông báo',
            description:
              'Hình ảnh phải nhỏ hơn 2MB ',
          });
        }
      }
      if (isLt2M && isJpgOrPng) {
        setFileListImage(fileList);
      }
    }
    if (!id_product) {
      if (!isJpgOrPng) {
        notification['error']({
          message: 'Thông Báo',
          description:
            'Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG !',
        });
      }
      if (!isLt2M) {
        notification['error']({
          message: 'Thông báo',
          description:
            'Hình ảnh phải nhỏ hơn 2MB ',
        });
      }
      if (isLt2M && isJpgOrPng) {
        setFileListImage(fileList);
      }
    }
  };
  return (
    <>
      {linkNewProduct && <h4> Click xem sản phẩm vừa  {id_product ? "cập nhật" : "thêm"} <Link to={linkNewProduct}>Tại Đây</Link></h4>}
      <h3>{id_product ? 'Chỉnh sữa' : 'Thêm mới'} sản phẩm </h3>
      <Form
        form={form}
        {...styleForm}
        onFinish={onFinish}
        className="from-add-product from-edit-product"
        name="product"
        hasFeedback={true}
      >
        <Form.Item
          label="Tên Sản Phẩm"
          hasFeedback
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' }]}
        >
          <TextArea rows={2} maxLength={100} />
        </Form.Item >
        <Form.Item
          hasFeedback
          label="Giá Tiền"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={99999999} />
        </Form.Item>
        <Form.Item
          label="Giới Tính"
          hasFeedback
          name="sex"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính !' }]}
        >
          <Radio.Group>
            <Radio value="nam" defaultChecked  >Nam</Radio>
            <Radio value="nữ" defaultChecked >Nữ</Radio>
            <Radio value="nam, nữ" defaultChecked >Nam, Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Nhà Sản Xuất"
          hasFeedback
          name="key"
          rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất !' }]}
        >
          <Select
            onChange={onChangeProduct}
          >
            {MenuProduct.map((product, index) => (
              <Option value={product.key} key={index}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Dòng Sản Phẩm"
          hasFeedback
          name="NSX"
          rules={[{ required: true, message: 'Vui lòng chọn dòng sản phẩm !' }]}
        >
          <Select
          >
            {
              MenuProduct.map((product, index) => (
                product.productType.map((type, index) => product.key === keyProduct && (
                  <Option value={type.type} key={index}>
                    {type.name}
                  </Option>
                ))
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Bộ Sưu Tập"
          hasFeedback
          name="collections"
          rules={[{ required: true, message: 'Vui lòng nhập bộ sưu tập !' }]}
        >
          <TextArea rows={2} maxLength={100} />
        </Form.Item>
        <Form.Item
          label="Loại Sản Phẩm"
          hasFeedback
          name="productType"
          rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm !' }]}
        >
          <TextArea rows={2} maxLength={100} />
        </Form.Item>
        <Form.Item
          label="Mô Tả Sản Phẩm"
          hasFeedback
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung sản phẩm !' }]}
        >
          <TextArea rows={11} />
        </Form.Item>
        <Form.Item
          label="Tải Ảnh Lên"
          hasFeedback
          name="poster"
          rules={[{ required: (fileListImage.length < 1 || fileListImage.length < 4) ? true : false, message: 'Vui lòng tải 4 ảnh  lên  !' }]}
        >
        </Form.Item>
        <Upload
          listType="picture-card"
          accept=".jpg, .jpeg, .png"
          fileList={fileListImage}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={4}
          multiple
        >
          {fileListImage.length >= 4 ? null : <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => { setPreviewVisible(false) }}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Form.Item
          label="Màu Sắc"
          hasFeedback
          name="color"
          rules={[{ required: (colorDefault.length < 1) ? true : false, message: 'Vui lòng thêm màu cho sản phẩm !' }]}
        >
          {colorDefault.map((color, index) => (
            <Tag
              key={index}
              closable
              onClose={() => onCloseColor(color)}
              maxTagCount={3}
            >
              {color}
            </Tag>
          ))}
          {(inputVisible && colorDefault.length < 5) && (
            <Input
              type="text"
              size="small"
              style={
                {
                  display: 'block',
                  margin: '10px auto',
                  width: '200px',
                  height: '30px'
                }
              }
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {(!inputVisible && colorDefault.length < 5) && (
            <Tag
              style={
                {
                  display: 'block',
                  margin: '10px auto',
                  width: '100px'
                }
              }
              onClick={() => { (setInputVisible(true)) }}
            >
              <PlusOutlined /> Thêm màu
            </Tag>
          )}
        </Form.Item>
        <Form.Item
          label="Chọn Size"
          hasFeedback
          name="size"
          rules={[{ required: true, message: 'Vui lòng nhập màu !' }]}
        >
          <Checkbox.Group style={{ width: '100%' }} >
            <Row>
              {SizeProduct.map((name, index) => (
                <Col span={8} key={index}>
                  <Checkbox value={name.value}>{name.size}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item >
          <Button style={{ marginTop: '10px' }} type="primary" htmlType="submit" loading={loading}>
            {id_product ? 'Cập Nhật' : 'Thêm Sản Phẩm'}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};
