import { Col, Divider, Row, Table } from 'antd';
import axios from '../../config/axios';
import React, { useEffect } from 'react';

function MyBag(props) {

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            // render: () => <a >Delete</a>,
        },
    ];

    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
            key: 3,
            name: 'Not Expandable',
            age: 29,
            address: 'Jiangsu No. 1 Lake Park',
            description: 'This not expandable',
        },
        {
            key: 4,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
        {
            key: 5,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
        {
            key: 6,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
    ];

    // const fetchMyBag = () => {

    // }

    // const fetchHistoryTransfer = async () => {
    //     const res = await axios.get("");
    // }

    // useEffect()

    return (
        <Row justify="center" align="middle" style={{ backgroundColor: "salmon", height: "100vh", margin: "5vh 15vh", border: "2px solid black", borderRadius: "5px" }}>
            <Col span={24}>

                <img style={{ height: "10%", width: "10%" }} src="https://pbs.twimg.com/profile_images/882982636301332484/8p1Y_rVC.png" alt="logo" />
                {props.funBag ? <div>{props.funBag.name_bag}</div> : props.growBag ? <div>{props.growBag.name_bag}</div> : props.bag ? <div>{props.bag.name_bag}</div> : null}
                <div>ยอดเงินเก็บ</div>
                {props.funBag ? <div>{props.funBag.amount} บาท</div> : props.growBag ? <div>{props.growBag.amount} บาท</div> : props.bag ? <div>{props.bag.amount} บาท</div> : <div>0 บาท</div>}
                <button>ตั้งค่า</button>
                <Divider />
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p>hello</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={data}
                    pagination={false}
                />
            </Col>
        </Row>
    );
};

export default MyBag
