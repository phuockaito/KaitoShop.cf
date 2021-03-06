import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import './style.css';
export default function Search() {
    const [keyWord, setKeyWord] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const onChangeKeyWord = e => {
        setKeyWord(e.target.value);
        if (e.target.value.trim() === '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }
    return (
        <div className="ground-search">
            <div className="main-search">
                <div className="from-search">
                    <div className="search">
                        <Form>
                            <i style={{ 'display': 'none' }} className="fa fa-long-arrow-left btn-close-search btn-search" />
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
                                    >
                                        <i className="fa fa-search" />
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                    </div>
                    <div className="show-menu-1000" style={{ 'display': 'none' }}>
                        <i className="fa fa-search btn-show-search" />
                    </div>
                </div>
            </div>
        </div>
    )
}
