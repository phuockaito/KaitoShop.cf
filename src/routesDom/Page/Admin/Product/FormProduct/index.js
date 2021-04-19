import { useState, useEffect, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, InputNumber, Select, Row, Col, Radio, Tag, Upload, Modal, notification } from 'antd';
// product
import KeyProduct from './KeyProduct';
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

export default function FormProduct({ actionPostAddProduct, id_product, valuesEdit }) {

  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  //state
  const state = useContext(UserContext);
  const [token] = state.token;
  const [nsx, setNsx] = useState('');
  const [color, setColor] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = ('');
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkNewProduct, setLinkNewProduct] = useState(null);
  //  state edit


  //function
  const onFinish = async (values) => {
    try {
      if (values) {
        if (id_product) {
          console.log('edit');
          console.log({ values })
        } else {
          setLoading(true)
          const { name, size, price, sex, collections, productType, key, NSX, description } = values;
          const newPoster = [];
          const product = {
            name,
            size,
            price,
            sex,
            color: color,
            description,
            collections,
            productType,
            key,
            NSX
          };
          // append data product
          const formData = new FormData();
          fileList.forEach(img => {
            newPoster.push(img.originFileObj);
          });
          for (var i = 0; i < newPoster.length; i++) {
            formData.append('poster', newPoster[i]);
          }
          formData.append('product', JSON.stringify(product));
          // Check Api Request
          const resultProduct = await actionPostAddProduct(formData, token);
          const resProduct = unwrapResult(resultProduct);
          if (resProduct) {
            setLoading(false);
            form.resetFields();
            setFileList([]);
            setColor([]);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            let linkProduct = resProduct.product;
            console.log(linkProduct);
            setLinkNewProduct(`${linkProduct.key}/${linkProduct.NSX.replace(/ /g, '-')}/${linkProduct.name.replace(/ /g, '-')}/${linkProduct._id}`)
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
  const onChangeProduct = nsx => {
    setNsx(nsx);
  }
  // useEffect
  useEffect(() => {
    form.resetFields(["NSX"]);
  }, [nsx]);
  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue && color.indexOf(inputValue) === -1) {
      setColor([...color, inputValue]);
      setInputValue('');
      setInputVisible(false);
    } else {
      setInputVisible(false);
      setInputValue('');
    }
  };
  const onCloseColor = tagColor => {
    let newColor = color.filter(tag => tag !== tagColor);
    setColor(newColor);
  };
  // image
  const handlePreview = async file => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    } catch (error) {
      console.log(error)
    }
  };

  const beforeUpload = async (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {

      notification['error']({
        message: 'Thông Báo',
        description:
          'Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG !',
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification['error']({
        message: 'Thông báo',
        description:
          'Hình ảnh phải nhỏ hơn 2MB  !. Vui lòng xóa ảnh đó',
      });
    }
    if (isLt2M && isJpgOrPng) {
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = ({ fileList }) => setFileList(fileList);
  console.log('price', valuesEdit);

  return (
    <>
      {linkNewProduct && <h4> Click xem sản phẩm vừa được thêm <Link to={linkNewProduct}>Tại Đây</Link></h4>}
      <h3>{id_product ? 'Chỉnh sữa' : 'Thêm mới'} sản phẩm </h3>
      <Form
        form={form}
        {...styleForm}
        onFinish={onFinish}
        className="from-add-product from-edit-product"
        name="product"
        initialValues={
          { 'price': valuesEdit }
        }
        hasFeedback={true}
      >
        <Form.Item
          label="Tên Sản Phẩm"
          hasFeedback
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' }]}
        >
          <Input />
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
          label="Gới Tính"
          hasFeedback
          name="sex"
          rules={[{ required: true, message: 'Vui lòng nhập gới tính !' }]}
        >
          <Radio.Group>
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
            <Radio value="Nam, Nữ">Nam, Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Nhà sản xuất"
          hasFeedback
          name="key"
          rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất !' }]}
        >
          <Select
            onChange={onChangeProduct}
            optionFilterProp="children"
          >
            {KeyProduct.map((product, index) => (
              <Option value={product.key} key={index}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Dòng sản phẩm"
          hasFeedback
          name="NSX"
          rules={[{ required: true, message: 'Vui lòng chọn dòng sản phẩm !' }]}
        >
          <Select
            optionFilterProp="children"
          >
            {
              KeyProduct.map((product, index) => (
                product.productType.map((type, index) => product.key === nsx && (
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
          <TextArea rows={10} />
        </Form.Item>
        <Form.Item
          label="Tải Ảnh Lên"
          hasFeedback
          name="s"
          rules={[{ required: (fileList.length < 1 || fileList.length < 4) ? true : false, message: 'Vui lòng tải 4 ảnh  lên  !' }]}
        >
        </Form.Item>
        <Upload
          beforeUpload={beforeUpload}
          listType="picture-card"
          accept=".jpg, .jpeg, .png"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          name="poster"
          maxCount={4}
          multiple
        >
          {fileList.length >= 4 ? null : <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => { setPreviewVisible(false) }}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        <Form.Item
          label="Màu Sắc"
          hasFeedback
          name="color"
          rules={[{ required: (color.length < 1) ? true : false, message: 'Vui lòng thêm màu cho sản phẩm !' }]}
        >
          {color.map((color, index) => (
            <Tag key={index} closable onClose={() => onCloseColor(color)} maxTagCount={3}>{color}</Tag>
          ))}
          {(inputVisible && color.length < 5) && (
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
          {(!inputVisible && color.length < 5) && (
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
            Thêm Sản Phẩm
           </Button>
        </Form.Item>
      </Form>
    </>
  )
};
