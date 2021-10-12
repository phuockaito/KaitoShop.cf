import { ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Select, Form, Button, Image, notification } from "antd";
import ReactHtmlParser from "react-html-parser";
import Slider from "react-slick";

import StarRatings from "react-star-ratings";
import imgFreeShip from "image/freeship.png";

const { Option } = Select;
const formatter = new Intl.NumberFormat("vn");

export default function InForProduct({ dataProductsId, actionAddToCart }) {

  const [form] = Form.useForm();
  //state
  const [quantity, SetQuantity] = useState(1);
  // from size
  const onFinish = (values) => {
    try {
      if (values) {
        const { _id, name, price, poster, NSX, key } = dataProductsId;
        const dataCart = {
          product: {
            key,
            NSX,
            _id,
            name,
            price,
            poster: poster[0].url,
            size: values.size,
          },
          quantity: quantity,
        };
        actionAddToCart(dataCart);
      }
    } catch (error) {
      console.log(error)
    }
  };
  const onFinishFailed = () => {
    notification['error']({
      message: 'Không Thể Thêm Vào Giỏ Hành',
      description:
        'Vui lòng chọn kích cỡ sản phẩm đó ?'
    });
  }
  const showReview = (numReviews, rating) => {
    const rate = rating / numReviews;
    if (numReviews > 0) {
      return (
        <div className="review-products">
          <div className="start-review">
            <StarRatings
              starDimension="22px"
              starRatedColor="#fed330"
              starHoverColor="#fed330"
              rating={rate}
              starEmptyColor="white"
            />
            <span>{rate.toFixed(1)}</span>
          </div>
          <p>{numReviews} đánh giá</p>
        </div>
      );
    } else {
      return (
        <>
          <StarRatings
            starDimension="22px"
            starRatedColor="#fed330"
            starHoverColor="#fed330"
            starEmptyColor="none"
            numberOfStars={5}
          />
          <p style={{ color: "#ee4d2d" }}> Chưa có đánh giá !</p>
        </>
      );
    }
  };
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={dataProductsId.poster[i].url} />
        </a>
      );
    },
    dots: true,
    dotsClass: "group-array-image",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplaySpeed: 3000,
    nextArrow: (
      <div>
        <i class="fa fa-angle-right right"></i>
      </div>
    ),
    prevArrow: (
      <div>
        <i class="fa fa-angle-left left"></i>
      </div>
    ),
  };
  return (
    <>
      <div className="group-detail-products">
        <div className="group-detail">
          <div className="group-image-detail">
            <Slider {...settings}>
              {dataProductsId.poster.map((image, index) => (
                <div className="image-array-slider" key={index}>
                  <Image src={image.url} alt={image._id} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="group-information-detail">
            <div className="information-detail">
              <div className="name-detail">
                <h3>{dataProductsId.name}</h3>
              </div>
              <div className="group-description-more">
                <div className="description-more-info">
                  <div className="group-rate-Review">
                    {showReview(dataProductsId.numReviews, dataProductsId.rating)}
                  </div>
                  <p>
                    mã sản phẩm: <span>{dataProductsId._id}</span>
                  </p>
                  <p>
                    nhà xản xuất: <span>{dataProductsId.key}</span>
                  </p>
                  <p>
                    bộ sưu tập: <span>{dataProductsId.collections}</span>
                  </p>
                  <p>
                    loại sản phẩm: <span>{dataProductsId.productType}</span>
                  </p>
                  <p>
                    dòng sản phẩm: <span>{dataProductsId.NSX}</span>
                  </p>
                  <p>
                    màu sắc: {dataProductsId.color.map((color, index) => (<span key={index}>{color}</span>))}
                  </p>
                  <p>
                    giới tính: <span>{dataProductsId.sex}</span>
                  </p>
                </div>
              </div>
              <div className="group-free-detail">
                <div className="img-free-detail">
                  <img src={imgFreeShip} alt="free-ship" />
                </div>
                <p>
                  Miễn phí giao hàng (tối đa 30k) cho đơn hàng từ 900k Xem chi
                  tiết
									</p>
              </div>
              <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className="group-buys-detail">
                  <div className="group-quantity-number">
                    <span>số lượng</span>
                    <div className="quantity-number">
                      <div
                        className="click-left"
                        onClick={() => {
                          SetQuantity(quantity === 1 ? 1 : quantity - 1);
                        }}
                      >
                        -
												</div>
                      <p>{quantity}</p>
                      <div
                        className="click-right"
                        onClick={() => {
                          SetQuantity(quantity + 1);
                        }}
                      >
                        +
												</div>
                    </div>
                  </div>
                  <div className="buys-detail">
                    <Button
                      type="primary"
                      htmlType="submit">
                      <ShoppingCartOutlined style={{ fontSize: '1.3em' }} />
												chọn mua hàng
											</Button>
                  </div>
                </div>
                <div className="group-price-size">
                  <div className="group-price">
                    <span>
                      {formatter.format(dataProductsId.price)} <u>đ</u>
                    </span>
                  </div>
                  <div className="group-size">
                    <Form.Item
                      name="size"
                      label="Chọn kích cỡ"
                      rules={[
                        {
                          required: true,
                          message: false,
                        },
                      ]}
                    >
                      <Select placeholder="size" style={{ width: "100%" }}>
                        {dataProductsId.size.map((Size, index) => (
                          <Option value={Size} key={index}>
                            {Size}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="group-description" data-aos="fade-down">
          <h2>Mô tả Sản phẩm</h2>
          <div className="group-description-text">
            {ReactHtmlParser(dataProductsId.description)}
          </div>
        </div>
      </div>
    </>
  );
};
