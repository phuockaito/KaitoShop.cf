import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Button, Input } from 'antd';
import './style.css';
export default function Search() {
  const [keyWord, setKeyWord] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const onChangeKeyWord = e => {
    setKeyWord(e.target.value);
    if (e.target.value.trim() === '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  { openSearch ? document.querySelector('body').classList.add('active') : document.querySelector('body').classList.remove('active') }
  return (
    <div className="ground-search">
      <SearchOutlined
        style={{ color: 'white', fontSize: '1.2em' }}
        onClick={() => setOpenSearch(true)}
      />
      <div className={`search ${openSearch && 'open'}`}>
        <Form>
          <div className="input-search">
            <Form.Item
              name="keyWord"
            >
              <Input
                className="keyword-search"
                onChange={onChangeKeyWord}
                placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
              />
            </Form.Item>
          </div>
          <div className="icon-search">
            <Link to={`/search/${keyWord.trim()}`} >
              <Button
                htmlType="submit"
                type="primary"
                disabled={isFormValid}
                className='btn-search'
                onClick={() => setOpenSearch(false)}
              >
                <SearchOutlined
                  style={{ color: 'white', fontSize: '1.2em', display: 'block' }}
                  onClick={() => setOpenSearch(false)}
                />
              </Button>
            </Link>
          </div>
        </Form>
      </div>
      {openSearch && <div onClick={() => setOpenSearch(false)} className="active-before" />}
    </div>
  )
};
