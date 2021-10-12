import { Button, Modal, Form, Input } from "antd";
import formItemLayout from "./Style/style";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from 'react';


export default function UpdatePassword({
  isInformation,
  setIsInformation,
  actionUpChangePassword,
  token
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onChangeInformationUser = async (value) => {
    if (value) {
      const data = {
        password: value.password.trim()
      };
      setLoading(true)
      const resultPassword = await actionUpChangePassword(data, token);
      const currentPassword = unwrapResult(resultPassword);
      if (currentPassword) {
        setLoading(false);
        setIsInformation(false);
        form.resetFields(["password"]);
        form.resetFields(["confirm"]);
      }
    }
  };
  return (
    <Modal
      centered
      visible={isInformation}
      title="Đổi mật khẩu"
      onCancel={() => setIsInformation(false)}
      footer={[
        <Form form={form} onFinish={onChangeInformationUser}>
          <Button key="back" onClick={() => setIsInformation(false)}>
            Hủy
					</Button>
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Lưu mật khẩu
					</Button>
        </Form>,
      ]}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          className="input-password"
          name="password"
          rules={[
            {
              min: 8,
              message: "Mật khẩu quá ngắn ít nhất 8 ký tự !",
            },
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập mật khẩu của bạn !",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhập lại mật khẩu !",
              type: "string",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu bạn đã nhập không khớp !");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
