import { useState } from 'react';
import { Button, Upload, Image, message } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import ImgCrop from 'antd-img-crop';
import {
    UploadOutlined,
} from '@ant-design/icons';

export default function UploadImage({ avatar, token, actionUploadImageUser, setUserConText }) {
    // create State
    const [loading, setLoading] = useState(false);
    const beforeUpload = async (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        if (isLt2M && isJpgOrPng) {
            setLoading(true);
            const imageData = new FormData();
            imageData.append("avatar", file);
            const actionResult = await actionUploadImageUser(imageData, token);
            const currentUser = unwrapResult(actionResult);
            if (currentUser) {
                setUserConText({
                    dataUser: currentUser.user,
                    token: token
                });
                setLoading(false);
            }
        }
        return isJpgOrPng && isLt2M;
    };
    return (
        <div className="group-avatar">
            <Image src={avatar} />
            <div className="group-upload-image">
                <ImgCrop
                    modalOk='Cập Nhật'
                    modalCancel='Hủy'
                    rotate
                    modalTitle='Cập ảnh đại diện'
                >
                    <Upload
                        beforeUpload={beforeUpload}
                        fileList={[]}
                        name="avatar"
                        accept=".jpg, .jpeg, .png"
                        listType="listTyp"

                    >
                        <Button
                            icon={<UploadOutlined />}
                            type="upload"
                            loading={loading}
                        >Tải ảnh lên
                        </Button>
                    </Upload>
                </ImgCrop>
            </div>
        </div>
    )
}