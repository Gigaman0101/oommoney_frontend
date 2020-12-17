import React from 'react';
import { Row, Button, Form, Input } from "antd";

const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 5, xxl: 5 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 19, xxl: 19 },
};

function AddressForm(props) {

    const onFinish = values => {
        console.log(values);
        const { house_no, moo, floor, village, soi, road, province, district, sub_district, postal_code } = values;
        props.setAddressValue({ house_no, moo, floor, village, soi, road, province, district, sub_district, postal_code });
        console.log(props.addressValue);
        props.next();
    };

    return (
        <Form
            style={{ width: "100%", padding: "20px" }}
            {...layout}
            name="address"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="้house_no"
                label="House No."
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
                name="moo"
                label="Moo"
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
                name="floor"
                label="Floor"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="village"
                label="Village"
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
                name="soi"
                label="Soi"
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
                name="road"
                label="Road"
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
                name="province"
                label="Province"
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
                name="district"
                label="District"
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
                name="sub_district"
                label="Sub District"
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
                name="postal_code"
                label="Postal Code"
                rules={[
                    {
                        required: true,
                        message: 'Please input your id card!',
                    },
                ]}
            >
                <Input />
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

export default AddressForm
