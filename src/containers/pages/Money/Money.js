import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'antd';
import UserContext from '../../../context/UserContext';
import axios from 'axios';

function Money() {

    const { user, bag, setBag } = useContext(UserContext);

    const fetchBag = async () => {
        const res = await axios.get("http://localhost:8000/bags/money");
        console.log("fetch_bag")
        console.log(res.data);
        setBag(res.data);
        console.log(bag);
    };

    useEffect(() => {
        fetchBag();
    }, []);

    return (
        <Row justify="center" align="middle" style={{ height: "80vh", margin: "5vh 15vh", border: "2px solid black", borderRadius: "10px" }}>
            <Col span={18}>
                <Row justify="space-between" style={{ backgroundColor: "red" }}>
                    <div>hello</div>
                    <div>{bag.amount}</div>
                </Row>
                <Row justify="center" style={{ backgroundColor: "green" }}>
                    <Col>
                        <div style={{ backgroundColor: "orange" }}>
                            {bag.name_bag}
                        </div>
                    </Col>
                </Row>

                <div style={{ backgroundColor: "salmon" }}>กระปุกของฉัน</div>
                <Row justify="space-around" align="middle" style={{ backgroundColor: "red" }}>
                    <Col style={{ alignItems: "center", display: "flex", justifyContent: "center", backgroundColor: "skyblue", width: "300px", height: "250px", textAlign: "center" }}>
                        <div style={{ backgroundColor: "snow", width: "50%", height: "50%" }}>
                            <div style={{ display: "flex" }}>Grow</div>
                            <div>{bag.amount}</div>
                        </div>
                    </Col>
                    <Col style={{ backgroundColor: "skyblue", width: "300px", height: "250px", textAlign: "center" }}>
                        <Row justify="center" align="middle">
                            <div>Fun</div>
                            <div>{bag.amount}</div>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}

export default Money
