import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <Row justify="space-between" align="middle" style={{ padding: "0 100px", backgroundColor: "pink", height: "10vh" }}>
            <Col>
                <div style={{ fontSize: "2.5rem", color: "plum" }}>
                    <Link to="/">OOM money</Link>
                </div>
            </Col>
            <Col style={{ fontSize: "20px" }}>
                <button onClick={props.showModal} style={{ marginRight: "5px" }}>Login</button>
                <button onClick={props.showModal}>Logout</button>
            </Col>

        </Row>
    )
}

export default Navbar
