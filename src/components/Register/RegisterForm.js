import React from 'react';
import { Row, Button, Form, Input, Select } from "antd";

const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 5, xxl: 5 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 19, xxl: 19 },
};

function RegisterForm(props) {

    const { Option } = Select;

    const onFinish = values => {
        console.log(values);
        const { username, password, firstName, lastName, email, education_level, status, phone_number, price_range, id_card, career } = values;
        props.setFormValue({ username, password, email, firstName, lastName, education_level, status, phone_number, price_range, id_card, career })
        props.next();
    }

    return (
        <Form
            style={{ width: "100%", padding: "20px" }}
            {...layout}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="firstName"
                label="First name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your First name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Last name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="id_card"
                label="ID Card"
                rules={[
                    {
                        required: true,
                        message: 'Please input your id card!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="single">Single (โสด)</Option>
                    <Option value="registered marriage">Registered marriage (สมรสจดทะเบียน)</Option>
                    <Option value="unregistered marriage">Unregistered marriage (สมรสไม่จดทะเบียน)</Option>
                    <Option value="divorced">Divorced (หย่า)</Option>
                    <Option value="widow">Widow (หม้าย)</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="education_level"
                label="Education level"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="primary_education">Primary education (ประถมศึกษา)</Option>
                    <Option value="secondary_education">secondary education (มัธยมศึกษา)</Option>
                    <Option value="vocational_certificate">Vocational Certificate (ปวช.)</Option>
                    <Option value="high_vocational_certificate">High Vocational Certificate (ปวส.)</Option>
                    <Option value="bachelor_degree">Bachelor's degree (ปริญญาตรี)</Option>
                    <Option value="master_degree">Master's degree (ปริญญาโท)</Option>
                    <Option value="phd">PhD (ปริญญาเอก)</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="career"
                label="Career"
                rules={[
                    {
                        required: true,
                        message: 'Please input your career!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="price_range"
                label="Price range"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="less_than15,000baht">Less than 15,000 Baht</Option>
                    <Option value="15,000-29,999baht">15,000-29,999 Baht</Option>
                    <Option value="30,000-49,999baht">30,000-49,999 Baht</Option>
                    <Option value="50,000-99,999baht">50,000-99,999 Baht</Option>
                    <Option value="100,000-399,999baht">100,000-399,999 Baht</Option>
                    <Option value="400,000-499,999baht">400,000-499,999 Baht</Option>
                    <Option value="500,000-999,999baht">500,000-999,999 Baht</Option>
                    <Option value="more_than999,999baht">More than 999,999 Baht</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Row justify="center" style={{ marginTop: "10px" }}>
                    <Button type="primary" htmlType="submit">
                        next
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default RegisterForm
