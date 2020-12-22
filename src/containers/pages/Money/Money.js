import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Input, notification, Row, Select, Checkbox, Modal, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserContext from '../../../context/UserContext';
import axios from '../../../config/axios';
import { Link, useHistory } from 'react-router-dom';
// import BagModal from '../../../components/Bag/BagModal';

function Money() {

    const { Option } = Select;
    const history = useHistory();

    const { bag, setBag, user, growBag, setGrowBag, funBag, setFunBag } = useContext(UserContext);
    const [showBagForm, setShowBagForm] = useState(false);
    const [createGrow, setCreateGrow] = useState(false);
    const [createFun, setCreateFun] = useState(false);
    const [allMoney, setAllMoney] = useState("");
    // const [funBag, setFunBag] = useState(false);


    const fetchBag = async () => {
        const res = await axios.get("http://localhost:8000/bags/money");
        console.log("fetch_bag");
        console.log(res.data);
        setBag(res.data);
        console.log('bag:', bag);
    };

    const fetchAllMoney = async () => {
        const res = await axios.get("/bags/all_money")
        setAllMoney(res.data);
        console.log(allMoney);
    }

    // เปิดปิด modal
    const showBagModal = () => {
        setShowBagForm(true);
        console.log('showBagForm :', showBagForm)
    };

    // มีกระเป๋าไหม 
    const fetchGrow = async () => {
        const res1 = await axios.get("http://localhost:8000/bags/grow");
        if (res1.data.status === false) {
            console.log(res1.data.status)
            return setCreateGrow(res1.data.status);
        } else {
            setCreateGrow(true);
            return setGrowBag(res1.data);
        };
    };
    console.log('createGrow:', createGrow);
    console.log('growBag:', growBag);
    const fetchFun = async () => {
        const res2 = await axios.get("http://localhost:8000/bags/fun");
        if (res2.data.status === false) {
            console.log(res2.data.status)
            return setCreateFun(res2.data.status);
        } else {
            setCreateFun(true);
            return setFunBag(res2.data);
        };
    };
    console.log('createFun:', createFun);
    console.log('funBag:', funBag);

    const handleCancel = e => {
        console.log(e);
        setShowBagForm(false);
    };

    const handleOk = () => {
        setShowBagForm(false);
    };

    useEffect(() => {
        fetchBag();
        fetchFun();
        fetchGrow();
        fetchAllMoney();
    }, []);

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
                if (values.type_bag === "FUN BAG") {
                    setCreateFun(true);
                    fetchFun();
                } else {
                    setCreateGrow(true);
                    fetchGrow();
                }
                history.push('/money');
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Create failed."
                });
            })
    };

    // กด คลิกไปหน้าอื่น 
    const handleFunPage = () => {
        history.push("/funBag")
    }
    const handleGrowPage = () => {
        history.push("/growBag")
    }
    const handleMoneyPage = () => {
        history.push("/moneyBag")
    }

    return (
        <Row justify="center" align="middle" style={{ backgroundColor: "salmon", height: "80vh", margin: "5vh 15vh", border: "2px solid black", borderRadius: "5px" }}>
            <Col span={24} style={{ height: "100%" }}>
                <Row justify="space-around" style={{ height: "20%" }}>
                    <div style={{ marginRight: "500px", display: "flex", alignItems: "center", fontSize: "22px" }}>Hello {user.firstName}</div>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <div>ยอดเงินทั้งหมด</div>
                        <div>
                            {bag === "" ? 0 : allMoney} บาท
                        </div>
                    </div>
                </Row>
                <Row justify="center" align="middle" style={{ height: "30%", backgroundColor: "pink" }}>
                    <Col>
                        <div >
                            {bag.name_bag}
                        </div>
                        <div>
                            {bag === "" ? 0 : bag.amount} บาท
                        </div>
                        <button onClick={handleMoneyPage} style={{ cursor: "pointer" }}>ดูบัญชี</button>
                    </Col>
                </Row>
                <Row style={{ display: "flex", flexDirection: "column", height: "50%", backgroundColor: "sandybrown" }}>
                    <div style={{ paddingRight: "1100px", fontSize: "25px" }}>กระปุกของฉัน</div>
                    <Row justify="space-around" align="middle" >
                        <Col style={{ backgroundColor: "white", flexDirection: "column", alignItems: "center", display: "flex", justifyContent: "center", width: "300px", height: "250px", textAlign: "center", borderRadius: "10px" }}>
                            <div style={{ width: "50%", height: "50%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <div >Grow</div>
                                <div >ชื่อบัญชี: {growBag.name_bag}</div>
                                {/* <div>{growBag ? "0" : growBag.amount} บาท</div> */}
                                <div>{growBag.status !== false ? growBag.amount : "0"} บาท</div>
                            </div>
                            {createGrow ? <button onClick={handleGrowPage} style={{ cursor: "pointer" }}>ดูบัญชี</button> : <button onClick={showBagModal} style={{ cursor: "pointer" }}>สร้างกระเป๋า Grow กัน</button>}
                        </Col>
                        <Col style={{ backgroundColor: "white", flexDirection: "column", alignItems: "center", display: "flex", justifyContent: "center", width: "300px", height: "250px", textAlign: "center", borderRadius: "10px" }}>
                            <div style={{ width: "50%", height: "50%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <div>Fun</div>
                                <div>ชื่อบัญชี: {funBag.name_bag}</div>
                                {/* <div>{funBag ? 0 : funBag.amount} บาท</div> */}
                                <div>{funBag.status !== false ? funBag.amount : 0} บาท</div>
                            </div>
                            {createFun ? <button onClick={handleFunPage} style={{ cursor: "pointer" }}>ดูบัญชี</button> : <button onClick={showBagModal} style={{ cursor: "pointer" }}>สร้างกระเป๋า Fun กัน</button>}
                            <Modal visible={showBagForm} onOk={handleOk} onCancel={handleCancel}>
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
                            </Modal>
                        </Col>
                    </Row>
                </Row>
            </Col>
        </Row>

    )
};

export default Money
