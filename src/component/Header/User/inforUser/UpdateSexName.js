import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Modal, Form, Input, Select, } from 'antd';
import formItemLayout from './Style/style'

const { Option } = Select;
export default function UpdateSexName(
    {
        isInformation,
        setIsInformation,
        token,
        actionUpdateNameSexUser,
        loadingUpdateNameSexUser,
        setLoadingUpdateNameSexUser,
        setUserConText
    }
) {

    const [form] = Form.useForm();
    const onChangeInformationUser = async (value) => {
        const data = {
            name: value.name.trim(),
            sex: value.sex
        }
        if (value) {
            setLoadingUpdateNameSexUser(true);
            const actionResult = await actionUpdateNameSexUser(data, token);
            const currentUser = unwrapResult(actionResult);
            if (currentUser) {
                setUserConText({
                    dataUser: currentUser.data,
                    token: token
                });
                setLoadingUpdateNameSexUser(false);
                setIsInformation(false);
                form.resetFields(['name']);
                form.resetFields(['sex']);
            }
        }
    };
    return (
        <Modal
            visible={isInformation}
            title=" Đổi Thông Tin"
            onCancel={() => setIsInformation(false)}
            footer={[
                <Form
                    form={form}
                    onFinish={onChangeInformationUser}
                >
                    <Button
                        key="back"
                        onClick={() => setIsInformation(false)}
                    >
                        Hủy
                        </Button>

                    <Button
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        loading={loadingUpdateNameSexUser}
                    >
                        cập Nhật
                        </Button>
                </Form>
            ]}
        >
            <Form
                {...formItemLayout}
                form={form}
            >
                <Form.Item
                    name="name"
                    label={
                        <span>
                            Tên của bạn&nbsp;
                                </span>
                    }
                    pattern={[/^[a-z0-9]+$/]}
                    rules={[
                        {
                            required: true,
                            message: 'Nhập đầy đủ tên bạn !',
                            whitespace: true,
                            type: 'string'
                        },
                        {
                            min: 1,
                            max: 25,
                            message: 'Vui lòng nhập đúng tên của bạn !',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="sex"
                    label="Giới tính"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn giới tính của bạn',
                        },
                    ]}
                >
                    <Select placeholder="Nam hoặc nữ" >
                        <Option value="Nam" >Nam</Option>
                        <Option value="Nữ">Nữ</Option>
                    </Select >
                </Form.Item>
            </Form>
        </Modal>

    )
}