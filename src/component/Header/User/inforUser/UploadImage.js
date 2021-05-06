import { useState, useEffect } from "react";
import { Button, Upload, Image, message } from "antd";
import ImgCrop from "antd-img-crop";
import { CameraOutlined } from "@ant-design/icons";

export default function UploadImage({
  avatar,
  token,
  actionUploadImageUser,
  setUser,
  socket,
  idUser
}) {
  // create State
  const [loading, setLoading] = useState(false);
  // useEffect
  useEffect(() => {
    if (socket) {
      socket.on('serverUserUploadAvatar', msg => {
        const { userId, user } = msg;
        if (userId == idUser) {
          setUser(user);
          setLoading(false);
        }
      })
    }
  }, [socket, idUser]);
  //
  const beforeUpload = async (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB !");
    }
    if (isLt2M && isJpgOrPng) {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("avatar", file);
      const resultAvatar = await actionUploadImageUser(imageData, token);
      if (resultAvatar) {
        socket.emit("userUploadAvatar", {
          avatar: resultAvatar.payload.user,
          idUser: idUser
        });
      }
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <div className="group-avatar">
      <Image src={avatar} />
      <div className="group-upload-image">
        <ImgCrop
          modalOk="Cập Nhật"
          modalCancel="Hủy"
          rotate
          modalTitle="Cập ảnh đại diện"
        >
          <Upload
            beforeUpload={beforeUpload}
            fileList={[]}
            name="avatar"
            accept=".jpg, .jpeg, .png"
            listType="listTyp"
          >
            <Button
              icon={<CameraOutlined />}
              type="dashed"
              loading={loading}
            >
              Tải ảnh lên
						</Button>
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
}
