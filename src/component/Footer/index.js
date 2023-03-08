import { useContext } from "react";
import { UserOutlined, EyeOutlined } from "@ant-design/icons";
// image
import cash from "image/cash.jpg";
import installment from "image/installment.jpg";
import internet_banking from "image/internet_banking.jpg";
import jcb from "image/jcb.jpg";
import mastercard from "image/mastercard.jpg";
import visa from "image/visa.jpg";
// Context
import { UserContext } from "contexts/UserContext";
import "./style.css";
var format = new Intl.NumberFormat();
export default function Footer() {
    const state = useContext(UserContext);
    const [UserOnline] = state.UserOnline;
    const [view] = state.view;
    return (
        <>
            <div className="frames-group-footer">
                <div className="group-footer">
                    <div className="footer">
                        <div className="group-information-user">
                            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                            <ul>
                                <li>Các câu hỏi thường gặp</li>
                                <li>Gửi yêu cầu hỗ trợ</li>
                                <li>Hướng dẫn đặt hàng</li>
                                <li>Phương thức vận chuyển</li>
                                <li>Chính sách đổi trả</li>
                                <li>Hướng dẫn mua trả góp</li>
                            </ul>
                        </div>
                        <div className="group-information-website">
                            <h3>VỀ SHOP</h3>
                            <ul>
                                <li>Giới thiệu</li>
                                <li>Tuyển Dụng</li>
                                <li>Chính sách bảo mật thanh toán</li>
                                <li>Chính sách bảo mật thông tin cá nhân</li>
                                <li>Chính sách giải quyết khiếu nại</li>
                                <li>Điều khoản sử dụng</li>
                            </ul>
                        </div>
                        <div className="group-payment">
                            <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                            <ul>
                                <li>
                                    <img src={cash} alt="cash" />
                                </li>
                                <li>
                                    <img src={installment} alt="installment" />
                                </li>
                                <li>
                                    <img
                                        src={internet_banking}
                                        alt="internet_banking"
                                    />
                                </li>
                                <li>
                                    <img src={jcb} alt="jcb" />
                                </li>
                                <li>
                                    <img src={mastercard} alt="mastercard" />
                                </li>
                                <li>
                                    <img src={visa} alt="visa" />
                                </li>
                            </ul>
                        </div>
                        <div className="group-connect-us">
                            <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.facebook.com/PhuocKaito1410"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/phuockaito"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <i className="fa fa-linkedin" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/phuockaito"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <i class="fa fa-github" />{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.kaitoshop.tk/"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <i className="fa fa-external-link" />
                                    </a>
                                </li>
                            </ul>
                            <div className="user-online">
                                <p>
                                    <UserOutlined /> Online {UserOnline}
                                </p>
                                <p>
                                    <EyeOutlined />
                                    {view > 1000 ? format.format(view) : view}
                                    lượt xem
                                </p>
                                <p style={{ fontSize: "16px" }}>
                                    Cập nhật mới nhất: 12/12/2022
                                </p>
                                <a
                                    href="https://nextjs-react-toolkit.vercel.app/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    style={{
                                        textAlign: "center",
                                        display: "block",
                                    }}>
                                    Version NextJs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
