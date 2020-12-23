import { Col, Divider, Row, Table, Form, Modal, Select, Input, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from '../../config/axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useLocation } from 'react-router-dom';

function MyBag(props) {

    const { Option } = Select;
    const location = useLocation();

    console.log(location);

    const { funBag, setFunBag, growBag, setGrowBag, bag, setBag } = useContext(UserContext);

    console.log('funBag: ', funBag)

    let newProps = props.funBag || props.growBag || props.bag;
    let newHistory = props.history || props.historyFun || props.historyGrow;
    let newTypeBag;

    if (newProps === props.funBag) {
        newTypeBag = "FUN BAG"
    } else if (newProps === props.growBag) {
        newTypeBag = "GROW BAG"
    } else {
        newTypeBag = "GROW BAG"
    };

    const [showEditForm, setShowEditForm] = useState(false);
    const [showChooseForm, setShowChooseForm] = useState(false);
    const [condition, setCondition] = useState();
    const [aCondition, setACondition] = useState();
    const [allCondition, setAllCondition] = useState(null);

    const columns = [
        { title: 'ประเภทการโอน', dataIndex: 'type_transfer', key: 'type_transfer' },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => {
                if (record.bag_by === newProps.id) {
                    return <div style={{ color: "red" }}>- {record.amount}</div>
                };
                if (record.bag_to === newProps.id) {
                    return <div style={{ color: "green" }}>+ {record.amount}</div>
                };
            }
        },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'ไปยังกระเป๋า', dataIndex: 'bag_to', key: 'bag_to' },
        { title: 'จากกระเป๋า', dataIndex: 'bag_by', key: 'bag_by' },
        { title: 'ไปยังบัญชี', dataIndex: 'transfer_to', key: 'transfer_to' },
        { title: 'จากบัญชี', dataIndex: 'transfer_by', key: 'transfer_by' },
    ];

    // Modal function
    const showEditConditionModal = () => {
        setShowEditForm(true);
        console.log('showEditForm: ', showEditForm);
    };

    const showChooseConditionModal = () => {
        setShowChooseForm(true);
        console.log('showChooseForm: ', showChooseForm);
    };

    const handleCancel = () => {
        setShowEditForm(false);
    };

    const onFinish = async (values) => {
        await axios.post("/conditions/", {
            condition_name: values.condition_name,
            condition_amount: values.condition_amount
        })
            .then(res => {
                notification.success({
                    description: `Create Condition success!!`
                });
                setCondition(res.data);
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Failed to Create"
                });
            });
        console.log(condition)
    };

    const handleOk = async () => {
        await axios.post("/has/", {
            condition_id: condition.id,
            bag_id: newProps.id
        }).then(res => {
            console.log(res.data);
            notification.success({
                description: "SYNC Condition to BAG success!!"
            })
            // setACondition(res.data);
        }).catch(err => {
            console.log(err);
            notification.error({
                description: "Failed to Create"
            });
        });
        setShowEditForm(false);
    };

    console.log('condition:', condition);

    const fetchUseCondition = async () => {
        console.log(newProps)
        console.log(props);
        console.log(funBag);
        if (location.pathname === "/funBag") {
            const res = await axios.get("/has/fun");
            setACondition(res.data);
            console.log('res: ', res)
        } else if (location.pathname === "/growBag") {
            const res = await axios.get("/has/grow");
            setACondition(res.data);
            console.log('res: ', res)
        } else {
            const res = await axios.get("/has/money");
            setACondition(res.data);
            console.log('res: ', res);
        }
    };

    const fetchAllCondition = async () => {
        const res = await axios.get("/conditions/myConditions");
        setAllCondition(res.data);
    };

    // const fetchFunBag = async () => {
    //     const res = await axios.get("/bags/fun");
    //     setFunBag(res.data);
    // };

    // const fetchGrowBag = async () => {
    //     const res = await axios.get("/bags/grow");
    //     setGrowBag(res.data);
    // };

    // const fetchMoneyBag = async () => {
    //     const res = await axios.get("/bags/money");
    //     setBag(res.data);
    // };

    useEffect(() => {
        // await fetchFunBag();
        // await fetchGrowBag();
        // await fetchMoneyBag();
        fetchUseCondition();
    }, [funBag.id, growBag.id, bag.id]);

    // console.log(aCondition[0].id);
    // console.log(allCondition);

    const onDeleteCondition = () => {
        axios.delete(`/has/${aCondition[0].id}`);
        setACondition(false)
    };

    console.log('aCondition: ', aCondition);

    return (
        <Row justify="center" align="middle" style={{ backgroundColor: "salmon", height: "100%", margin: "5vh 15vh", border: "2px solid black", borderRadius: "5px" }}>
            <Col span={24}>

                <img style={{ height: "150px", width: "150px", marginTop: "30px", border: "15px white solid", backgroundColor: "white", borderRadius: "50%", objectFit: "cover" }} src="https://pbs.twimg.com/profile_images/882982636301332484/8p1Y_rVC.png" alt="logo" />
                {location.pathname === "/funBag" ?
                    <div>{funBag.name_bag}</div> :
                    location.pathname === "/growBag" ?
                        <div>{growBag.name_bag}</div> :
                        location.pathname === "/moneyBag" ?
                            <div>{bag.name_bag}</div> :
                            null
                }
                <div>ยอดเงินเก็บ</div>
                {location.pathname === "/funBag" ?
                    <div>{funBag.amount} บาท</div> :
                    location.pathname === "/growBag" ?
                        <div>{growBag.amount} บาท</div> :
                        location.pathname === "/moneyBag" ?
                            <div>{bag.amount} บาท</div> :
                            <div>0 บาท</div>
                }
                {aCondition ? <Row justify="center">
                    <Col style={{ marginRight: "10px" }}>
                        <div>เงื่อนไขปัจจุบัน:  {aCondition.map(item => item.ConditionBag.condition_name)}</div>
                        {/* <div>เงื่อนไขปัจจุบัน:  {aCondition.ConditionBag.condition_name}</div> */}
                    </Col>
                    <Col>
                        <button onClick={onDeleteCondition}>ลบเงื่อนไข</button>
                    </Col>
                </Row> : null}
                <button onClick={showEditConditionModal}>สร้างเงื่อนไขใหม่</button>
                {/* <button onClick={showChooseConditionModal}>เลือกเงื่อนไข</button> */}
                <Modal title="Create Condition for ME" visible={showEditForm} onOk={handleOk} onCancel={handleCancel}>
                    <Row justify="center">
                        <Col xs={20} sm={16} md={12} lg={20} xl={24}>
                            <Row justify="center">
                                <Col>
                                    <Form
                                        name="create_condition"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        footer={null}
                                    >
                                        <Form.Item
                                            name="condition_name"
                                            label="Please Choose your condition"
                                            rules={[{ required: true, message: "Please input your account name!" }]}
                                        >
                                            <Select
                                                placeholder="Select your type"
                                                allowClear
                                            >
                                                <Option value="เก็บทุกครั้งที่ฝาก">เงื่อนไขการฝาก</Option>
                                                <Option value="เก็บทุกครั้งที่โอน">เงื่อนไขการโอน</Option>
                                                <Option value="เก็บทุกครั้งที่ถอน">เงื่อนไขการถอน</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="condition_amount"
                                            label="insert your money that you kept."
                                            required={[{ required: true }]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Amount" />
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
                {/* <Modal title="Choose Condition for ME" visible={showChooseForm} >
                    <Row justify="center">
                        <Col xs={20} sm={16} md={12} lg={20} xl={24}>
                            <Row justify="center">
                                <Col>
                                    <Form
                                        name="create_condition"
                                        initialValues={{ remember: true }}
                                        onFinish={handleOk}
                                        footer={null}
                                    >
                                        <Form.Item
                                            name="condition_name"
                                            label="Please Choose your condition"
                                            rules={[{ required: true, message: "Please input your account name!" }]}
                                        >
                                            <Select
                                                placeholder="Select your type"
                                                allowClear
                                            >
                                                {allCondition.map(item =>
                                                    <Option value={item.condition_name}>{item.condition_name}</Option>
                                                )}
                                                <Option value="4">4</Option>
                                                <Option value="5">5</Option>
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
                </Modal> */}
                <Divider />
                <Table
                    columns={columns}
                    // expandable={{
                    //     // expandedRowRender: record => <p>hello</p>,
                    //     expandedRowRender: record => <p>{record.description}</p>,
                    //     rowExpandable: record => record.name !== 'Not Expandable',
                    // }}
                    dataSource={newHistory}
                    pagination={false}
                />
            </Col>
        </Row>
    );
};

export default MyBag
