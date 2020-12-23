import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Modal, Button, Form, Input, notification } from 'antd';
import axios from '../../../config/axios';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

export const Transfer = () => {

    const history = useHistory()

    const [transferIn, setTransferIn] = useState(false);
    const [transferOut, setTransferOut] = useState(false);
    const [allBag, setAllBag] = useState([]);

    // เรียกข้อมูลกระเป๋าของเราทั้งหมด
    const fetchMyAllBag = async () => {
        const res = await axios.get("/bags/");
        console.log("res.data: ", res.data)
        setAllBag(res.data);
    };

    const showTransferInModal = () => {
        setTransferIn(true);
        console.log('transferIn:', transferIn);
    };

    const showTransferOutModal = () => {
        setTransferOut(true);
        console.log('transferOut:', transferOut);
    }

    const onOk = () => {
        setTransferIn(false);
        setTransferOut(false);
    }

    const onCancel = () => {
        setTransferIn(false);
        setTransferOut(false);
    }

    const onFinish = (values) => {
        if (values.Transfer === "deposit") {
            axios.post("/transfer/deposit", {
                amountPlus: values.amount
            }).then(res => {
                notification.success({
                    description: " ฝากเงิน สำเร็จ"
                });
                history.push("/money")
            }).catch(err => {
                console.log(err);
                notification.error({
                    description: "ฝากเงิน ไม่สำเร็จ"
                });
            });
        } else if (values.Transfer === "withdraw") {
            axios.post("/transfer/withdraw", {
                amountMinus: values.amount
            }).then(res => {
                notification.success({
                    description: " ถอนเงิน สำเร็จ"
                });
                history.push("/money")
            }).catch(err => {
                console.log(err);
                notification.error({
                    description: "ถอนเงิน ไม่สำเร็จ"
                });
            });
        } else {
            axios.post(`/transfer/`, {
                amountPlus: values.amount,
                firstName: values.firstName
            }).then(res => {
                notification.success({
                    description: " โอนเงิน สำเร็จ"
                });
                history.push("/money")
            }).catch(err => {
                console.log(err);
                notification.error({
                    description: "โอนเงิน ไม่สำเร็จ"
                });
            });
        }
    };

    const onFinishInside = values => {
        axios.post("/transfer/inside", {
            amountPlus: values.amount,
            type_bagBy: values.type_bagBy,
            type_bagTo: values.type_bagTo
        }).then(res => {
            notification.success({
                description: `โอนเงินไปยัง ${values.type_bagTo} สำเร็จ`
            });
            history.push("/money");
        }).catch(err => {
            console.log(err);
            notification.error({
                description: `โอนเงินไปยัง ${values.type_bagTo} ไม่สำเร็จ`
            });
        });
    };

    useEffect(() => {
        fetchMyAllBag();
    }, []);

    const checkButton = () => {
        let isRender = false;
        allBag.forEach(item => {
            if (item.type_bag === "FUN BAG" || item.type_bag === "GROW BAG") {
                isRender = true;
            }
        });
        return isRender;
    };

    console.log('checkButton: ', checkButton());
    console.log('allBag: ', allBag);

    return (
        <Row justify="center" align="middle" style={{ backgroundColor: "salmon", height: "80vh", margin: "5vh 15vh", border: "2px solid black", borderRadius: "5px" }}>
            {/* {allBag.reduce() */}
            <Col span={10}>
                <button onClick={showTransferOutModal} style={{ height: "0%", width: "50%", cursor: "pointer", fontSize: "20px" }} >
                    โอนไปบัญชีอื่น
                </button>
            </Col>
            {checkButton() &&
                <Col span={10}>
                    <button onClick={showTransferInModal} style={{ height: "20%", width: "20%", cursor: "pointer", fontSize: "20px" }}>
                        โอนภายในแอป
                </button>
                </Col>}
            {/* } */}

            <Modal title="โปรดเลือกช่องทางการแลกเปลื่ยนเงิน" visible={transferOut} onCancel={onCancel} >
                <Row justify="center">
                    <Col xs={20} sm={16} md={12} lg={20} xl={24}>
                        <Row justify="center">
                            <Col>
                                <Form
                                    name="create_bag"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    footer={null}
                                >
                                    <Form.Item
                                        name="amount"
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (value > 0) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('จำนวนเงินต้องมากกว่า ศูนย์ !');
                                                },
                                            }),]}
                                    >
                                        <Input placeholder="จำนวนเงิน" />
                                    </Form.Item>

                                    <Form.Item
                                        name="Transfer"
                                        label="ฝาก โอน ถอน ?"
                                        required={[{ required: true }]}
                                    >
                                        <Select
                                            placeholder="โปรดเลือกการชำระเงิน"
                                            allowClear
                                        >
                                            <Option value="deposit">ฝาก</Option>
                                            <Option value="transfer" >โอน</Option>
                                            <Option value="withdraw">ถอน</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="firstName"
                                        label="Username คนที่ต้องการโอนให้ (กรณีเลือกโอน)"
                                    >
                                        <Input placeholder="โปรดใส่ชื่อ first name" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">ชำระเงิน</Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>


            <Modal title="อยากเอาเงินไปกระเป๋าไหนเป็นพิเศษไหม" visible={transferIn} onCancel={onCancel}>
                <Row justify="center">
                    <Col xs={20} sm={16} md={12} lg={20} xl={24}>
                        <Row justify="center">
                            <Col>
                                <Form
                                    name="create_bag"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinishInside}
                                    footer={null}
                                >
                                    <Form.Item
                                        name="amount"
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (value > 0) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('จำนวนเงินต้องมากกว่า ศูนย์ !!');
                                                },
                                            }),]}
                                    >
                                        <Input placeholder="จำนวนเงิน" />
                                    </Form.Item>

                                    <Form.Item
                                        name="type_bagBy"
                                        label="From"
                                        required={[{ required: true }]}
                                    >
                                        <Select
                                            placeholder="โปรดเลือกการชำระเงิน"
                                            allowClear
                                        >
                                            {allBag.map((item) => <Option value={item.type_bag}>{item.type_bag}</Option>)}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="type_bagTo"
                                        label="To"
                                        required={[{ required: true }]}
                                    >
                                        <Select
                                            placeholder="โปรดเลือกการชำระเงิน"
                                            allowClear
                                        >
                                            {allBag.map((item) => <Option value={item.type_bag}>{item.type_bag}</Option>)}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">ชำระเงิน</Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </Row>
    )
}

export default Transfer
