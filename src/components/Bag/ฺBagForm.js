import React, { useContext } from 'react';
import { Button, Col, Input, notification, Row, Select, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import UserContext from '../../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

function BagForm() {

    const { Option } = Select;

    const { showBagFrom, setShowBagForm, createGrow, setCreateGrow, createFun, setCreateFun } = useContext(UserContext);
    const history = useHistory();

    const onFinish = values => {
        axios.post("/bags/grow_fun", {
            name_bag: values.name_bag,
            amount: values.amount,
            type_bag: values.type_bag
        })
            .then(res => {
                notification.success({
                    description: `Create ${values.type_bag} success!!`
                });
                history.push('/money');
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Create failed."
                });
            })
    };

    return (
        <Row justify="center">
            <Col xs={20} sm={16} md={12} lg={20} xl={24}>
                <Row justify="center">
                    <Col>
                        <Form
                            name="create_bag"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="name_bag"
                                rules={[{ required: true, message: "Please input your account name!" }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Bag's name" />
                            </Form.Item>

                            <Form.Item
                                name="type_bag"
                                label="Type of your bag"
                                required={[{ required: true }]}
                            >
                                <Select
                                    placeholder="Select your type"
                                    allowClear
                                >
                                    <Option value="GROW BAG">Grow</Option>
                                    <Option value="FUN BAG">Fun</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">Create</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
        // <div>
        //     OKokokokok
        // </div>
    )
};

export default BagForm;
