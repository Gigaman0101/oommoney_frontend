import React, { useContext } from 'react';
import axios from '../../config/axios';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/LocalStorageService';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';

const StyledButton = styled(Button)`
    background-color: salmon;
  /* color: palevioletred;
  font-weight: normal;
  :focus {
    color: palevioletred;
    border-color: palevioletred;
  }
  :hover {
    color: palevioletred;
    border-color: palevioletred;
  }
  &.ant-btn-clicked:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    border: 0 solid palevioletred;
    opacity: 0.4;
    -webkit-animation: buttonEffect 0.4s;
    animation: buttonEffect 0.4s;
    display: block;
  } */
`;

function LoginForm() {

    const { setRole, setUser } = useContext(UserContext);
    const history = useHistory();

    const onFinish = values => {
        axios.post("/users/login", {
            username: values.username,
            password: values.password
        })
            .then(res => {
                notification.success({
                    description: "Login success."
                });
                LocalStorageService.setToken(res.data.token);
                const token = LocalStorageService.getToken();
                setUser(jwtDecode(token))
                setRole("USER");
                history.push('/money');
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Login failed."
                });
            });
    };

    return (
        <Row justify="center" >
            <Col xs={20} sm={16} md={12} lg={20} xl={24}>
                <Row justify="center">
                    <Col>
                        <img style={{ height: "150px", width: "150px", marginTop: "30px", border: "15px white solid", backgroundColor: "white", borderRadius: "50%", objectFit: "cover" }} src="https://pbs.twimg.com/profile_images/882982636301332484/8p1Y_rVC.png" alt="logo" />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="/">
                                    Forgot password
                            </a>
                            </Form.Item>

                            <Form.Item >
                                <StyledButton style={{ marginRight: "10px" }} type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </StyledButton>
                                <div style={{ marginRight: "10px" }}>Or</div>
                                <Link to="/register">register now!</Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default LoginForm
