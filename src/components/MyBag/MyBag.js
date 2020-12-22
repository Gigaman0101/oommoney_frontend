import { Col, Divider, Row, Table } from 'antd';
// import axios from '../../config/axios';
import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';

function MyBag(props) {
    console.log(props)

    let newProps = props.funBag || props.growBag || props.bag;

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


    // const fetchMyBag = () => {

    // }

    // const fetchHistoryTransfer = async () => {
    //     const res = await axios.get("");
    // }

    // useEffect()

    let newHistory = props.history || props.historyFun || props.historyGrow;

    return (
        <Row justify="center" align="middle" style={{ backgroundColor: "salmon", height: "100vh", margin: "5vh 15vh", border: "2px solid black", borderRadius: "5px" }}>
            <Col span={24}>

                <img style={{ height: "10%", width: "10%" }} src="https://pbs.twimg.com/profile_images/882982636301332484/8p1Y_rVC.png" alt="logo" />
                {props.funBag ?
                    <div>{props.funBag.name_bag}</div> :
                    props.growBag ?
                        <div>{props.growBag.name_bag}</div> :
                        props.bag ?
                            <div>{props.bag.name_bag}</div> :
                            null
                }
                <div>ยอดเงินเก็บ</div>
                {props.funBag ?
                    <div>{props.funBag.amount} บาท</div> :
                    props.growBag ?
                        <div>{props.growBag.amount} บาท</div> :
                        props.bag ?
                            <div>{props.bag.amount} บาท</div> :
                            <div>0 บาท</div>
                }
                <button>ตั้งค่า</button>
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
