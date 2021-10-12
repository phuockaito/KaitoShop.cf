import { Modal } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import ListCart from './Cart/index';
export default function CartUser({
  token,
  setOpenCartUser,
  openCartUser,
  listCartUser,
  lengthCart,
  loadingCart,
  LoadingBtn,
  limitCart,
  setLimitCart
}) {
  return (
    <>
      <Modal
        title={`Tất cả có ${lengthCart} giỏ hàng`}
        visible={openCartUser}
        footer={false}
        centered
        onCancel={() => setOpenCartUser(false)}
        width={1200}
        className="list-ground-cart-user"
      >
        {/* loading */}
        {
          loadingCart &&
          <div style={{ padding: '10px 0' }}>
            <LoadingBtn />
          </div>
        }
        {/* nếu có giỏ hàng */}
        {
          !loadingCart && lengthCart > 0 &&
          <ListCart cart={listCartUser} token={token} />
        }
        {/* nếu không có bình luận nào */}
        {
          !loadingCart && listCartUser.length === 0 &&
          (
            <div
              style={{
                textAlign: 'center',
                padding: '30px 0'
              }}
            >
              <FileSearchOutlined
                style={{
                  fontSize: '1.5em'
                }}
              />
              <p>Không có gì để hiển thị</p>
            </div>
          )
        }
        {
          !loadingCart && listCartUser.length < lengthCart && <button className="load-data-cart" onClick={() => setLimitCart(limitCart + 1)}>Tải Thêm</button>
        }
      </Modal>
    </>
  )
}

