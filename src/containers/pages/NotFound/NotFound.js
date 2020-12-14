import React from 'react';
import { Col, Empty, Row } from 'antd';

function NotFound() {
    return (
        <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Col>
                <Empty description="404 Not Found" />
            </Col>
        </Row>
    );
}

export default NotFound;
