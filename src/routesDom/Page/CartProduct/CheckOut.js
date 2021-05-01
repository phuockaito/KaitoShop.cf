import { Drawer, Button, Form, Input, Select, InputNumber } from "antd";
import dataCity from "data.json";
import Loading from "component/LoadingPage/index";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 24,
    },
  },
};
export default function CheckOut({
  visible,
  setVisible,
  useState,
  useEffect,
  dataCart,
  actionToCarAPI,
  token,
  loadingPostCartAPI,
}) {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  // create state
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  // function
  const onChangeCity = (City) => {
    setCity(City);
  };
  const onChangeDistrict = (District) => {
    setDistrict(District);
  };
  const checkOutCart = (value) => {
    let totalSumCart = 0;
    if (dataCart.length > 0) {
      for (let index = 0; index < dataCart.length; index++) {
        totalSumCart +=
          dataCart[index].product.price * dataCart[index].quantity;
      }
    }
    const { city, district, commune, incubation, numberPhone, payment } = value;
    const cartInformation = {
      address: `${incubation} - ${commune} - ${district} - ${city}`,
      phone: numberPhone,
      totalSum: totalSumCart,
      cart: dataCart,
      payment: payment,
    };
    actionToCarAPI(cartInformation, token);
  };
  //
  useEffect(() => {
    form.resetFields(["district"]);
    form.resetFields(["commune"]);
  }, [city]);
  useEffect(() => {
    form.resetFields(["commune"]);
  }, [district]);
  return (
    <>
      {loadingPostCartAPI && <Loading />}
      <div className="group-check-out">
        {!loadingPostCartAPI && (
          <Drawer
            title="Thông tin nhận hàng"
            width={500}
            onClose={() => setVisible(false)}
            visible={visible}
            className="container-checkout"
          >
            <Form {...formItemLayout} form={form} onFinish={checkOutCart}>
              <Form.Item
                name="city"
                label="Tỉnh/Thành phố"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn tỉnh hoặc thành phố bạn ở !",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Tỉnh/Thành phố"
                  optionFilterProp="children"
                  onChange={onChangeCity}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {dataCity.map((city, index) => (
                    <Option value={city.name} key={index}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="district"
                label="Quận/Huyện"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn quận hoặc huyện nơi bạn !",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Quận/Huyện"
                  optionFilterProp="children"
                  onChange={onChangeDistrict}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {dataCity.map(
                    (itemCity, index) =>
                      itemCity.name === city &&
                      itemCity.huyen.map((huyen) => (
                        <Option value={huyen.name} key={index}>
                          {huyen.name}
                        </Option>
                      ))
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                name="commune"
                label="Xã/Thị Trấn"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn xã bạn ở !",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Xã/Thị Trấn"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {dataCity.map(
                    (itemCity) =>
                      itemCity.name === city &&
                      itemCity.huyen.map(
                        (huyen) =>
                          huyen.name === district &&
                          huyen.xa.sort().map((xa, index) => (
                            <Option value={xa.name} key={index}>
                              {xa.name}
                            </Option>
                          ))
                      )
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                name="incubation"
                label="Ấp/Số Nhà/Tên Đường"
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ cụ thể !",
                  },
                ]}
              >
                <TextArea
                  maxLength={150}
                  placeholder="địa chỉ cụ thể: ấp, số nhà, tên đường..."
                  rows={4}
                />
              </Form.Item>
              <Form.Item
                name="numberPhone"
                label="Số Điện Thoại"
                className="group-phone"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đúng số điện thoại !",
                  },
                ]}
              >
                <InputNumber min={0} type="number" max={999999999999} />
              </Form.Item>

              <Form.Item
                name="payment"
                label="Thanh toán"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phuong thức thanh toán",
                  },
                ]}
              >
                <Select placeholder="Thanh toán khi nhận hàng">
                  <Option value="Thanh toán khi nhận hàng">
                    Thanh toán khi nhận hàng
									</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-register"
                >
                  Đặt hàng ngay
								</Button>
              </Form.Item>
            </Form>
          </Drawer>
        )}
      </div>
    </>
  );
}
